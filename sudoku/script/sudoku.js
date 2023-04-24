// Get the canvas element and its context
var canvas = document.getElementById("sudokucanvas");
var ctx = canvas.getContext("2d");

// Set the canvas size based on the device's pixel density
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

// Define the size of the grid and the size of each square
var gridSize = 9;
var squareSize = 0;
var numbers = [];
var grid = [{}];
var selectedSquares = [];
var selectedNumber = 0;
var selectedNote = 0;
var higlightColor = "#f99";

if (canvas.width <= canvas.height) {
    squareSize = canvas.width / gridSize;
} else {
    squareSize = canvas.height / gridSize;
}

class SudokuSquare {
    constructor(value) {
        this.value = value;
        this.possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.selected = false;
    }
}

var isDragging = false;

function AddListeners() {
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
    });

    canvas.addEventListener("mouseup", function (event) {
        event.preventDefault();
        isDragging = false;
    });
}

function HighlightSquares() {
    for (i = 0; i < selectedSquares.length; i++) {
        ctx.fillStyle = higlightColor;
        ctx.fillRect(
            selectedSquares[i].col * squareSize,
            selectedSquares[i].row * squareSize,
            squareSize,
            squareSize
        );
    }
}

// Function to highlight the square at the given coordinates
function SelectSquare(x, y) {
    var row = Math.floor(y / squareSize);
    var col = Math.floor(x / squareSize);
    if (row < 9 && col < 9) {
        if (selectedSquares.length === 0) {
            // If it is, add the new square to the array
            selectedSquares.push({ col, row });
        } else {
            // Define a function to check if a square is already selected
            const isSquareSelected = (square) => {
                return square.col === col && square.row === row;
            };

            // Use the find() method to search for the selected square
            const selectedSquare = selectedSquares.find(isSquareSelected);

            // If the square is not already selected, add it to the array
            if (!selectedSquare) {
                selectedSquares.push({ col, row });
            }
        }
    } else if (row > 0 && row <= 3 && col > 9) {
        selectedNote = 0;
        selectedNumber = (row - 1) * 3 + (col - 9);
    } else if (row > 4 && row <= 7 && col > 9) {
        selectedNumber = 0;
        selectedNote = (row - 5) * 3 + (col - 9);
    } else {
        selectedSquares = [];
        selectedNumber = 0;
        selectedNote = 0;
    }
    console.log(
        `seelctedNumber: ${selectedNumber}, selectedNote: ${selectedNote}, squares: ${selectedSquares}`
    );
    DrawStuff();
}

function DrawStuff(drawnumbers = true) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    HighlightSquares();
    DrawToolboxNumbers();
    DrawToolboxNotes();
    DrawLines();

    if (drawnumbers) {
        DrawNumbers();
    }
}

async function fetchSudokuBoard() {
    const response = await fetch(
        "https://sugoku.onrender.com/board?difficulty=hard"
    );
    const data = await response.json();
    return data.board;
}

$(document).ready(function () {
    AddListeners();
    DrawStuff(false);

    // get localstorage object called numbers, assign it to the numbers variable. If it doesn't exist, create it and call the fetch function
    if (localStorage.getItem("numbers") == null) {
        fetchSudokuBoard()
            .then((board) => {
                numbers = board;
                console.log(board);
                localStorage.setItem("numbers", JSON.stringify(numbers));
                PopulateGrid(numbers);
                DrawNumbers();
            })
            .catch((error) => {
                console.error("Error fetching Sudoku board:", error);
            });
    } else {
        numbers = JSON.parse(localStorage.getItem("numbers"));
        PopulateGrid(numbers);
        DrawNumbers();
    }
});

function PopulateGrid(numbers) {
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

function DrawNumbers() {
    ctx.fillStyle = "#000";
    ctx.font = "bold " + squareSize * 0.6 + "px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (row = 0; row < 9; row++) {
        for (col = 0; col < 9; col++) {
            var value = numbers[row][col];
            if (value != 0) {
                var x = (col + 0.5) * squareSize;
                var y = (row + 0.5) * squareSize;
                ctx.fillText(value, x, y);
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
