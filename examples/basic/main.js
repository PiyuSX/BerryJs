import { Game, Actor, Sprite, loadImage } from "../../src/index.js"


class Player extends Actor {
    update(dt) {
        this.x += 120 * dt

        if (this.x > this.game.width) {
            this.x = -this.width
        }
    }
}

const game = new Game({
    width: 800,
    height: 600
})

window.game = game


async function setup() {
    try {
        const image = await loadImage("/src/assets/player.png")
        const player = new Player(40, 280, 64, 64)
        player.setSprite(new Sprite(image))
        game.add(player)
        window.player = player

        game.start()
    } catch (error) {
        console.error("Sprite loading failed:", error)
    }
}

setup()