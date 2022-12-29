var canvas;
var ctx;
let text = 'A';
let fontSize = 1200;
let fontFamily = 'serif';

const typeCanvas = document.createElement('canvas');
const typeCtx = typeCanvas.getContext('2d');

const Draw = ({ context, width, height }) => {
    const cell = 20;
    const cols = Math.floor(width / cell);
    const rows = Math.floor(height / cell);
    const numCells = cols * rows;

    typeCanvas.width = cols;
    typeCanvas.height = rows;



    //const Draw = () => {
    typeCtx.fillStyle = 'white';
    typeCtx.fillRect(0, 0, cols, canvasrows);
    typeCtx.font = `${fontSize}px ${fontFamily}`;
    typeCtx.textBaseline = 'middle';
    typeCtx.textAlign = 'center';

    const metrics = typeCtx.measureText(text);
    const mx = metrics.actualBoundingBoxLeft * -1 + (canvas.width * 0.5);
    const my = metrics.actualBoundingBoxAscent * -1 + (canvas.height * 0.5);
    const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
    const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    
    const x = (cols - mw) * 0.5 - mx;
    const y = (rows - mh) * 0.5 - my;

    typeCtx.fillStyle = 'black';

    typeCtx.beginPath();
    typeCtx.rect(mx, my, mw, mh);
    typeCtx.stroke();

    typeCtx.fillText(text, canvas.width * 0.5, canvas.height * 0.5);

    ctx.drawImage(typeCtx, 0, 0);
}
function InitCanvas() {
    canvas = document.getElementById('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    ctx = canvas.getContext('2d');

}

document.addEventListener('keyup', function (event) {
    text = event.key.toLocaleUpperCase();
    Draw();
});


$(document).ready(function () {
    InitCanvas();

    Draw();

});
//const start = async () => {



//const url = 'https://picsum.photos/200/300';

//const loadMeSomeImage = (url) => {
//    return new Promise((resolve, reject) => {
//        const img = new Image();
//        img.src = url;
//        img.onload = () => resolve(img);
//        img.onerror = (err) => reject(err);
//    });
//}

//const start = async () => {
//    const img = await loadMeSomeImage(url);
//    console.log('width: ' + img.width);
//    console.log('this line');
//};

//const start = () => {
//    loadMeSomeImage(url)
//        .then((img) => {
//            console.log(img.width);
//        }
//        );
//    console.log('start');
//}