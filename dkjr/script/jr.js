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

function AddSwipes() {
    detectSwipe();
    //$(document).on("swiperight", function () {
    //    console.log('asf');
    //    TryMove(move.RIGHT);
    //});
    //$(document).on("swipeleft", function () {
    //    TryMove(move.LEFT);
    //});
    //$(document).on("swipeup", function () {
    //    TryMove(move.UP);
    //});
    //$(document).on("swipedown", function () {
    //    TryMove(move.DOWN);
    //});

    //var touchX = '';// e.changedTouches[0].pageX;
    //var touchY = '' // e.changedTouches[0].pageY;
    //var touchThreshold = 30;
    //var isMoving = false;

    //$(window).on('touchstart', e => {
    //    touchX = e.changedTouches[0].pageX;
    //    touchY = e.changedTouches[0].pageY;
    //});
    //// touchmove on window
    //$(window).on('touchmove', e => {

    //});
    //// touchend event on window
    //$(window).on('touchend', e => {
    //    const swipeDistanceX = e.changedTouches[0].pageX - touchX;
    //    const swipeDistanceY = e.changedTouches[0].pageY - touchY;

    //    if (Math.abs(swipeDistanceX) < touchThreshold) {// it's a vertical swipe
    //        if (swipeDistanceY < -touchThreshold) {
    //            TryMove(move.UP);
    //        } else if (swipeDistanceY > touchThreshold) {
    //            TryMove(move.DOWN);
    //        }
    //    } else {
    //        if (swipeDistanceX < -touchThreshold) {
    //            TryMove(move.LEFT);
    //        } else if (swipeDistanceX > touchThreshold) {
    //            TryMove(move.RIGHT);
    //        }
    //    }
    //});
}

function detectSwipe() {
    let swipeDirection;
    let startX;
    let startY;
    let distX;
    let distY;
    let threshold = 150; //required min distance traveled to be considered swipe
    let restraint = 100; // maximum distance allowed at the same time in perpendicular direction
    let allowedTime = 300; // maximum time allowed to travel that distance
    let elapsedTime;
    let startTime;

    window.addEventListener('touchstart', function (event) {
        let touchobj = event.changedTouches[0];
        swipeDirection = 'none';
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
    }, false);

    window.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);

    window.addEventListener('touchend', function (event) {
        let touchobj = event.changedTouches[0];
        distX = touchobj.pageX - startX;
        distY = touchobj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;

        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                
                swipeDirection = (distX < 0) ? TryMove(move.LEFT) : TryMove(move.RIGHT);
            } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                swipeDirection = (distY < 0) ? TryMove(move.UP) : TryMove(move.DOWN);
            }
        }

        if (Math.abs(distX) >= threshold && Math.abs(distY) >= threshold) {
            if (Math.abs(distX) > Math.abs(distY)) {
                swipeDirection = (distX < 0) ? TryMove(move.LEFT) : TryMove(move.RIGHT);
            } else {
                swipeDirection = (distY < 0) ? TryMove(move.UP) : TryMove(move.DOWN);
            }
        }
        return swipeDirection;
    }, false);
}




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
    AddSwipes();

    $(document).keydown(function (e) {
        if (e.keyCode == 37) {
            TryMove(move.LEFT);
        }
        if (e.keyCode == 38) {
            TryMove(move.UP);
        }
        if (e.keyCode == 39) {
            TryMove(move.RIGHT);
        }
        if (e.keyCode == 40) {
            TryMove(move.DOWN);
        }
        if (e.keyCode == 32) {
            TryMove(move.JUMP);
        }
    });

    DrawJunior();
});

function PreLoadImages() {
    //for (var i = 101; i < 600; i++) {
    //    $("<img />").attr("src", `images/jr/jr${i}.png`);
    //}
}
function TryMove(direction) {
    if (GameplayPaused()) {
        return;
    }


    switch (direction) {
        case move.RIGHT:
            if (canMoveRight.includes(jrposition)) {
                jrposition += 1;
                AudioPlay(audio_jr_move);
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
                        AudioPlay(audio_jr_move);
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
                        AudioPlay(audio_jr_move);
                }
            }
            if (canJump.includes(jrposition)) {
                jrposition += 100;
                AudioPlay(audio_jr_move);
            }
            break;
        case move.DOWN:
            if (canMoveDown.includes(jrposition)) {
                jrposition -= 100;
                AudioPlay(audio_jr_move);
            }
            break;
        case move.JUMP:
            if (canJump.includes(jrposition)) {
                jrposition += 100;
                AudioPlay(audio_jr_move);
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
    killingJunior = false;
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
                    AddCage();
                } else {
                    jrposition = 402;
                    AudioPlay(audio_jr_move);
                    DrawJunior();
                }
                break;
            case 402:
                jrposition = 102;
                AudioPlay(audio_jr_move);
                DrawJunior();
                if (cageCount == 4) {
                    ResetCages();
                }
                break;
            default:
                TryMove(move.DOWN);
                AudioPlay(audio_jr_move);

        }

    }
}

function KillJunior() {
    if (document.getElementById("invincibleCheckbox").checked == true) {
        return Promise.resolve();
    }

    killingJunior = true;
    AudioPlay(audio_jr_kill);
    $('#jr').hide(500).show(500).hide(500).show(500).hide(500).show(500);

    setTimeout(function () {
        Reset();

        snapjaws = snapjaws.filter(function (value, index, arr) {
            return value > 104;
        });


        return Promise.resolve();
    }, 3000);
}

