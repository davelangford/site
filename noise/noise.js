var canvas;
var ctx;

$(document).ready(function () {
    InitCanvas();
    
    const width = canvas.width;
    const height = canvas.height;
    const cols = 10;
    const rows = 10;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;

    const margx = (width - gridw) / 2;
    const margy = (height - gridh) / 2;

    for (var i = 0; i < numCells; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        const x = col * cellw;
        const y = row * cellh;
        const w = cellw * 0.8;
        const h = cellh * 0.8;

        const noise = canvasSketch.util.noise;

        const xx = 10;
        const yy = 10;
        const zz = 0.1;
        const noiseValue = noise(xx, yy, zz);
        
        ctx.save();
        ctx.translate(x, y);
        ctx.translate(margx, margy);
        ctx.translate(cellw * 0.5, cellh * 0.5);

        ctx.lineWidth = 4;
        
        ctx.beginPath();
        ctx.moveTo(w * -0.5, 0);
        ctx.lineTo(w * 0.5, 0);
        ctx.stroke();

        ctx.restore();
       
    }

    ctx.beginPath();
    ctx.arc(300, 300, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
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