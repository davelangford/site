var currentSquareAnimating = 0;
var currentSquareStep = 0;

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
    DrawStuff();
    currentSquareAnimating = 0;
    currentSquareStep = 0;
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
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




