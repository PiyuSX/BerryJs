export class Camera {
    constructor(width, height) {
        this.x = 0
        this.y = 0
        this.width = width
        this.height = height
        this.target = null
        this.minX = null
        this.minY = null
        this.maxX = null
        this.maxY = null
    }

    follow(actor) {
        this.target = actor
    }

    setBounds(minX, minY, maxX, maxY) {
        this.minX = minX
        this.minY = minY
        this.maxX = maxX
        this.maxY = maxY
    }

    update() {
        if (!this.target) {
            this.x = 0
            this.y = 0
            return
        }

        let x = this.target.x + this.target.width / 2 - this.width / 2
        let y = this.target.y + this.target.height / 2 - this.height / 2


        if (this.minX !== null && x < this.minX) x = this.minX
        if (this.maxX !== null) {
            const edge = this.maxX - this.width
            if ((this.minX == null || edge >= this.minX) && x > edge) x = edge
        }

        if (this.minY != null && y < this.minY) y = this.minY
        if (this.maxY != null) {
            const edge = this.maxY - this.height
            if ((this.minY == null || edge >= this.minY) && y > edge) y = edge
        }

        this.x = x
        this.y = y

        
    }
}