class Satellite {
    constructor(x, y) {
        this.r = 10;
        this.pos = createPoint(x, y);
        this.mass = this.r * this.r;
        this.hasLaunched = false;
        this.trail = [];
        this.trailCounter = 0;
    }

    update() {
        if (this.hasLaunched) {
            var distanceX = planet.pos.x - this.pos.x;
            var distanceY = planet.pos.y - this.pos.y;
            var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            var force = planet.mass / distance; //  * distance);
            var angle = Math.atan2(distanceY, distanceX);
            var forceX = Math.cos(angle) * force;
            var forceY = Math.sin(angle) * force;

            this.vel.y += forceY;
            this.vel.x += forceX;

            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
        }
        if (this.trailCounter++ % 5 == 0) {
            this.trail.push(createPoint(this.pos.x, this.pos.y));
            if (this.trailCounter > 1000) {
                this.trailCounter = 0;
            }
        }
        if (this.trail.length > 1000) {

            this.trail.shift();
        }


    }
    draw() {
        if (mouseDown && !this.hasLaunched) {
            var steps = 30;
            var distanceX = this.pos.x - mouseX;
            var distanceY = this.pos.y - mouseY;

            for (var i = 0; i < steps; i++) {
                ctx.fillStyle = `rgba(0, 0, 255, ${(steps - i) / steps / 2})`;

                ctx.beginPath();
                ctx.arc(this.pos.x + distanceX / steps * i, this.pos.y + distanceY / steps * i, this.r * (steps - i) / steps, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fill();

        // draw line between each point in trail


        ctx.beginPath();
        for (let i = 1; i < this.trail.length - 1; i++) {
            let xc = (this.trail[i].x + this.trail[i + 1].x) / 2;
            let yc = (this.trail[i].y + this.trail[i + 1].y) / 2;
            ctx.quadraticCurveTo(this.trail[i].x, this.trail[i].y, xc, yc);
        }
        //draw quadratic curve to the satellite
        ctx.quadraticCurveTo(this.trail[this.trail.length - 1].x, this.trail[this.trail.length - 1].y, this.pos.x, this.pos.y);

        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, 'rgb(0, 255, 255)');
        gradient.addColorStop(0.5, 'white');
        gradient.addColorStop(1, 'rgb(0, 255, 255)');
        ctx.strokeStyle = gradient;
        
        ctx.lineWidth = 1;
        // ctx.strokeStyle = "lightblue";
        ctx.stroke();






        // for(var i = 0; i < this.trail.length - 1; i++) {
        //     ctx.strokeStyle = `rgba(0, 200, 255, 1)`;
        //     ctx.beginPath();
        //     ctx.moveTo(this.trail[i].x, this.trail[i].y);
        //     ctx.lineTo(this.trail[i + 1].x, this.trail[i + 1].y);
        //     ctx.stroke();
        // }


        // for(var i = 0; i < this.trail.length; i++) {
        //     ctx.fillStyle = `rgba(0, 200, 255, 1)`;
        //     ctx.beginPath();
        //     ctx.arc(this.trail[i].x, this.trail[i].y, 1, 0, 2 * Math.PI);
        //     ctx.fill();
        // }
    }

    launch() {
        this.hasLaunched = true;
        this.vel = createPoint((this.pos.x - mouseX) / 10, (this.pos.y - mouseY) / 10);
    }

}

