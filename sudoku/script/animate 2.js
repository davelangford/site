let targetFramerate = 60;
let frameDelay = 1000 / targetFramerate;
var animationComplete = false;
var frameCount = 0;
let animationFrameId = null;

// Function to update the canvas
function updateCanvas() {
    DrawStuff();
    UpdateSquares();
    DrawAnimatedSquares();
    frameCount++;

    if (animationComplete) {
        stopAnimation();
    }
    animationFrameId = requestAnimationFrame(updateCanvas);
}

function DrawAnimatedSquares() {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            var s = grid[row][col];
            var x = col * squareSize;
            var y = row * squareSize;
            var r = s.currentFrame * 4;
            if (s.currentFrame > 1 && s.currentFrame < 120) {
                ctx.fillStyle = "rgba(0000)";
                // ctx.fillStyle = "#9DD";
                ctx.fillRect(
                    x,
                    y,
                    squareSize,
                    squareSize
                );
            }
            
        }
        // if (GridFlat().filter(square => square.row * squareSize + s.currentFrame * 5 < squareSize*9).length == 0) {
        //      animationComplete = true;
        // }
    }
}

function UpdateSquares() {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col].animationStartFrame <= frameCount) {
                grid[row][col].currentFrame++;
            }
        }
    }
}

function ResetSquares() {
    for (var i = 0; i < 81; i++) {
        GridFlat()[i].currentFrame = 0;
    }
}
function stopAnimation() {
    ResetSquares();
    DrawStuff();
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
}

function startAnimation(resetAnimation) {

    if (resetAnimation) {
        ResetSquares();
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




