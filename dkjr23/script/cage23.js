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
        if (gameState == States.MonkeyFreed) {
            this.visible = true;
            return;
        }
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
    var i = 0;
    for (i; i < 4 ; i++) {
        if (!cages[i].unlocked) {
            cages[i].unlocked = true;
            break;
        }
    }
    if (i == 3) {
        ChangeState(States.MonkeyFreed);
        cages.forEach(cage => {
            cage.unlocked = false;

        });
    }
}