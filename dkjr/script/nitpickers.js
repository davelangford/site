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
    if (Math.floor(Math.random() * 100) < difficulty) {
        nitpickers.push(nitpickerstart);
    }
}

function MoveNitPickers() {
    if (GameplayPaused()) return;
    $('.nitpicker').remove();
    for (i = 0; i < nitpickers.length; i++) {
        MoveNitPicker(i);
    }
    for (i = 0; i < nitpickers.length; i++) {
        if (nitpickers[i] != 0) {
            var $div = $("#gamebackground").append("<div id='sj" + nitpickers[i] +
                "' class=\"spritecanvas nitpicker\" style='background-image: url(\"images\/np\/np" + nitpickers[i] + ".png\")'></div>");
        }
    }
}

function MoveNitPicker(nitpickerindex) {
    if(nitpickers[nitpickerindex]==jrposition){
        KillJunior();
    }
    switch (nitpickers[nitpickerindex]) {
        case 208:
            nitpickers.splice(nitpickerindex, nitpickerindex + 1);
            break;
        default:
            nitpickers[nitpickerindex]++;
    }
}
