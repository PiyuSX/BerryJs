export class Camera {
    constructor(width, height) {
        this.x = 0
        this.y = 0
        this.width = width
        this.height = height
        this.target = null
    }

    follow(actor) {
        this.target = actor
    }

    update() {
        if (!this.target) {
            this.x = 0
            this.y = 0
            return
        }

        this.x = this.target.x + this.target.width / 2 - this.width / 2
        this.y = this.target.y + this.target.height / 2 - this.height / 2
        
    }
}