class SevenSeg {
    constructor(left, top) {
        this.left = left;
        this.top = top;
        this.imageTC = new Image();
        this.imageTL = new Image();
        this.imageTR = new Image();
        this.imageCC = new Image();
        this.imageBC = new Image();
        this.imageBL = new Image();
        this.imageBR = new Image();
        this.imageTC.src = 'images/7seg/t.png';
        this.imageTL.src = 'images/7seg/tl.png';
        this.imageTR.src = 'images/7seg/tr.png';
        this.imageCC.src = 'images/7seg/c.png';
        this.imageBC.src = 'images/7seg/b.png';
        this.imageBL.src = 'images/7seg/bl.png';
        this.imageBR.src = 'images/7seg/br.png';
    }

    draw(val) {
        switch (val) {
            case 0, '0':
                ctx.drawImage(this.imageTC, this.left, this.top);
                ctx.drawImage(this.imageTL, this.left, this.top);
                ctx.drawImage(this.imageTR, this.left, this.top);
                ctx.drawImage(this.imageBC, this.left, this.top);
                ctx.drawImage(this.imageBL, this.left, this.top);
                ctx.drawImage(this.imageBR, this.left, this.top);
                break;
            case 1, '1':
                ctx.drawImage(this.imageTR, this.left, this.top);
                ctx.drawImage(this.imageBR, this.left, this.top);
                break;
            case 2, '2':
                ctx.drawImage(this.imageTC, this.left, this.top);
                ctx.drawImage(this.imageTR, this.left, this.top);
                ctx.drawImage(this.imageCC, this.left, this.top);
                ctx.drawImage(this.imageBC, this.left, this.top);
                ctx.drawImage(this.imageBL, this.left, this.top);
                break;
            case 3, '3':
                ctx.drawImage(this.imageTC, this.left, this.top);
                ctx.drawImage(this.imageTR, this.left, this.top);
                ctx.drawImage(this.imageCC, this.left, this.top);
                ctx.drawImage(this.imageBC, this.left, this.top);
                ctx.drawImage(this.imageBR, this.left, this.top);
                break;
            case 4, '4':
                ctx.drawImage(this.imageTL, this.left, this.top);
                ctx.drawImage(this.imageTR, this.left, this.top);
                ctx.drawImage(this.imageCC, this.left, this.top);
                ctx.drawImage(this.imageBR, this.left, this.top);
                break;
            case 5, '5':
                ctx.drawImage(this.imageTC, this.left, this.top);
                ctx.drawImage(this.imageTL, this.left, this.top);
                ctx.drawImage(this.imageCC, this.left, this.top);
                ctx.drawImage(this.imageBC, this.left, this.top);
                ctx.drawImage(this.imageBR, this.left, this.top);
                break;
            case 6, '6':
                ctx.drawImage(this.imageTC, this.left, this.top);
                ctx.drawImage(this.imageTL, this.left, this.top);
                ctx.drawImage(this.imageCC, this.left, this.top);
                ctx.drawImage(this.imageBC, this.left, this.top);
                ctx.drawImage(this.imageBL, this.left, this.top);
                ctx.drawImage(this.imageBR, this.left, this.top);
                break;
            case 7, '7':
                ctx.drawImage(this.imageTC, this.left, this.top);
                ctx.drawImage(this.imageTR, this.left, this.top);
                ctx.drawImage(this.imageBR, this.left, this.top);
                break;
            case 8, '8':
                ctx.drawImage(this.imageTC, this.left, this.top);
                ctx.drawImage(this.imageTL, this.left, this.top);
                ctx.drawImage(this.imageTR, this.left, this.top);
                ctx.drawImage(this.imageCC, this.left, this.top);
                ctx.drawImage(this.imageBC, this.left, this.top);
                ctx.drawImage(this.imageBL, this.left, this.top);
                ctx.drawImage(this.imageBR, this.left, this.top);
                break;
            case 9, '9':
                ctx.drawImage(this.imageTC, this.left, this.top);
                ctx.drawImage(this.imageTL, this.left, this.top);
                ctx.drawImage(this.imageTR, this.left, this.top);
                ctx.drawImage(this.imageCC, this.left, this.top);
                ctx.drawImage(this.imageBC, this.left, this.top);
                ctx.drawImage(this.imageBR, this.left, this.top);
                break;
            default:
                break;
        }

    }
}