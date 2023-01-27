/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('dkjr23canvas');
const ctx = canvas.getContext('2d');

const gameOver = false;


$(document).ready(function () {

    canvas.width = 1400;
    canvas.height = 720;
    
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
       
        
        //background.draw();
        //background.update();
        //player.draw();
        //player.update();
        if (!gameOver) requestAnimationFrame(animate);
    }
    animate();

});