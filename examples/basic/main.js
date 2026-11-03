import { Game, Actor, Sprite, loadImage } from "../../src/index.js"


class Player extends Actor {
    update(dt) {

        super.update(dt)
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
        const player = new Player(40, 100, 64, 64)
        player.setSprite(new Sprite(image))
        game.add(player)
        window.player = player

        player.gravity = 500

        const obstacle = new Actor(0, 500, 800, 50)
        obstacle.solid = true


        game.add(obstacle)

        window.obstacle = obstacle

       

        game.start()
    } catch (error) {
        console.error("Sprite loading failed:", error)
    }
}

setup()