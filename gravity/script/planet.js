class Planet {
    constructor() {
        this.r = randomInt(45, 70);
        this.pos = createPoint(randomInt(this.r, width - this.r), randomInt(this.r, height - this.r));
        this.mass = this.r* this.r;
    }

    draw() {
        
        ctx.fillStyle = "red";

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fill();

    }
}

