var keyStart = 1;
var keyGrabbed = false;
var keyPosition = keyStart;
var swingDirection = "RIGHT";

$(document).ready(function () {
    ResetKey();
    setInterval(function () {
        SwingKey();
    }, 600);
});

function ResetKey() {
    keypo = keyStart;
    DrawKey();
}

function SwingKey() {
    if (keyGrabbed) {
        $("#key").css("background-image", "");
        return;
    }

    if (keyPosition == 1) {
        swingDirection = "RIGHT";
    }
    if (keyPosition == 4) {
        swingDirection = "LEFT";
    }
    switch (swingDirection) {
        case "LEFT":
            keyPosition--;
            break;
        case "RIGHT":
            keyPosition++;
            break;
    }
    DrawKey();
    if (keyPosition == 1 && jrposition == 403) {
        keyGrabbed = true;
    }
}

function DrawKey() {
    $("#key").show();
    $("#key").css("background-image", "url(images/key/key" + keyPosition + ".png)");
}

function KeyGrabbed() {
    setTimeout(() => {
        jrposition = 402;
        AudioPlay(audio_jr_move);
        DrawJunior();
        keyGrabbed = false;
        //ResetCages();
    }, 3000);
}