var canvas = document.getElementById("sudokucanvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

var gridSize = 9;
var squareSize = 0;
var grid = [{}];
var selectedSquares = [];
var selectedNumber = 0;
var selectedNote = 0;
var selectedCellColor = "#b3d9ff";
var hintCellColor = "#b3d9ff";
var currentRow, currentCol;

if (canvas.width <= canvas.height) {
    squareSize = canvas.width / gridSize;
} else {
    squareSize = canvas.height / gridSize;
}

class SudokuSquare {
    constructor(value) {
        this.value = value;
        this.possibleValues = [];
        this.selected = false;
        if (this.value != 0) {
            this.fixed = true;
        } else {
            this.fixed = false;
        }
    }
}

var isDragging = false;
var currentlyDeselecting = false;
let snapshots = [];

function takeSnapshot() {
    let snapshot = JSON.parse(JSON.stringify(grid));

    snapshots.unshift(snapshot);

    if (snapshots.length > 10) {
        snapshots.pop();
    }
}

function undo() {
    if (snapshots.length === 0) {
        return;
    }

    let snapshot = snapshots.shift();

    grid = snapshot;

    DrawStuff();
}

function ClearNotes(){
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            grid[row][col].possibleValues = [];
        }
    }
    DrawStuff();
}

function NewGame(difficulty) {
    if (!confirm("Are you sure you want to start a new game?")) return;

    localStorage.removeItem("numbers");
    localStorage.removeItem("grid");
    DrawStuff(false);
    LoadBoard(difficulty);
}
function AddListeners() {
    easyButton.addEventListener("click", () => {
        NewGame("easy");
    });

    mediumButton.addEventListener("click", () => {
        NewGame("medium");
    });

    hardButton.addEventListener("click", () => {
        NewGame("hard");
    });

    undoButton.addEventListener("click", () => {
        undo();
    });

    clearNotesButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear the notes?")) {
            ClearNotes();
          }
    });
    

    canvas.addEventListener("touchstart", function (event) {
        event.preventDefault();
        var rect = canvas.getBoundingClientRect();
        var x =
            (event.touches[0].clientX - rect.left) * window.devicePixelRatio;
        var y = (event.touches[0].clientY - rect.top) * window.devicePixelRatio;
        if(GetSudokuSquareFromPixelCoordinates(x, y) != undefined){
            currentlyDeselecting = GetSudokuSquareFromPixelCoordinates(x, y).selected;
        }
        SelectSquare(x, y);
        isDragging = true;
    });

    canvas.addEventListener("mousedown", function (event) {
        event.preventDefault();
        var rect = canvas.getBoundingClientRect();
        var x = (event.clientX - rect.left) * window.devicePixelRatio;
        var y = (event.clientY - rect.top) * window.devicePixelRatio;
        if(GetSudokuSquareFromPixelCoordinates(x, y) != undefined){
            currentlyDeselecting = GetSudokuSquareFromPixelCoordinates(x, y).selected;
        }
        SelectSquare(x, y);
        isDragging = true;
    });

    function GetSudokuSquareFromPixelCoordinates(x, y){

        var row = Math.floor(y / squareSize);
        var col = Math.floor(x / squareSize);

        return grid[row][col];
    }

    canvas.addEventListener("touchmove", function (event) {
        event.preventDefault();
        if (isDragging) {
            var rect = canvas.getBoundingClientRect();
            var x =
                (event.touches[0].clientX - rect.left) *
                window.devicePixelRatio;
            var y =
                (event.touches[0].clientY - rect.top) * window.devicePixelRatio;
            SelectSquare(x, y);
        }
    });

    canvas.addEventListener("mousemove", function (event) {
        event.preventDefault();
        if (isDragging) {
            var rect = canvas.getBoundingClientRect();
            var x = (event.clientX - rect.left) * window.devicePixelRatio;
            var y = (event.clientY - rect.top) * window.devicePixelRatio;
            SelectSquare(x, y);
        }
    });

    canvas.addEventListener("touchend", function (event) {
        event.preventDefault();
        isDragging = false;
        currentRow = 0;
        currentCol = 0;
    });

    canvas.addEventListener("mouseup", function (event) {
        event.preventDefault();
        isDragging = false;
        currentRow = 0;
        currentCol = 0;
    });
}

function HighlightSquares() {
    if (grid.length != 9) return;

    var anySelected = false;

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col].selected == true) {
                ctx.fillStyle = "#BFB";// selectedCellColor;
                ctx.fillRect(
                    col * squareSize,
                    row * squareSize,
                    squareSize,
                    squareSize
                );
                anySelected = true;
            }
        }
    }
    if (!anySelected && selectedNumber != 0) {
        for (var row = 0; row < 9; row++) {
            for (var col = 0; col < 9; col++) {
                if (grid[row][col].value == selectedNumber) {
                    // HighlightNeighbourhood(row, col);
                    ctx.fillStyle = hintCellColor;
                    ctx.fillRect(
                        col * squareSize,
                        row * squareSize,
                        squareSize,
                        squareSize
                    );
                }
                var x, y;
                var index =
                    grid[row][col].possibleValues.indexOf(selectedNumber);
                if (index >= 0 && grid[row][col].value == 0) {
                    ctx.fillStyle = hintCellColor;
                    switch (grid[row][col].possibleValues[index]) {
                        case 1:
                            x = (col + 0.0) * squareSize;
                            y = (row + 0.0) * squareSize;
                            break;
                        case 2:
                            x = (col + 0.33) * squareSize;
                            y = (row + 0.0) * squareSize;
                            break;
                        case 3:
                            x = (col + 0.66) * squareSize;
                            y = (row + 0.0) * squareSize;
                            break;
                        case 4:
                            x = (col + 0.0) * squareSize;
                            y = (row + 0.33) * squareSize;
                            break;
                        case 5:
                            x = (col + 0.33) * squareSize;
                            y = (row + 0.33) * squareSize;
                            break;
                        case 6:
                            x = (col + 0.66) * squareSize;
                            y = (row + 0.33) * squareSize;
                            break;
                        case 7:
                            x = (col + 0.0) * squareSize;
                            y = (row + 0.66) * squareSize;
                            break;
                        case 8:
                            x = (col + 0.33) * squareSize;
                            y = (row + 0.66) * squareSize;
                            break;
                        case 9:
                            x = (col + 0.66) * squareSize;
                            y = (row + 0.66) * squareSize;
                            break;
                        default:
                            break;
                    }
                    ctx.beginPath();
                    ctx.roundRect(x, y, squareSize / 3, squareSize / 3, [5]);
                    ctx.fill();
                }
            }
        }
    }
}

function HighlightNeighbourhood(row, col) {
    ctx.fillStyle = hintCellColor;
    // for (var i = 0; i < 9; i++) {
    //     ctx.fillRect(
    //         i * squareSize,
    //         row * squareSize,
    //         squareSize,
    //         squareSize
    //     );
    // }
    ctx.fillRect(0, row * squareSize, squareSize * 9, squareSize);
    ctx.fillRect(col + squareSize, 0, squareSize, squareSize * 9);
}

function SelectSquare(x, y) {
    var row = Math.floor(y / squareSize);
    var col = Math.floor(x / squareSize);

    if (currentRow == row && currentCol == col) return;

    // console.log(
    //     `currentRow: ${currentRow}, currentCol: ${currentCol}, col: ${col}, row: ${row}`
    // );
    currentRow = row;
    currentCol = col;

    if (row < 9 && col < 9) {
        if(currentlyDeselecting){
            grid[row][col].selected = false;
        } else {
            grid[row][col].selected = true;
        }
        selectedNote = 0;
        selectedNumber = 0;
    } else if (row > 0 && row <= 3 && col > 9) {
        // Number in toolbox clicked
        selectedNumber = (row - 1) * 3 + (col - 9);
        selectedNote = selectedNumber;
        ToggleNumber();
    } else if (row > 4 && row <= 7 && col > 9) {
        // Note in toolbox clicked
        selectedNote = (row - 5) * 3 + (col - 9);
        selectedNumber = selectedNote;
        ToggleNote();
    } else {
        DeselectCells();
        selectedNumber = 0;
        selectedNote = 0;
    }

    DrawStuff();
}

function DeselectCells() {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            grid[row][col].selected = false;
        }
    }
}

function ToggleNote() {
    if (selectedNote == 0) return;

    takeSnapshot();

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col].selected == true) {
                if (!grid[row][col].possibleValues.includes(selectedNote)) {
                    grid[row][col].possibleValues.push(selectedNote);
                } else {
                    let index =
                        grid[row][col].possibleValues.indexOf(selectedNote);

                    if (index >= 0) {
                        grid[row][col].possibleValues.splice(index, 1);
                    }
                }
            }
        }
    }
    DeselectCells();
}

function ToggleNumber() {
    if (selectedNumber == 0) return;

    takeSnapshot();

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col].selected == true && !grid[row][col].fixed) {
                if (
                    grid[row][col].value == 0 ||
                    grid[row][col].value != selectedNumber
                ) {
                    grid[row][col].value = selectedNumber;
                } else {
                    grid[row][col].value = 0;
                }
            }
        }
    }
    DeselectCells();
}

function DrawStuff(drawnumbers = true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    HighlightSquares();
    DrawToolboxNumbers();
    DrawToolboxNotes();
    DrawLines();

    if (drawnumbers) {
        DrawNumbers();
    } else {
        DrawLoading();
    }
}

function DrawLoading() {
    const width = 300;
    const height = 100;
    const x = squareSize * 4.5 - width / 2;
    const y = squareSize * 4.5 - height / 2;

    ctx.fillStyle = "#BBDDff";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);

    const message = "Generating, please wait...";
    ctx.fillStyle = "#000000";
    ctx.font = "18px Arial";
    ctx.textAlign = "center";
    ctx.fillText(message, x + width / 2, y + height / 2 + 1);
}

async function fetchSudokuBoard(difficulty) {
    const response = await fetch(
        "https://sugoku.onrender.com/board?difficulty=" + difficulty
    );
    const data = await response.json();
    return data.board;
}

$(document).ready(function () {
    AddListeners();
    DrawStuff(false);

    LoadBoard("easy");
});

function LoadBoard(difficulty) {
    // get localstorage object called numbers, assign it to the numbers variable. If it doesn't exist, create it and call the fetch function
    if (localStorage.getItem("numbers") == null) {
        var numbers = [];

        fetchSudokuBoard(difficulty)
            .then((board) => {
                numbers = board;
                // console.log(board);
                localStorage.setItem("numbers", JSON.stringify(numbers));
                PopulateGrid();
                DrawStuff();
            })
            .catch((error) => {
                console.error("Error fetching Sudoku board:", error);
            });
    } else {
        PopulateGrid();
        DrawStuff();
    }
}
function PopulateGrid() {
    var numbers = JSON.parse(localStorage.getItem("numbers"));

    if (localStorage.getItem("grid") != null) {
        grid = JSON.parse(localStorage.getItem("grid"));
    } else {
        grid = Array.from({ length: 9 }, () =>
            Array.from({ length: 9 }, () => new SudokuSquare(0))
        );
        for (row = 0; row < 9; row++) {
            for (col = 0; col < 9; col++) {
                var value = numbers[row][col];
                grid[row][col] = new SudokuSquare(value);
            }
        }
    }
}

function DrawNumbers() {
    localStorage.setItem("grid", JSON.stringify(grid));

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
            var value = grid[row][col].value;
            if (value != 0) {
                var x = (col + 0.5) * squareSize;
                var y = (row + 0.5) * squareSize;
                ctx.font = squareSize * 0.6 + "px Arial";
                if (grid[row][col].fixed) {
                    ctx.fillStyle = "#000";
                } else if (ClashExists(row, col)) {
                    ctx.fillStyle = "#F00";
                } else {
                    ctx.fillStyle = "#009";
                }

                ctx.fillText(value, x, y);
            } else {
                ctx.font = squareSize * 0.2 + "px Arial";
                ctx.fillStyle = "#000";
                for (i = 0; i < grid[row][col].possibleValues.length; i++) {
                    switch (grid[row][col].possibleValues[i]) {
                        case 1:
                            x = (col + 0.2) * squareSize;
                            y = (row + 0.2) * squareSize;
                            break;
                        case 2:
                            x = (col + 0.5) * squareSize;
                            y = (row + 0.2) * squareSize;
                            break;
                        case 3:
                            x = (col + 0.8) * squareSize;
                            y = (row + 0.2) * squareSize;
                            break;
                        case 4:
                            x = (col + 0.2) * squareSize;
                            y = (row + 0.5) * squareSize;
                            break;
                        case 5:
                            x = (col + 0.5) * squareSize;
                            y = (row + 0.5) * squareSize;
                            break;
                        case 6:
                            x = (col + 0.8) * squareSize;
                            y = (row + 0.5) * squareSize;
                            break;
                        case 7:
                            x = (col + 0.2) * squareSize;
                            y = (row + 0.8) * squareSize;
                            break;
                        case 8:
                            x = (col + 0.5) * squareSize;
                            y = (row + 0.8) * squareSize;
                            break;
                        case 9:
                            x = (col + 0.8) * squareSize;
                            y = (row + 0.8) * squareSize;
                            break;
                        default:
                            break;
                    }
                    ctx.fillText(grid[row][col].possibleValues[i], x, y);
                }
            }
        }
    }
}

function ClashExists(row, col) {
    for (var i = 0; i < 9; i++) {
        if (i != col && grid[row][col].value == grid[row][i].value) {
            return true;
        }
    }
    for (var i = 0; i < 9; i++) {
        if (i != row && grid[row][col].value == grid[i][col].value) {
            return true;
        }
    }

    var startRow = Math.floor(row / 3) * 3;
    var startCol = Math.floor(col / 3) * 3;

    for (var i = startRow; i < startRow + 3; i++) {
        for (var j = startCol; j < startCol + 3; j++) {
            if ((i != row || j != col) && grid[row][col].value == grid[i][j].value) {
                return true;
            }
        }
    }
    return false;
}

function DrawLines() {
    ctx.strokeStyle = "#100";
    ctx.lineCap = "round";
    for (var i = 0; i <= gridSize; i++) {
        if (i % 3 == 0) {
            ctx.lineWidth = 10;
        } else {
            ctx.lineWidth = 2;
        }
        ctx.beginPath();
        ctx.moveTo(i * squareSize, 0);
        ctx.lineTo(i * squareSize, squareSize * 9);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i * squareSize);
        ctx.lineTo(squareSize * 9, i * squareSize);
        ctx.stroke();
    }
}

function DrawToolboxNumbers() {
    ctx.strokeStyle = "#100";

    var buffer = squareSize;
    var startX = 9 * squareSize + buffer;
    var startY = buffer;

    ctx.fillStyle = "#000";
    ctx.font = "bold " + squareSize * 0.6 + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    var value = 1;
    for (row = 0; row < 3; row++) {
        for (col = 0; col < 3; col++) {
            var x = startX + (col + 0.5) * squareSize;
            var y = startY + (row + 0.5) * squareSize;

            if (value == selectedNumber) {
                ctx.fillStyle = selectedCellColor;
                ctx.fillRect(
                    x - squareSize / 2,
                    y - squareSize / 2,
                    squareSize,
                    squareSize
                );
            }

            ctx.fillStyle = "#000";
            ctx.fillText(value++, x, y);
            if (1 != 1) {
                // if (CountOfNumber(value - 1) >= 9) {
                ctx.beginPath();
                ctx.moveTo(
                    x - squareSize / 2,
                    y - squareSize / 2);
                ctx.lineTo(
                    x + squareSize / 2,
                    y + squareSize / 2
                );
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(
                    x + squareSize / 2,
                    y - squareSize / 2);
                ctx.lineTo(
                    x - squareSize / 2,
                    y + squareSize / 2
                );
                ctx.stroke();
            }
        }
    }

    for (var i = 0; i <= 3; i++) {
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(startX + i * squareSize, startY);
        ctx.lineTo(startX + i * squareSize, startY + squareSize * 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(startX, startY + i * squareSize);
        ctx.lineTo(startX + squareSize * 3, startY + i * squareSize);
        ctx.stroke();
    }
}

function CountOfNumber(number){
    if (grid.length != 9) return 0;

    var total = 0;
    for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
            if(grid[row][col].value == number){
                total++;
            }
        }
    }
    return total;
}

function DrawToolboxNotes() {
    ctx.strokeStyle = "#100";

    var buffer = squareSize;
    var startX = 9 * squareSize + buffer;
    var startY = 4 * squareSize + buffer;

    ctx.font = squareSize * 0.3 + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    var value = 1;
    for (row = 0; row < 3; row++) {
        for (col = 0; col < 3; col++) {
            var x = startX + (col + 0.5) * squareSize;
            var y = startY + (row + 0.5) * squareSize;

            if (value == selectedNote) {
                ctx.fillStyle = selectedCellColor;
                ctx.fillRect(
                    x - squareSize / 2,
                    y - squareSize / 2,
                    squareSize,
                    squareSize
                );
            }
            ctx.fillStyle = "#000";
            ctx.fillText(value++, x, y);
        }
    }
    for (var i = 0; i <= 3; i++) {
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(startX + i * squareSize, startY);
        ctx.lineTo(startX + i * squareSize, startY + squareSize * 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(startX, startY + i * squareSize);
        ctx.lineTo(startX + squareSize * 3, startY + i * squareSize);
        ctx.stroke();
    }
}
