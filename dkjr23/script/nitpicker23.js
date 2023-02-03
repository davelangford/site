class NitPicker extends Object23 {
    constructor(fps, triggerFrame) {
        super(fps);
        this.position = 201;
        this.image.src = `images/np/np${this.position}.png`;
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
                nitPickers.forEach(np => {
                    if (np.position == fruit.position) {
                        np.dead = true;
                    }
                });
                this.ResetCollisionDetector();

                if (this.position == this.triggerFrame) {
                    nitPickers.push(new NitPicker(1, randomInt(205, 207)));
                }
                this.position += 1;
                if (this.position > 208) {
                    this.remove = true;
                    return;
                }
                this.image.src = `images/np/np${this.position}.png`;
            }
        }
        ctx.drawImage(this.image, screen.x, screen.y, screen.width, screen.height);
    }

}

$(document).ready(function () {
    nitPickers.push(new NitPicker(1, randomInt(206, 208)));
});