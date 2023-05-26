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
var missingNumbers = [];
var notesMode = false;
var solution = '';

if (canvas.width <= canvas.height) {
    squareSize = canvas.width / gridSize;
} else {
    squareSize = canvas.height / gridSize;
}

class SudokuSquare {
    constructor(value, row, col) {
        this.value = value;
        this.possibleValues = [];
        this.selected = false;
        this.row = row;
        this.col = col;
        this.hint = false;

        if (this.value != 0) {
            this.fixed = true;
        } else {
            this.fixed = false;
        }
    }
}

var isDragging = false;
let snapshots = [];

function takeSnapshot() {
    let snapshot = JSON.parse(JSON.stringify(grid));

    snapshots.unshift(snapshot);

    if (snapshots.length > 40) {
        snapshots.pop();
    }
}

function undo() {
    if (snapshots.length === 0) {
        return;
    }

    let snapshot = snapshots.shift();

    grid = snapshot;

    DeselectCells();
    DrawStuff();
}

function ClearAllNotes() {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            grid[row][col].possibleValues = [];
        }
    }
    DrawStuff();
}

function ClearSquares() {
    takeSnapshot();
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col].selected && !grid[row][col].fixed) {
                grid[row][col].value = 0;
                grid[row][col].possibleValues = [];
            }
        }
    }
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


    clearNotesButton.addEventListener("click", () => {
        if (confirm("Are you sure you want to clear the notes?")) {
            ClearAllNotes();
        }
    });


    canvas.addEventListener("touchstart", function (event) {
        event.preventDefault();
        var rect = canvas.getBoundingClientRect();
        var x =
            (event.touches[0].clientX - rect.left) * window.devicePixelRatio;
        var y = (event.touches[0].clientY - rect.top) * window.devicePixelRatio;
        MouseTouchDown(x, y);
    });

    canvas.addEventListener("mousedown", function (event) {
        event.preventDefault();
        var rect = canvas.getBoundingClientRect();
        var x = (event.clientX - rect.left) * window.devicePixelRatio;
        var y = (event.clientY - rect.top) * window.devicePixelRatio;
        MouseTouchDown(x, y);
    });



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
        MouseUpTouchEnd(event);
    });

    canvas.addEventListener("mouseup", function (event) {
        MouseUpTouchEnd(event);
    });
}

function MouseTouchDown(x, y) {
    if (GetSudokuSquareFromPixelCoordinates(x, y) != undefined) {
        DeselectCells();
    }
    SelectSquare(x, y);
    isDragging = true;
}

function GetSudokuSquareFromPixelCoordinates(x, y) {

    var row = Math.floor(y / squareSize);
    var col = Math.floor(x / squareSize);

    return grid[row][col];
}

function MouseUpTouchEnd(event) {
    event.preventDefault();
    isDragging = false;
    currentRow = -1;
    currentCol = -1;
    if (GridFlat().filter(square => square.selected == true && square.fixed).length == 1) {
        //DeselectCells();
        DrawStuff();
    }
}

function HighlightSquares() {
    if (grid.length != 9) return;

    //if (selectedNumber != 0) {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col].fixed) {
                // HighlightNeighbourhood(row, col);
                ctx.fillStyle = "#DDD";
                ctx.fillRect(
                    col * squareSize,
                    row * squareSize,
                    squareSize,
                    squareSize
                );
            }
            if (grid[row][col].hint) {
                // HighlightNeighbourhood(row, col);
                ctx.fillStyle = "#FFEB54";
                ctx.fillRect(
                    col * squareSize,
                    row * squareSize,
                    squareSize,
                    squareSize
                );
            }
            if (selectedNumber != 0 && grid[row][col].value == selectedNumber) {
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
        //}
    }
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
}

function ShowHintSmall() {

    selectedNote = 0;
    selectedNumber = 0;

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {

            if (grid[row][col].value != 0) continue;

            var possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            for (var x = 0; x < 9; x++) {
                grid[row][x].selected = true;
                if (possibilities.length > 0) {
                    possibilities = possibilities.filter(item => item !== grid[row][x].value);
                }
            }
            for (var y = 0; y < 9; y++) {
                grid[y][col].selected = true;
                if (possibilities.length > 0) {
                    possibilities = possibilities.filter(item => item !== grid[y][col].value);
                }
            }

            var newRow = Math.floor(row / 3) * 3;
            var newCol = Math.floor(col / 3) * 3;

            for (var i = newRow; i < newRow + 3; i++) {
                for (var j = newCol; j < newCol + 3; j++) {
                    grid[i][j].selected = true;
                    if (possibilities.length > 0) {
                        possibilities = possibilities.filter(item => item !== grid[i][j].value);
                    }
                }
            }
            if (possibilities.length == 1) {
                grid[row][col].hint = true;
                foundUniqueOne = true;
            } else {
                grid[row][col].hint = false;
            }
            //DrawStuff();
            DeselectCells(false);
            //alert(possibilities.join(','));
        }
    }

    DrawStuff();
}

function ShowHintBig() {

    selectedNote = 0;
    selectedNumber = 0;

    DeselectCells();
    takeSnapshot();
    var hintFound = false;
    while (!hintFound) {

        var row = getRandomInt(0, 8);
        var col = getRandomInt(0, 8);

        if (grid[row][col].value == 0) {
            grid[row][col].value = parseInt(solution[row * 9 + col]);
            grid[row][col].selected = true;
            selectedNumber = parseInt(solution[row * 9 + col]);
            hintFound = true;
        }
    }
    DrawStuff();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function SelectSquare(x, y) {

    var row = y / squareSize;
    var col = x / squareSize;

    if (x <= 9 * squareSize) {
        if (row % 1 < 0.15 || row % 1 > 0.85 || col % 1 < 0.15 || col % 1 > 0.85) {
            return;
        }
    }

    if (isDragging && x > 9 * squareSize) {
        return;
    }

    row = Math.floor(y / squareSize);
    col = Math.floor(x / squareSize);

    if (currentRow == row && currentCol == col) return;

    // console.log(
    //     `currentRow: ${currentRow}, currentCol: ${currentCol}, col: ${col}, row: ${row}`
    // );
    currentRow = row;
    currentCol = col;

    if (row < 9 && col < 9) {
        grid[row][col].selected = true;
        selectedNote = 0;
        selectedNumber = 0;
        if (GridFlat().filter(square => square.selected == true).length == 1) {
            selectedNumber = GridFlat().filter(square => square.selected == true)[0].value;
        }
    } else if (row > 0 && row <= 3 && col > 9) {
        // Number in toolboxnumbers clicked
        selectedNumber = (row - 1) * 3 + (col - 9);
        selectedNote = selectedNumber;
        notesMode ? ToggleNote() : ToggleNumber();
    } else if (row == 4 && col == 10) {
        // clear clicked
        ClearSquares();
    } else if (row == 4 && col == 11) {
        // undo clicked
        ShowHintSmall();
    } else if (row == 4 && col == 12) {
        // undo clicked
        undo();
    } else if (row == 5 && col == 10) {
        // toggle clicked
        ToggleNotesMode();
    } else if (row == 5 && col == 11) {
        // hintB clicked
        ShowHintBig();
    } else if (row == 5 && col == 12) {
        // redo clicked
        // undo();
    } else {
        DeselectCells();
        selectedNumber = 0;
        selectedNote = 0;
    }

    DrawStuff();
}

function DeselectCells(deselectHints = true) {
    selectedNumber = 0;
    selectedNote = 0;
    
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            grid[row][col].selected = false;
            if (deselectHints) {
                grid[row][col].hint = false;
            }
        }
    }
}
function ToggleNotesMode() {
    notesMode = !notesMode;
    DrawStuff();
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
    //DeselectCells();
}

function ToggleNumber() {
    if (selectedNumber == 0) return;

    var fillingOnlyOne = missingNumbers.length == 1;

    if (GridFlat().filter(square => square.selected == true).length > 1 &&
        !fillingOnlyOne) {
        ToggleNote();
        return;
    }
    takeSnapshot();

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (fillingOnlyOne && grid[row][col].value != 0) {
                grid[row][col].selected = false;
            }
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
    //DeselectCells();
}

function DrawStuff(drawnumbers = true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    HighlightSquares();
    CalculateHoles();
    DrawToolboxExtras();
    if (notesMode) {
        DrawToolboxNotes();
    } else {
        DrawToolboxNumbers();
    }
    DrawLines();

    if (drawnumbers) {
        DrawNumbers();
    } else {
        DrawLoading();
    }

    if (GridFlat().filter(square => square.value != 0).length == 81) {
        alert("Done!");
    };
}

function GridFlat() {
    var array1D = [];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            array1D.push(grid[i][j]);
        }
    }

    return array1D;
}

function CalculateHoles() {
    missingNumbers = [];

    if (grid.length != 9) return;


    if (GridFlat().filter(square => square.selected == true).length != 9) return;

    var selectedNumbers = GridFlat().filter(square => square.selected && square.value != 0).map(square => square.value);
    missingNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(n => !selectedNumbers.includes(n));

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
    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('n')) {
        numbers = numbersTo2DArray(urlParams.get('n'));
        window.location.replace(window.location.pathname);
        localStorage.setItem("numbers", JSON.stringify(numbers));
        localStorage.removeItem("grid");
        PopulateGrid();
        DrawStuff();
    }
    AddListeners();
    DrawStuff(false);

    LoadBoard("easy");
});

function numbersTo2DArray(str) {
    let array = [];
    let index = 0;

    for (let i = 0; i < 9; i++) {
        let row = [];

        for (let j = 0; j < 9; j++) {
            row.push(parseInt(str.charAt(index)));
            index++;
        }

        array.push(row);
    }

    return array;
}

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
            Array.from({ length: 9 }, () => new SudokuSquare(0, 0, 0))
        );
        for (row = 0; row < 9; row++) {
            for (col = 0; col < 9; col++) {
                var value = numbers[row][col];
                grid[row][col] = new SudokuSquare(value, row, col);
            }
        }
    }

    solution = solveSudoku(GridFlat().map(obj => obj.value).join(''));
    if (solution.includes('0')) {
        alert('Doesn\'t look like this puzzle is solvable using logic...is the puzzle broken?');
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

            if (missingNumbers.length > 0 && !missingNumbers.includes(value)) {
                ctx.fillStyle = "#888";
                ctx.fillRect(
                    x - squareSize / 2,
                    y - squareSize / 2,
                    squareSize,
                    squareSize
                );
            }

            if (GridFlat().filter(n => n.value == value).length >= 9) {
                ctx.fillStyle = "#777";
                ctx.fillRect(
                    x - squareSize / 2,
                    y - squareSize / 2,
                    squareSize,
                    squareSize
                );
            } else {
                ctx.fillStyle = "#000";
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

function CountOfNumber(number) {
    if (grid.length != 9) return 0;
    if (number == 0) return 0;

    var total = 0;
    for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
            if (grid[row][col].value == number) {
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
    var startY = buffer;

    ctx.font = squareSize * 0.3 + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    var value = 1;
    for (row = 0; row < 3; row++) {
        for (col = 0; col < 3; col++) {
            var x = startX + (col + 0.5) * squareSize;
            var y = startY + (row + 0.5) * squareSize;

            // if (GridFlat().filter(n => n.value == value).length >= 9) {
            //     ctx.fillStyle = "#FFF";
            // } else {
            //     ctx.fillStyle = "#000";
            // }
            if (GridFlat().filter(n => n.value == value).length >= 9) {
                ctx.fillStyle = "#777";
                ctx.fillRect(
                    x - squareSize / 2,
                    y - squareSize / 2,
                    squareSize,
                    squareSize
                );
            } else {
                ctx.fillStyle = "#000";
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

function DrawToolboxExtras() {
    ctx.strokeStyle = "#BBB";
    ctx.fillStyle = "#000";

    var buffer = squareSize;
    var startX = 9 * squareSize + buffer;
    var startY = 3 * squareSize + buffer;

    ctx.font = squareSize * 0.3 + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    var x = startX + 0.5 * squareSize;
    var y = startY + 0.5 * squareSize;
    ctx.fillText('Clear', x, y);

    x = startX + 1.5 * squareSize;
    y = startY + 0.5 * squareSize;
    ctx.fillText('HintS', x, y);

    x = startX + 2.5 * squareSize;
    y = startY + 0.5 * squareSize;
    ctx.fillText('Undo', x, y);

    if (notesMode) {
        ctx.fillStyle = "#888";
        ctx.fillRect(
            startX,
            startY + squareSize,
            squareSize,
            squareSize
        );
        ctx.fillStyle = "#000";
    }

    x = startX + 0.5 * squareSize;
    y = startY + 1.5 * squareSize;
    ctx.fillText('Notes', x, y);

    x = startX + 1.5 * squareSize;
    y = startY + 1.5 * squareSize;
    ctx.fillText('HintB', x, y);

    x = startX + 2.5 * squareSize;
    y = startY + 1.5 * squareSize;
    ctx.fillText('Redo', x, y);


    for (var i = 0; i <= 3; i++) {
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(startX + i * squareSize, startY);
        ctx.lineTo(startX + i * squareSize, startY + squareSize * 2);
        ctx.stroke();
    }
    for (var i = 0; i <= 2; i++) {
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.moveTo(startX, startY + squareSize * i);
        ctx.lineTo(startX + 3 * squareSize, startY + squareSize * i);
        ctx.stroke();
    }
}
