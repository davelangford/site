class Key extends Object23 {
    constructor(fps) {
        super(fps);
        this.position = 1;
        this.image.src = `images/key/key${this.position}.png`;
        this.direction = 1;
    }
    update() {

    }
    draw(deltaTime) {
        if (gameState == States.KeyGrabbed) return;
        
        if (this.frameReady(deltaTime)) {
            this.position += this.direction;
            if (this.position === 4) {
                this.direction = -1;
            } if (this.position === 1) {
                this.direction = 1;
            }
            this.image.src = `images/key/key${this.position}.png`;
        }
        ctx.drawImage(this.image, screen.x, screen.y, screen.width, screen.height);
        console.log(this.position);
    }

}