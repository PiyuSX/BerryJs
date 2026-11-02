export class Sprite {
    constructor(image) {
        this.image = image
    }

    draw(ctx, x,y , width, height) {
        ctx.drawImage(this.image, x, y, width, height)
    }
}

