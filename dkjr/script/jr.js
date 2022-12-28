var jrposition = 102;
var missCount = 0;
var fallCheckTimer;

var move = {
    RIGHT: 0,
    LEFT: 1,
    UP: 2,
    DOWN: 3,
    JUMP: 4
};

var canMoveRight = [101, 102, 103, 104, 105, 106, 202, 204, 205, 304, 305, 306];
var canMoveLeft = [103, 104, 105, 106, 107, 204, 205, 304, 305, 306, 307];
var canMoveUp = [103, 106, 207, 304];
var canMoveDown = [201, 202, 203, 204, 205, 206, 207, 307, 404, 405, 406];
var canJump = [102, 103, 104, 105, 106, 107, 304, 305, 306];
var inTheAir = [201, 203, 206, 402, 403, 404, 405];
var deadPositions = [101];

$(document).ready(function () {
    PreLoadImages();
    $("#btnRight").click(function () {
        TryMove(move.RIGHT);
    });
    $("#btnLeft").click(function () {
        TryMove(move.LEFT);
    });
    $("#btnUp").click(function () {
        TryMove(move.UP);
    });
    $("#btnDown").click(function () {
        TryMove(move.DOWN);
    });
    $("#btnJump").click(function () {
        TryMove(move.JUMP);
    });

    DrawJunior();
});

function PreLoadImages() {
    for (var i = 101; i < 600; i++) {
        $("<img />").attr("src", "images/jr/jr.png");
    }
}
function TryMove(direction) {
    if (GameplayPaused()) {
        return;
    }
}
    if ('vibrate' in navigator) {
        // Vibrate supported, use it
        navigator.vibrate(500);
    } else {
        // Vibrate not supported, do something else
        console.log('Vibration not supported on this device');
    }
    
    switch (direction) {
        case move.RIGHT:
            if (canMoveRight.includes(jrposition)) {
                jrposition += 1;
            }
            break;
        case move.LEFT:
            if (canMoveLeft.includes(jrposition)) {
                switch (jrposition) {
                    case 304:
                        jrposition = 201;
                        break;
                    default:
                        jrposition -= 1;
                }
            }
            break;
        case move.UP:
            if (canMoveUp.includes(jrposition)) {
                switch (jrposition) {
                    case 304:
                        jrposition = 403;
                        break;
                    default:
                        jrposition += 100;
                }
            }
            break;
        case move.DOWN:
            if (canMoveDown.includes(jrposition)) {
                jrposition -= 100;
            }
            break;
        case move.JUMP:
            if (canJump.includes(jrposition)) {
                jrposition += 100;
            }
            break;

        default:
            break;
    }
    DrawJunior();

}

function DrawJunior() {
    $("#jr").css("background-image", "url(images/jr/jr" + jrposition + ".png)");
    $("#status").text("Position: " + jrposition + "  Miss: " + missCount);
    clearTimeout(fallCheckTimer);
    fallCheckTimer = setTimeout(FallCheck, 1000);
}


function Reset() {
    jrposition = 102;

    missCount += 1;
    DrawJunior();
    // if (missCount == 3) {
    //     alert("Game Over");
    // }
    //DrawJunior();
}

function FallCheck() {
    if (deadPositions.includes(jrposition)) {
        Reset();
        return;
    }
    if (inTheAir.includes(jrposition)) {
        switch (jrposition) {
            case 403:
                if (keyGrabbed) {
                    jrposition = 502;
                    DrawJunior();
                    KeyGrabbed();
                } else {
                    jrposition = 402;
                    DrawJunior();
                }
                break;
            case 402:
                jrposition = 102;
                DrawJunior();
                break;
            default:
                TryMove(move.DOWN);
        }

    }
}

function KillJunior() {
    //Reset();
}