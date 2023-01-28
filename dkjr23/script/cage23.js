class Cage extends Object23 {
    constructor(position, fps) {
        super(fps);
        this.position = position;
        this.image.src = `images/cage/cage${this.position}.png`;
        this.direction = 1;
        this.unlocked = false;
        this.visible = true;
    }
    update() {
        
    }
    draw(deltaTime) {
        if (this.frameReady(deltaTime)) {
            if (this.unlocked) {
                this.visible = !this.visible;
            } else {
                this.visible = true;
            }
        }
        if (this.visible) {
            ctx.drawImage(this.image, screen.x, screen.y, screen.width, screen.height);
        }
    }
}

function UnlockCage() {
    for (let i = 0; i < cages.length; i++) {
        if (!cages[i].unlocked) {
            cages[i].unlocked = true;
            break;
        }
    }
}