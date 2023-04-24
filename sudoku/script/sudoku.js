// Get the canvas element and its context
var canvas = document.getElementById('sudokucanvas');
var ctx = canvas.getContext('2d');

// Set the canvas size based on the device's pixel density
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

// Define the size of the grid and the size of each square
var gridSize = 9;
var squareSize = canvas.width / gridSize;

// Draw the grid lines
ctx.strokeStyle = '#100';
ctx.lineWidth = 20;
for (var i = 0; i <= gridSize; i++) {
    ctx.beginPath();
    ctx.moveTo(i * squareSize, 0);
    ctx.lineTo(i * squareSize, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * squareSize);
    ctx.lineTo(canvas.width, i * squareSize);
    ctx.stroke();
}

// Add event listeners to highlight each square as you tap it on touch devices or with a mouse
canvas.addEventListener('touchstart', function (event) {
    event.preventDefault();
    var x = event.touches[0].clientX * window.devicePixelRatio;
    var y = event.touches[0].clientY * window.devicePixelRatio;
    highlightSquare(x, y);
});

canvas.addEventListener('mousedown', function (event) {
    event.preventDefault();
    var x = event.clientX * window.devicePixelRatio;
    var y = event.clientY * window.devicePixelRatio;
    highlightSquare(x, y);
});

// Function to highlight the square at the given coordinates
function highlightSquare(x, y) {
    var row = Math.floor(y / squareSize);
    var col = Math.floor(x / squareSize);
    ctx.fillStyle = '#ff0';
    ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
}