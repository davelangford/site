class Satellite {
    constructor(x, y) {
        this.r = 20;
        this.pos = createPoint(x, y);
        this.mass = this.r * this.r;
    }

    draw() {

        ctx.fillStyle = "blue";

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fill();

        if (mouseDown) {
            var steps = 100;
            var distanceX = this.pos.x - mouseX;
            var distanceY = this.pos.y - mouseY;

            for (var i = 0; i < steps; i++) {
                ctx.fillStyle = `rgba(0, 255, 255, ${(steps - i) / steps})`;

                ctx.beginPath();
                ctx.arc(this.pos.x + distanceX / steps * i, this.pos.y + distanceY / steps * i, this.r * (steps - i) / steps, 0, 2 * Math.PI);
                ctx.fill();
            }
            // ctx.strokeStyle = "white";
            // ctx.beginPath();
            // ctx.moveTo(this.pos.x, this.pos.y);
            // ctx.lineTo(this.pos.x + distanceX, this.pos.y + distanceY);
            // ctx.stroke();
        }

    }
}

