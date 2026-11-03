import { Keyboard } from "../../src/input/Keyboard.js"
import { Game, Actor, Sprite, loadImage, Collision } from "../../src/index.js"


class Player extends Actor {
    update(dt) {
        const speed = 200

        if (this.game.keyboard.isDown("ArrowRight")) {
            this.x += speed * dt
        }

        if (this.game.keyboard.isDown("ArrowLeft")) {
            this.x -= speed * dt
        }

        this.x = Math.max(0, Math.min(
            this.x,
            this.game.width - this.width
        ))
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

        const obstacle = new Actor(300, 280, 64, 64)
        game.add(obstacle)

        window.obstacle = obstacle

        window.checkCollision = () => {
            return Collision.check(player, obstacle)
        }

        game.start()
    } catch (error) {
        console.error("Sprite loading failed:", error)
    }
}

setup()