var move = {
    RIGHT: 0,
    LEFT: 1,
    UP: 2,
    DOWN: 3,
    JUMP: 4
};

var canMoveRight = [101, 102, 103, 104, 105, 106, 202, 204, 205, 304, 305, 306];
var canMoveLeft = [103, 104, 105, 106, 107, 204, 205, 304, 305, 306, 307];
var canMoveUp = [103, 106, 207, 304];
var canMoveDown = [201, 202, 203, 204, 205, 206, 207, 307, 404, 405, 406];
var canJump = [102, 103, 104, 105, 106, 107, 304, 305, 306];
var inTheAir = [201, 203, 206, 402, 403, 404, 405];
var deadPositions = [101];

class Junior {
    constructor() {
        this.position = 102;
        this.blink = false;
        this.image = new Image();
        this.image.src = `images/jr/jr${this.position}.png`;
    }

    draw() {
        ctx.drawImage(this.image, screen.x, screen.y, screen.width, screen.height);
    }

    update() {
        this.image.src = `images/jr/jr${this.position}.png`;
    }
    
    TryMove(direction) {
        //if (GameplayPaused()) {
        //    return;
        //}
        switch (direction) {
            case move.RIGHT:
                if (canMoveRight.includes(this.position)) {
                    this.position += 1;
                }
                break;
            case move.LEFT:
                if (canMoveLeft.includes(this.position)) {
                    switch (this.position) {
                        case 304:
                            this.position = 201;
                            break;
                        default:
                            this.position -= 1;
                    }
                }
                break;
            case move.UP:
                if (canMoveUp.includes(this.position)) {
                    switch (this.position) {
                        case 304:
                            this.position = 403;
                            break;
                        default:
                            this.position += 100;
                    }
                }
                if (canJump.includes(this.position)) {
                    this.position += 100;
                }
                break;
            case move.DOWN:
                if (canMoveDown.includes(this.position)) {
                    this.position -= 100;
                }
                break;
            case move.JUMP:
                console.log('jump');
                if (canJump.includes(this.position)) {
                    this.position += 100;
                }
                break;

            default:
                break;
        }
        this.update();
    }
}
