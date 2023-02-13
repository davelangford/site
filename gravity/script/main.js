/** @type {HTMLCanvasElement} */

var canvas = document.getElementById("galaxy");
var ctx = canvas.getContext("2d");
var width = canvas.width = window.innerWidth - 200;
var height = canvas.height = window.innerHeight - 200;
var planet = new Planet();;
var satellite;
var mouseDown = false;
var hasLaunched = false;

$(document).ready(function () {
    animate();

    addEvents();
});

function animate() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    planet.draw();
    if (satellite) {
        satellite.update();
        satellite.draw();
    }

    requestAnimationFrame(animate);
}

function addEvents() {
    $("#galaxy").on("mousedown touchstart", function (event) {
        event.preventDefault();
        mouseDown = true;
        var x, y;
        if (event.type === "mousedown") {
            x = event.offsetX;
            y = event.offsetY;
        } else {
            x = event.originalEvent.touches[0].pageX - $(this).offset().left;
            y = event.originalEvent.touches[0].pageY - $(this).offset().top;
        }
        satellite = new Satellite(x, y);
    });
    $("#galaxy").on("mouseup touchend", function (event) {
        if(mouseDown && !satellite.hasLaunched) {
            satellite.launch();
        }
        mouseDown = false;
    });
    $("#galaxy").on("mousemove touchmove", function (event) {
        event.preventDefault();
        var x, y;
        if (event.type === "mousemove") {
            x = event.offsetX;
            y = event.offsetY;
        } else {
            x = event.originalEvent.touches[0].pageX - $(this).offset().left;
            y = event.originalEvent.touches[0].pageY - $(this).offset().top;
        }
        mouseX = x;
        mouseY = y;
    });
}



