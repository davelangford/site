var nitpickerstart = 200;
var nitpickers = [nitpickerstart];

$(document).ready(function () {
    setInterval(function () {
        AddNitPicker();
        MoveNitPickers();
    }, 1050);
});

function AddNitPicker() {
    if (GameplayPaused()) return;
    if (snapjaws.includes(nitpickerstart)) {
        return;
    }
    if (Math.floor(Math.random() * 100) < difficulty && !nitpickers.includes(201) && !nitpickers.includes(200)) {
        nitpickers.push(nitpickerstart);
    }
}

function MoveNitPickers() {
    if (GameplayPaused()) return;
    for (i = 0; i < nitpickers.length; i++) {
        if (nitpickers[i] == jrposition) {
            KillJunior().then(function () {
                MoveNitPicker(i);
            });
        } else {
            MoveNitPicker(i);
        }
        DrawNitPickers();
    }
}

function MoveNitPicker(nitpickerindex) {
    switch (nitpickers[nitpickerindex]) {
        case 208:
            nitpickers.splice(nitpickerindex, nitpickerindex + 1);
            break;
        default:
            nitpickers[nitpickerindex]++;
            audio_np_move.play();
    }
}

function DrawNitPickers() {
    $('.nitpicker').remove();

    //console.clear();
    for (i = 0; i < nitpickers.length; i++) {
        if (nitpickers[i] != 0) {
            var $div = $("#gamebackground").append("<div id='sj" + nitpickers[i] +
                "' class=\"spritecanvas nitpicker\" style='background-image: url(\"images\/np\/np" + nitpickers[i] + ".png\")'></div>");
        }
        //console.log(nitpickers[i]);
    }
}


function KillNitPicker(nitPickerPosition) {
    if (nitpickers.includes(nitPickerPosition)) {
        audio_cage.play();
        nitpickers.splice(nitpickers.indexOf(nitPickerPosition), 1);
    }
    DrawNitPickers();
}