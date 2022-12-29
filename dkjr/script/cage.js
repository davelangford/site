var cageCount = 3;

$(document).ready(function () {
    CreateCages();
    setInterval(function () {
        BlinkCages();
    }, 800);

    $('#addCageBtn').on('click', function () {
        AddCage();
    });
});

function CreateCages() {
    for (var i = 1; i <= 4; i++) {
        // create cage div
        var cage = document.createElement("div");
        cage.id = "cage" + i;
        cage.className = "spritecanvas cage";
        cage.style.backgroundImage = "url(images/cage/cage" + i + ".png)";
        document.getElementById("gamebackground").appendChild(cage);
    }
}

function BlinkCages() {
    var visibility;
    if ($("#cage1").css("visibility") == "visible") {
        visibility = "hidden";
    } else {
        visibility = "visible";
    }

    for (var i = 1; i <= cageCount; i++) {
        $("#cage" + i).css("visibility", visibility);
    }
}

function AddCage() {
    if (cageCount < 4) {
        cageCount++;
    } else {
        ResetCages();
    }
}

function ResetCages() {
    cageCount = 0;
    for (var i = 1; i <= 4; i++) {
        $("#cage" + i).css("visibility", "visible");
    }

}
