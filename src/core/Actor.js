export class Actor {
    constructor(x=0, y=0, width = 40, height = 40) {
        this.x = x
        this.y = y 
        this.width = width
        this.height = height
        this.sprite = null
        this.game = null
        
    }

    setSprite(sprite) {
        this.sprite = sprite
    }

    update(dt) {}

    draw(ctx) {
        if (this.sprite) {
            this.sprite.draw(
                ctx, this.x, this.y, this.width, this.height
            )
        }
    }
}