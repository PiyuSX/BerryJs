export class Actor {
    constructor(x=0, y=0, width = 40, height = 40) {
        this.x = x
        this.y = y 
        this.width = width
        this.height = height

        this.vx = 0
        this.vy = 0
        this.gravity = 0

        this.solid = false
        
        this.sprite = null
        this.game = null
        
    }

    setSprite(sprite) {
        this.sprite = sprite
    }

    update(dt) {
        this.vy += this.gravity * dt

        this.x += this.vx * dt
        this.y += this.vy * dt

    }

    draw(ctx) {
        if (this.sprite) {
            this.sprite.draw(
                ctx, this.x, this.y, this.width, this.height
            )
        }
    }
}