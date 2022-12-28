const settings = {
    dimensions: [1080, 1080],
    animate: true
};

const sketch = () => {
    const agents = [];

    for (let i = 0; i < 40; i++) {
        agents.push(new Agent(Math.random() * settings.dimensions[0], Math.random() * settings.dimensions[1]));
    }

    return ({ context, width, height }) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);

        for (let i = 0; i < agents.length; i++) {
            const agent = agents[i];

            for (let j = i + 1; j < agents.length; j++) {

                const other = agents[j];
                const dist = agent.pos.getDistance(other.pos);

                if (dist > 255) continue;

                const hex = Math.round(255 - dist).toString(16).padStart(2, '0');
                context.lineWidth = Math.round((1 - (dist / 255)) * 10);

                context.strokeStyle = `#${hex}0000`;

                context.beginPath();
                context.moveTo(agent.pos.x, agent.pos.y);
                context.lineTo(other.pos.x, other.pos.y);

                context.stroke();
            }
        }

        agents.forEach(agent => {
            agent.update();
            agent.draw(context);
            agent.bounce();
        });
    };
};

canvasSketch(sketch, settings);

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    getDistance(v) {
        return Math.sqrt(Math.pow(this.x - v.x, 2) + Math.pow(this.y - v.y, 2));
    }
}

class Agent {
    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(randomNumber(-1, 1), randomNumber(-1, 1));
        this.radius = randomNumber(4, 12);
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    bounce() {
        if (this.pos.x < 0 + this.radius || this.pos.x > settings.dimensions[0] - this.radius) {
            this.vel.x *= -1;
        }
        if (this.pos.y < 0 + this.radius || this.pos.y > settings.dimensions[1] - this.radius) {
            this.vel.y *= -1;
        }
    }

    draw(context) {

        context.save();
        context.translate(this.pos.x, this.pos.y);

        context.lineWidth = 4;

        context.strokeStyle = 'red';
        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        context.fill();
        context.stroke();

        context.restore();
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}