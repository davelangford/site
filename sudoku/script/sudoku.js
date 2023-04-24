// Get the canvas element and its context
var canvas = document.getElementById('sudokucanvas');
var ctx = canvas.getContext('2d');

// Set the canvas size based on the device's pixel density
canvas.width = window.innerWidth * window.devicePixelRatio;
canvas.height = window.innerHeight * window.devicePixelRatio;

// Define the size of the grid and the size of each square
var gridSize = 9;
var squareSize = 0;

if (canvas.width <= canvas.height) {
    squareSize = canvas.width / gridSize;
} else {
    squareSize = canvas.height / gridSize;
}


// Draw the grid lines
ctx.strokeStyle = '#100';
ctx.lineWidth = 20;
for (var i = 0; i <= gridSize; i++) {
    ctx.beginPath();
    ctx.moveTo(i * squareSize, 0);
    ctx.lineTo(i * squareSize, squareSize * 9);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * squareSize);
    ctx.lineTo(squareSize * 9, i * squareSize);
    ctx.stroke();
}

// Draw numbers
ctx.font = 'bold ' + (squareSize * 0.6) + 'px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
for (var i = 0; i < gridSize; i++) {
    for (var j = 0; j < gridSize; j++) {
        var value = Math.floor(Math.random() * 9) + 1;
        var x = (i + 0.5) * squareSize;
        var y = (j + 0.5) * squareSize;
        ctx.fillText(value, x, y);
    }
}

// Add event listeners to highlight each square as you tap it on touch devices or with a mouse
var isDragging = false;

canvas.addEventListener('touchstart', function (event) {
    event.preventDefault();
    var rect = canvas.getBoundingClientRect();
    var x = (event.touches[0].clientX - rect.left) * window.devicePixelRatio;
    var y = (event.touches[0].clientY - rect.top) * window.devicePixelRatio;
    highlightSquare(x, y);
    isDragging = true;
});

canvas.addEventListener('mousedown', function (event) {
    event.preventDefault();
    var rect = canvas.getBoundingClientRect();
    var x = (event.clientX - rect.left) * window.devicePixelRatio;
    var y = (event.clientY - rect.top) * window.devicePixelRatio;
    highlightSquare(x, y);
    isDragging = true;
});

canvas.addEventListener('touchmove', function (event) {
    event.preventDefault();
    if (isDragging) {
        var rect = canvas.getBoundingClientRect();
        var x = (event.touches[0].clientX - rect.left) * window.devicePixelRatio;
        var y = (event.touches[0].clientY - rect.top) * window.devicePixelRatio;
        highlightSquare(x, y);
    }
});


canvas.addEventListener('mousemove', function (event) {
    event.preventDefault();
    if (isDragging) {
        var rect = canvas.getBoundingClientRect();
        var x = (event.clientX - rect.left) * window.devicePixelRatio;
        var y = (event.clientY - rect.top) * window.devicePixelRatio;
        highlightSquare(x, y);
    }
});

canvas.addEventListener('touchend', function (event) {
    event.preventDefault();
    isDragging = false;
});

canvas.addEventListener('mouseup', function (event) {
    event.preventDefault();
    isDragging = false;
});


// Function to highlight the square at the given coordinates
function highlightSquare(x, y) {
    var row = Math.floor(y / squareSize);
    var col = Math.floor(x / squareSize);
    ctx.fillStyle = '#ff0';
    ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
}