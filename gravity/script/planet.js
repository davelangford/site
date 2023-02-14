class Planet {
    constructor() {
        this.r = width/20;// randomInt(width/20, 45);
        this.pos = createPoint(width/2, height/2);
        this.mass = this.r*2; // * this.r;
    }

    draw() {
        
        ctx.fillStyle = "red";

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
        ctx.fill();

    }
}

