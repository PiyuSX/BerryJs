import { Game } from "../../src/index.js"

class BasicExample extends Game {
    constructor() {
        super({width: 900, height: 600})
        this.x = 40
        this.speed = 120
    }

    update(dt) {
        this.x += this.speed * dt

        if (this.x > this.width) {
            this.x = -40
        }
    }

    render() {
        super.render()

        this.ctx.fillStyle = "#e23d4a"
        this.ctx.fillRect(this.x, 200, 40, 40)
    }
}

const game = new BasicExample()
game.start()

window.game = game