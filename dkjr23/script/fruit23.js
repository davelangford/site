class Fruit extends Object23 {
    constructor(fps) {
        super(fps);
        this.position = 405;
        this.image.src = `images/fruit/fruit${this.position}.png`;
    }
    update() {
    }
    draw(deltaTime) {
        if (gameState == States.FruitDropping) {
            if (this.frameReady(deltaTime)) {
                if (this.position == 105) {
                    this.position = 405;
                    junior.position = 305;
                    ChangeState(States.Playing);

                } else {
                    this.position -= 100;
                }
            }
        }
        this.image.src = `images/fruit/fruit${this.position}.png`;
        ctx.drawImage(this.image, screen.x, screen.y, screen.width, screen.height);
    }
}