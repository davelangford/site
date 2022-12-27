var canvas;
var ctx;

$(document).ready(function () {
    canvas = document.getElementById('clouds');
    canvas.width = 500;
    canvas.height = 500;
    ctx = canvas.getContext('2d');

    for (let i = 0; i < 1000; i++) {
        drawRandomCircle();
    }
    drawRandomCircle();
});
    
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGradient(x, y, radius) {
    const gradient = ctx.createRadialGradient(x, y, radius / 1.5, x, y, radius);
    gradient.addColorStop(0, 'gainsboro');
    gradient.addColorStop(1, 'white');
    return gradient;
}

function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = createGradient(x, y - (radius / 2), radius);
    ctx.fill();
}

function drawRandomCircle() {
    let x = randomNumber(0, canvas.width);
    let y = randomNumber(0, canvas.height);
    let radius = randomNumber(50, 100);
    radius = radius * (1 - (y / canvas.height));
    drawCircle(x, y, radius);
}
