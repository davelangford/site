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
    $("#galaxy").mousedown(function (event) {
        mouseDown = true;
        satellite = new Satellite(event.offsetX, event.offsetY);
    });
    $("#galaxy").mouseup(function (event) {
        if(mouseDown && !satellite.hasLaunched) {
            satellite.launch();
        }
        mouseDown = false;
    });
    $("#galaxy").mousemove(function (event) {
        mouseX = event.offsetX;
        mouseY = event.offsetY;
    });
}



