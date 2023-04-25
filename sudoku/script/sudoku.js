// Get the canvas element and its context
var canvas = document.getElementById("sudokucanvas");
var ctx = canvas.getContext("2d");

// Set the canvas size based on the device's pixel density
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

// Define the size of the grid and the size of each square
var gridSize = 9;
var squareSize = 0;
var grid = [{}];
var selectedSquares = [];
var selectedNumber = 0;
var selectedNote = 0;
var higlightColor = "#f99";
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


function NewGame(difficulty) {
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


    canvas.addEventListener("touchstart", function (event) {
        event.preventDefault();
        var rect = canvas.getBoundingClientRect();
        var x =
            (event.touches[0].clientX - rect.left) * window.devicePixelRatio;
        var y = (event.touches[0].clientY - rect.top) * window.devicePixelRatio;
        SelectSquare(x, y);
        isDragging = true;
    });

    canvas.addEventListener("mousedown", function (event) {
        event.preventDefault();
        var rect = canvas.getBoundingClientRect();
        var x = (event.clientX - rect.left) * window.devicePixelRatio;
        var y = (event.clientY - rect.top) * window.devicePixelRatio;
        SelectSquare(x, y);
        isDragging = true;
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
                ctx.fillStyle = higlightColor;
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
                    ctx.fillStyle = "#cc9";
                    ctx.fillRect(
                        col * squareSize,
                        row * squareSize,
                        squareSize,
                        squareSize
                    );
                }
            }
        }
    }
}

function SelectSquare(x, y) {

    var row = Math.floor(y / squareSize);
    var col = Math.floor(x / squareSize);

    if (currentRow == row && currentCol == col) return;

    console.log(
        `currentRow: ${currentRow}, currentCol: ${currentCol}, col: ${col}, row: ${row}`
    );
    currentRow = row;
    currentCol = col;

    if (row < 9 && col < 9) {
        grid[row][col].selected = !grid[row][col].selected;
        selectedNote = 0;
        selectedNumber = 0;

    } else if (row > 0 && row <= 3 && col > 9) {
        // Number in toolbox clicked
        selectedNote = 0;
        selectedNumber = (row - 1) * 3 + (col - 9);
        ToggleNumber();
    } else if (row > 4 && row <= 7 && col > 9) {
        // Note in toolbox clicked
        selectedNumber = 0;
        selectedNote = (row - 5) * 3 + (col - 9);
        ToggleNote();
    } else {
        for (var row = 0; row < 9; row++) {
            for (var col = 0; col < 9; col++) {
                grid[row][col].selected = false;
            }
        }
        selectedNumber = 0;
        selectedNote = 0;
    }

    DrawStuff();
}

function ToggleNote() {
    if (selectedNote == 0) return;

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col].selected == true) {
                if (!grid[row][col].possibleValues.includes(selectedNote)) {
                    grid[row][col].possibleValues.push(selectedNote);
                } else {
                    let index = grid[row][col].possibleValues.indexOf(selectedNote);

                    if (index >= 0) {
                        grid[row][col].possibleValues.splice(index, 1);
                    }
                }
            }
        }
    }
}

function ToggleNumber() {
    if (selectedNumber == 0) return;

    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col].selected == true && !grid[row][col].fixed) {
                if (grid[row][col].value == 0) {
                    grid[row][col].value = selectedNumber;
                } else {
                    grid[row][col].value = 0;
                }
            }
        }
    }
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
    const x = squareSize * 4.5 - (width / 2);
    const y = squareSize * 4.5 - (height / 2);

    ctx.fillStyle = '#BBDDff';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.fillRect(x, y, width, height);
    ctx.strokeRect(x, y, width, height);

    const message = 'Generating, please wait...';
    ctx.fillStyle = '#000000';
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(message, x + (width / 2), y + (height / 2) + 1);
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

    LoadBoard('easy');

});

function LoadBoard(difficulty) {
    // get localstorage object called numbers, assign it to the numbers variable. If it doesn't exist, create it and call the fetch function
    if (localStorage.getItem("numbers") == null) {
        var numbers = [];

        fetchSudokuBoard(difficulty)
            .then((board) => {
                numbers = board;
                console.log(board);
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

function DrawLines() {
    ctx.strokeStyle = "#100";
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
                ctx.fillStyle = higlightColor;
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
                ctx.fillStyle = higlightColor;
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
