var cageCount = 0;

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
    var cagesmile = document.createElement("div");
    cagesmile.id = "cagesmile";
    cagesmile.className = "spritecanvas cage";
    cagesmile.style.backgroundImage = "url(images/cage/cagesmile.png)";
    cagesmile.style.visibility = "hidden";
    document.getElementById("gamebackground").appendChild(cagesmile);
    
}

function BlinkCages() {
    var visibility;
    if (cageCount < 4) {
        $("#cagesmile").css("visibility", "hidden");
        if ($("#cage1").css("visibility") == "visible") {
            visibility = "hidden";
        } else {
            visibility = "visible";
        }

        for (var i = 1; i <= cageCount; i++) {
            $("#cage" + i).css("visibility", visibility);
        }
    } else {
        for (var i = 1; i <= 4; i++) {
            $("#cage" + i).css("visibility", "hidden");
        }
        if ($("#cagesmile").css("visibility") == "visible") {
            $("#cagesmile").css("visibility", "hidden");
        } else {
            $("#cagesmile").css("visibility", "visible");
        }
    }
}

function AddCage() {
    if (cageCount < 4) {
        audio_cage.play();
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
