var snapjawstart = 302;
var snapjaws = [snapjawstart];

$(document).ready(function () {
    setInterval(function () {
        AddSnapJaw();
        MoveSnapJaws();
    }, 950);
});

function AddSnapJaw() {
    if (GameplayPaused()) return;
    if (snapjaws.includes(snapjawstart)) {
        return;
    }
    if (Math.floor(Math.random() * 100) < difficulty && !snapjaws.includes(302) && !snapjaws.includes(303)) {
        snapjaws.push(snapjawstart);
    }
}

function MoveSnapJaws() {
    if (GameplayPaused()) return;
    
    for (i = 0; i < snapjaws.length; i++) {
        if (snapjaws[i] == jrposition) {
            KillJunior().then(function () {
                MoveSnapJaw(i);
            });
        } else {
            MoveSnapJaw(i);
        }
    }
    DrawSnapJaws();
}

function MoveSnapJaw(snapjawindex) {

    switch (snapjaws[snapjawindex]) {
        case 308:
            snapjaws[snapjawindex] = 107;
            AudioPlay(audio_sj_move);
            break;
        case 302:
        case 303:
        case 304:
        case 305:
        case 306:
        case 307:
            snapjaws[snapjawindex]++;
            AudioPlay(audio_sj_move);
            break;
        case 107:
        case 106:
        case 105:
        case 104:
        case 103:
        case 102:
            snapjaws[snapjawindex]--;
            AudioPlay(audio_sj_move);
            break;
        case 101:
            snapjaws.splice(snapjawindex, snapjawindex + 1);
            break;
    }
}

function DrawSnapJaws() {
    $('.snapjaw').remove();

    //console.clear();
    for (i = 0; i < snapjaws.length; i++) {
        if (snapjaws[i] != 0) {
            var $div = $("#gamebackground").append("<div id='sj" + snapjaws[i] +
                "' class=\"spritecanvas snapjaw\" style='background-image: url(\"images\/sj\/sj" + snapjaws[i] + ".png\")'></div>");
        }
        //console.log(snapjaws[i]);
    }
}
function KillSnapJaw(snapJawPosition) {
    if (snapjaws.includes(snapJawPosition)) {
        AudioPlay(audio_cage);
        snapjaws.splice(snapjaws.indexOf(snapJawPosition), 1);
    }
    DrawSnapJaws();
}
