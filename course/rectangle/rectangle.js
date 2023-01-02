var canvas;
var context;

$(document).ready(function () {
    InitCanvas();

    let x, y, w, h, fill, stroke;

    const num = 20;
    const degrees = -30;
    const rects = [];

    for (var i = 0; i < num; i++) {
        x = getRandomInt(0, canvas.width);
        y = getRandomInt(0, canvas.height);
        w = getRandomInt(200, 600);
        h = getRandomInt(40, 200);

        fill = `rgba(0, 0, ${getRandomInt(0, 255)})`;
        stroke = 'black';

        rects.push({ x, y, w, h, fill, stroke });
    }

    rects.forEach(rect => {
        const { x, y, w, h, fill, stroke } = rect;

        context.save();
        context.translate(x, y);
        context.strokeStyle = stroke;
        context.fillStyle = fill;

        drawSkewRect({ w, h, degrees });
        context.stroke();
        context.fill();

        context.restore();
    });
});

const drawSkewRect = ({ w = 600, h = 200, degrees = -45 }) => {
    const angle = DegToRad(degrees);
    const rx = Math.cos(angle) * w;
    const ry = Math.sin(angle) * w;

    context.save();
    context.translate(rx * -0.5, (ry + h) * -0.5);

    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(rx, ry);
    context.lineTo(rx, ry + h);
    context.lineTo(0, h);
    context.closePath();
    context.stroke();

    context.restore();
}

// function to convert degrees to radians
function DegToRad(degrees) {
    return degrees * Math.PI / 180;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




function InitCanvas() {
    canvas = document.getElementById('canvas');
    canvas.width = 1000;
    canvas.height = 1000;
    context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
}