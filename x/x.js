/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 1400;
canvas.height = 950;

$(document).ready(function () {
    var img = document.getElementById("notesImage");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
});