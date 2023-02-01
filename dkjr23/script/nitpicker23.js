class NitPicker extends Object23 {
    constructor(fps, triggerFrame) {
        super(fps);
        this.position = 201;
        this.image.src = `images/np/np${this.position}.png`;
        this.remove = false;
        this.triggerFrame = triggerFrame;
    }
    update() {
        
    }
    draw(deltaTime) {
        if (gameState == States.Playing) {

            if (this.frameReady(deltaTime)) {
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