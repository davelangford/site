var fruitStart = 405;
var fruitIsDropping = false;
var fruitPosition = fruitStart;

$(document).ready(function () {
    ResetFruit();
    setInterval(function () {
        DropFruit();
    }, 1000);
    DrawFruit();
});

function DropFruit() {
    if (jrposition == fruitStart || fruitIsDropping == true) {
        fruitIsDropping = true;
        switch (fruitPosition) {
            case 405:
            case 305:
            case 205:
                MoveFruit();
                break;
            case 105:
                ResetFruit();
                break;
        }
        DrawFruit();
    }
}

function ResetFruit() {
    if (jrposition == fruitStart) {
        jrposition = 305;
        DrawJunior();
    }
    fruitPosition = fruitStart;
    fruitIsDropping = false;
}

function MoveFruit() {
    fruitPosition -= 100;
    if (fruitPosition == 105) {
        if (snapjaws.includes(104)) {
            KillSnapJaw(104);
            return;
        } else {
            if (snapjaws.includes(fruitPosition)) {
                KillSnapJaw(fruitPosition);
                return;
            }
        }
    }
}
    function DrawFruit() {
        $("#fruit").css("background-image", "url(images/fruit/fruit" + fruitPosition + ".png)");
    }