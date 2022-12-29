var canvas;
var context;
let text = "A";
let fontSize = 1200;
let fontFamily = 'serif';

$(document).ready(function () {
    InitCanvas();

    Draw(canvas.width, canvas.height);
   
});

function Draw(width, height) {
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
    context.font = `${fontSize}px ${fontFamily}`;
    context.textBaseline = "top";
    //context.textAlign = "center";


    const metrics = context.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1;
    const my = metrics.actualBoundingBoxAscent * -1;
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

    const x = (width - mw) / 2 - mx;
    const y = (height - mh) / 2 - my;

    context.save();
    context.translate(x, y);

    context.beginPath();
    context.rect(mx, my, mw, mh);
    context.stroke();

    context.fillText(text, 0, 0);
    context.restore();
}

function InitCanvas() {
    canvas = document.getElementById('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'black';
}

const onKeyUp = (e) => {
    // set text to uppercase of the key pressed
    text = e.key.toUpperCase();
    Draw(canvas.width, canvas.height);
}

document.addEventListener('keyup', onKeyUp);