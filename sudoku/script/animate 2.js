let targetFramerate = 60;
let frameDelay = 1000 / targetFramerate;
var animationComplete = false;
var frameCount = 0;
let animationFrameId = null;

// Function to update the canvas
function updateCanvas() {
    DrawStuff();
    UpdateSquares();
    frameCount++;

    if (animationComplete) {
        stopAnimation();
    }
    animationFrameId = requestAnimationFrame(updateCanvas);
}

function UpdateSquares() {
    for (var i = 0; i < 81; i++) {
        GridFlat()[i].value++;
    }
    //
}

function ResetSquares() {
    for (var i = 0; i < 81; i++) {
        GridFlat()[i].value = getRandomInt(0,8);
    }
    //
}
function stopAnimation() {
    ResetSquares();
    DrawStuff();
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
}

function startAnimation(resetAnimation) {

    if (resetAnimation) {
        // currentSquareAnimating = 0;
        // currentSquareStep = 0;
        frameCount = 0;
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




