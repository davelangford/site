var move = {
    RIGHT: 0,
    LEFT: 1,
    UP: 2,
    DOWN: 3,
    JUMP: 4
};

var jumpAirTime = 50;
var canMoveRight = [101, 102, 103, 104, 105, 106, 202, 204, 205, 304, 305, 306];
var canMoveLeft = [103, 104, 105, 106, 107, 204, 205, 304, 305, 306, 307];
var canMoveUp = [102, 103, 104, 105, 106, 107, 207, 304, 305, 306];
var canJump = [304];
var canMoveDown = [201, 202, 203, 204, 205, 206, 207, 307, 404, 405, 406];
var inTheAir = [201, 203, 206, 402, 403, 404, 405, 502];
var intheBushes = 101;

class Junior {
    constructor() {
        this.position = 102;
        this.image = new Image();
        this.image.src = `images/jr/jr${this.position}.png`;
        this.jumpCounter = 0;
    }

    draw() {
        ctx.drawImage(this.image, screen.x, screen.y, screen.width, screen.height);
    }

    update() {
        this.image.src = `images/jr/jr${this.position}.png`;
        if (this.position == intheBushes) {
            if (this.jumpCounter < jumpAirTime) {
                this.jumpCounter++;
            } else if (this.jumpCounter >= jumpAirTime) {
                this.jumpCounter = 0;
                this.position = 102;
                NewRound();
            }
        }
        if (inTheAir.includes(this.position)) {
            if (gameState == States.FruitDropping) return;
            if (this.position == 405 && gameState != States.FruitDropping) {
                ChangeState(States.FruitDropping);
            }
            if (this.jumpCounter < jumpAirTime) {
                this.jumpCounter++;
            } else if (this.jumpCounter >= jumpAirTime) {
                if (this.position == 403 && key.position == 1) {
                    ChangeState(States.KeyGrabbed);
                    jumpAirTime = 100;
                    UnlockCage();
                    this.position = 502;
                } else if (this.position == 403) {
                    this.position = 201;
                } else if (this.position == 502) {
                    this.position = 402;
                } else if (this.position == 402) {
                    NewRound();
                } else {
                    this.TryMove(move.DOWN);
                }
                this.jumpCounter = 0;
            }
        }

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

                    this.position += 100;
                }

                break;
            case move.DOWN:
                if (canMoveDown.includes(this.position)) {
                    this.position -= 100;
                }
                break;
            case move.JUMP:
                //console.log('jump');
                if (canJump.includes(this.position)) {
                    this.position = 403;
                }
                break;

            default:
                break;
        }
        //console.log(this.position);
    }
}
