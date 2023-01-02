var canvas;
var ctx;
var points;


$(document).ready(function () {
    InitCanvas();

    $('#canvas').on('mousedown', function (e) {
        $(document).on('mousemove', function (e) {
            const x = (e.pageX / canvas.offsetWidth) * canvas.width;
            const y = (e.pageY / canvas.offsetHeight) * canvas.height;
            //console.log(x, y);

            points.forEach(function (point) {
                if (point.isDragging) {
                    point.x = x;
                    point.y = y;
                }
            });

        });

        const x = (e.pageX / canvas.offsetWidth) * canvas.width;
        const y = (e.pageY / canvas.offsetHeight) * canvas.height;
        points.forEach(point => {
            point.isDragging = point.hitTest(x, y);
        });

    });
    $('#canvas').on('mouseup', function () {
        $(document).off('mousemove');
        $(document).off('mouseup');
    });

    points = [
        new Point(200, 540),
        new Point(400, 300, true),
        new Point(880, 540),
    ];

    setInterval(() => {
        Draw();
    }, 1000 / 60);
});

function Draw() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.quadraticCurveTo(points[1].x, points[1].y, points[2].x, points[2].y);
    //ctx.strokeStyle = "#FF0000";
    ctx.stroke();

    points.forEach(function (point) {
        point.draw(ctx);
    });
}

class Point {

    constructor(x, y, control = false) {
        this.x = x;
        this.y = y;
        this.control = control;
    }

    draw(context) {
        //ctx.fillStyle = 'white';
        //ctx.fillRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.translate(this.x, this.y);
        context.fillStyle = this.control ? "#FF0000" : "#0000FF";

        context.beginPath();
        context.arc(0, 0, 10, 0, 2 * Math.PI);
        context.fill();

        context.restore();
    }

    hitTest(x, y) {
        const dx = this.x - x;
        const dy = this.y - y;
        const dd = Math.sqrt(dx * dx + dy * dy);

        if (dd < 20) {
            return true;
        } else {
            return false;
        }
    }
}




function InitCanvas() {
    canvas = document.getElementById('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
}