class Object23 {
    constructor(fps) {
        this.fps = fps;

        this.image = new Image();
        this.frameTimer = 0;
        this.frameInterval = 1000 / this.fps;
        this.collisionDelay = 0;
        this.readyForCollision = false;
    }
    frameReady(deltaTime) {
        if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            return true;
        } else {
            this.frameTimer += deltaTime;
            return false;
        }
    }
    ResetCollisionDetector() {
        this.collisionDelay = 0;
        this.readyForCollision = false;
    }
}