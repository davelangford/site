var canvas;
var ctx;

$(document).ready(function () {
    InitCanvas();
});

function InitCanvas() {
    canvas = document.getElementById('canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
}