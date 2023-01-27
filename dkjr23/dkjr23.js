/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('dkjr23canvas');
const ctx = canvas.getContext('2d');

const gameOver = false;


class Background {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.imageDevice = new Image();
        this.imageDevice.src = 'images/device/device.png';
        this.imageScreen = new Image();
        this.imageScreen.src = 'images/device/screen.png';

    }

    draw() {
        ctx.drawImage(this.imageScreen, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.imageDevice, this.x, this.y, this.width, this.height);
    }
}

$(document).ready(function () {

    canvas.width = 1334;
    canvas.height = 750;

    var background = new Background();
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillText('Test', 10, 50);
        ctx.strokeStyle = 'white';
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();
        ctx.moveTo(canvas.width, 0);
        ctx.lineTo(0, canvas.height);
        ctx.stroke();
       
        
        background.draw();
        //background.update();
        //player.draw();
        //player.update();
        if (!gameOver) requestAnimationFrame(animate);
    }
    animate();

});