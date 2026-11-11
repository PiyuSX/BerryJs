export class Actor {
    constructor(x=0, y=0, width = 40, height = 40) {
        this.x = x
        this.y = y 
        this.width = width
        this.height = height

        this.vx = 0
        this.vy = 0
        this.gravity = 0
        this.flipX = false

        this.solid = false
        this.grounded = false
        
        this.color = null
        this.sprite = null
        this.game = null
        
    }

    setSprite(sprite) {
        this.sprite = sprite
    }


    //Leaving this for Devs to override this method 
    update(dt) {
    
    }

    onOverlap(other) {
        
    }

    // Engine controlled physics
    _physics(dt) {
        this.vy += this.gravity * dt
        this.x += this.vx * dt
        this.y += this.vy * dt
    }


    // Engine calls both

    _update(dt) {
        if (this.sprite) {
            this.sprite.update(dt)
        }
        this._physics(dt)
        this.update(dt)
    }



    draw(ctx) {
        if (this.sprite) {
            this.sprite.draw(ctx, this.x, this.y, this.width, this.height, this.flipX)
            return
        }

        if (this.color) {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}