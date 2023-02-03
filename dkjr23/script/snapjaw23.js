class SnapJaw extends Object23 {
    constructor(fps, triggerFrame) {
        super(fps);
        this.position = 302;
        this.image.src = `images/sj/sj${this.position}.png`;
        this.direction = 1;
        this.remove = false;
        this.triggerFrame = triggerFrame;
        this.dead = false;
    }
    update() {
        
    }
    draw(deltaTime) {
        if (this.collisionDelay < 20) {
            this.collisionDelay++;
        } else {
            this.readyForCollision = true;
        }
        if (gameState == States.Playing) {

            if (this.frameReady(deltaTime)) {
                this.ResetCollisionDetector();
                
                if (this.position == this.triggerFrame) {
                    snapJaws.push(new SnapJaw(1, randomInt(305, 308)));
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
    ResetCollisionDetector() {
        this.collisionDelay = 0;
        this.readyForCollision = false;
    }
}

$(document).ready(function () {
    snapJaws.push(new SnapJaw(1, randomInt(306, 308)));
});