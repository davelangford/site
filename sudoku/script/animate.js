var currentlyAnimating = false;
var animationLength = 200;
var currentSquareAnimating = 0;
var currentSquareStep = 0;
var squareAnimationLength = 2;
const frameRate = 60;
const interval = 1000 / frameRate;

function AnimateCurrentSquare() {
    var col = currentSquareAnimating % 9;
    var row = Math.floor(currentSquareAnimating / 9);

    ctx.fillStyle = "#0D0";
    ctx.fillRect(
        col * squareSize,
        row * squareSize,
        squareSize,
        squareSize
    );
}

let targetFramerate = 60;
let frameDelay = 1000 / targetFramerate;

// Variable to store the ID of the animation frame
let animationFrameId = null;

// Function to update the canvas
function updateCanvas() {
    DrawStuff();
    AnimateCurrentSquare();
    if (currentSquareStep < squareAnimationLength) {
        currentSquareStep++;
    } else {
        currentSquareStep = 0;
        currentSquareAnimating++;
    }
    if (currentSquareAnimating >= 81) {
        stopAnimation();
    }
    animationFrameId = requestAnimationFrame(updateCanvas);
}

function stopAnimation() {
    // Cancel the animation frame
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function startAnimation(resetAnimation) {

    if (resetAnimation) {
        currentSquareAnimating = 0;
        currentSquareStep = 0;
    }
    // Check if the animation loop is already running
    if (animationFrameId) {
        return;
    }

    // Start the animation loop
    animationFrameId = requestAnimationFrame(updateCanvas);
}

// Function to pause the animation loop
function pauseAnimation() {
    // Cancel the animation frame
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
}


// Play button event listener
const playButton = document.getElementById("playButton");
playButton.addEventListener("click", function () {
    // Stop the animation (if it's running)
    pauseAnimation();

    // Start the animation from scratch
    startAnimation(true);
});

cancelAnimationFrame(animationFrameId);
animationFrameId = null;
// Pause button event listener
const pauseButton = document.getElementById("pauseButton");
pauseButton.addEventListener("click", function () {
    // Pause or continue the animation
    if (animationFrameId) {
        pauseAnimation();
    } else {
        startAnimation(false);
    }
});

// Example: Change the framerate to 30 after 5 seconds
setTimeout(function () {
    pauseAnimation();
    targetFramerate = 30;
    frameDelay = 1000 / targetFramerate;
}, 5000);