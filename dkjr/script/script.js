var difficulty = 20;
var cagesLeft=4;

function GameplayPaused() {
    if (fruitIsDropping || killingJunior) return true;
}