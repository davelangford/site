class SnapJaw extends Object23 {
    constructor(fps) {
        super(fps);
        this.position = 303;
        this.image.src = `images/sj/sj${this.position}.png`;
        this.direction = 1;
        this.remove = false;
        this.frameTimer = randomInt(0, 2000);
    }
    update() {
        
    }
    draw(deltaTime) {
        if (gameState == States.Playing) {

            if (this.frameReady(deltaTime)) {
                if (this.position == 307) {
                    snapJaws.push(new SnapJaw(1));
                }
                if (this.position == 308) {
                    this.position = 108;
                    this.direction = -1;
                }
                this.position += this.direction;
                if (this.position <= 100) {
                    this.remove = true;
                    return;
                }
                this.image.src = `images/sj/sj${this.position}.png`;
            }
        }
        ctx.drawImage(this.image, screen.x, screen.y, screen.width, screen.height);
    }
}

$(document).ready(function () {
    snapJaws.push(new SnapJaw(1));

});