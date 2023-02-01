/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('dkjr23canvas');
const ctx = canvas.getContext('2d');
const gameOver = false;
var background;
var screen;
var junior;
var key;
var gameState;
var cages = [];
var cagesVisible = true;
var fruit;
var snapJaws = [];
var nitPickers = [];

const States = {
    Playing: 0,
    GameOver: 1,
    KeyGrabbed: 2,
    MonkeyFreed: 3,
    FruitDropping: 4,
    Dying: 5,
}

class Background {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.image = new Image();
        this.image.src = 'images/device/device.png';

    }

    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

class Screen {
    constructor() {
        this.x = 330;
        this.y = 145;
        this.width = 670;
        this.height = 445;
        this.right = this.x + this.width;
        this.bottom = this.y + this.height;

        this.image = new Image();
        this.image.src = 'images/device/screen.png';
    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

function ChangeState(state) {
    gameState = state;
    console.log(Object.keys(States)[state]);
}

$(document).ready(function () {

    ChangeState(States.Playing);

    canvas.width = 1334;
    canvas.height = 750;

    background = new Background();
    screen = new Screen();
    junior = new Junior();
    key = new Key(1.5);
    fruit = new Fruit(1);

    for (var i = 1; i <= 4; i++) {
        cages.push(new Cage(i, 1));
    }

    AddEvents();

    let lastTime = 0;
    
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        screen.draw();
        junior.update();
        junior.draw();
        key.update();
        key.draw(deltaTime);
        fruit.draw(deltaTime);
        snapJaws = snapJaws.filter(sj => !sj.remove);
        snapJaws.forEach(snapJaw => {
            snapJaw.draw(deltaTime);
        });
        nitPickers = nitPickers.filter(np => !np.remove);
        nitPickers.forEach(nitPicker => {
            nitPicker.draw(deltaTime);
        });
        cages.forEach(cage => {
            cage.draw(deltaTime);
        });
        background.draw();
        if (!gameOver) requestAnimationFrame(animate);
    }
    animate(0);

});

function AddEvents() {

    detectSwipe();

    $(document).keydown(function (e) {
        if (e.keyCode == 37) {
            junior.TryMove(move.LEFT);
        }
        if (e.keyCode == 38) {
            junior.TryMove(move.UP);
        }
        if (e.keyCode == 39) {
            junior.TryMove(move.RIGHT);
        }
        if (e.keyCode == 40) {
            junior.TryMove(move.DOWN);
        }
        if (e.keyCode == 32) {
            junior.TryMove(move.JUMP);
        }
    });

}

function detectSwipe() {
    let startX;
    let startY;
    let distX;
    let distY;
    let threshold = 50; //required min distance traveled to be considered swipe
    let restraint = 300; // maximum distance allowed at the same time in perpendicular direction
    let allowedTime = 300; // maximum time allowed to travel that distance
    let elapsedTime;
    let startTime;

    window.addEventListener('touchstart', function (event) {
        let touchobj = event.changedTouches[0];
        startX = touchobj.pageX;
        startY = touchobj.pageY;
        startTime = new Date().getTime();
    }, false);

    window.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);

    window.addEventListener('touchend', function (event) {
        let touchobj = event.changedTouches[0];
        distX = touchobj.pageX - startX;
        distY = touchobj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;

        if (Math.abs(distX) >= threshold && Math.abs(distY) >= threshold) {
            if (distX < 0 && distY < 0) {
                junior.TryMove(move.JUMP);
                return;
            }
            if (Math.abs(distX) > Math.abs(distY)) {
                (distX < 0) ? junior.TryMove(move.LEFT) : junior.TryMove(move.RIGHT);
            } else {
                (distY < 0) ? junior.TryMove(move.UP) : junior.TryMove(move.DOWN);
            }
        }

        if (elapsedTime <= allowedTime) {
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                (distX < 0) ? junior.TryMove(move.LEFT) : junior.TryMove(move.RIGHT);
            } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
                (distY < 0) ? junior.TryMove(move.UP) : junior.TryMove(move.DOWN);
            }
        }

    }, false);
}

function NewRound() {
    junior.position = 102;
    ChangeState(States.Playing);
    fruit.reset();
    jumpAirTime = 30;
    snapJaws = snapJaws.filter(sj => sj.position > 103);

}

// randomInt function
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function TestRectangleDraw(x, y, width, height) {
    ctx.strokeStyle = 'white';
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.moveTo(x, y);
    ctx.stroke();

}