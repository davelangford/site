var fruitStart = 405;
var fruitIsDropping = false;
var killingJunior = false;
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
                MoveFruit();
                break;
            case 305:
                KillSnapJaw(305);
                MoveFruit();
                break;
            case 205:
                KillNitPicker(205);
                MoveFruit();
                break;
            case 105:
                KillSnapJaw(104);
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
}

function DrawFruit() {
    $("#fruit").css("background-image", "url(images/fruit/fruit" + fruitPosition + ".png)");
}