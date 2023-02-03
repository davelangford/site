class Miss extends Object23 {
	constructor() {
		super(1);
		this.missCount = 0;
	}
	draw() {
		if (this.missCount == 0) return;
			
		if (this.missCount > 0 && this.missCount <= 2) {
			this.position = this.missCount;
		} else {
			this.position = 3;
		}
		this.image.src = `images/miss/miss${this.position}.png`;
		ctx.drawImage(this.image, screen.x, screen.y, screen.width, screen.height);
	}
}