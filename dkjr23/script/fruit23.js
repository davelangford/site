class Fruit extends Object23 {
    constructor(fps) {
        super(fps);
        this.position = 405;
        this.image.src = `images/fruit/fruit${this.position}.png`;
        this.used = false;
    }
    update() {
    }
    draw(deltaTime) {
        if (this.used) return;
        if (gameState == States.FruitDropping)
        {
            if (this.frameReady(deltaTime)) {
                snapJaws.forEach(sj => {
                    if (sj.position == fruit.position) {
                        sj.dead = true;
                        newScore = currentScore + 9;

                    }
                });
                nitPickers.forEach(np => {
                    if (np.position == fruit.position) {
                        np.dead = true;
                        newScore = currentScore + 6;
                    }
                });
                if (this.position == 105) {
                    this.used = true;
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

    reset() {
        this.position = 405;
        this.used = false;
    }
}