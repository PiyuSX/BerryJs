import { Scene, Actor, Sprite, loadImage } from "../../src/index.js"

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

export class GameScene extends Scene {
    async start() {
        const image = await loadImage("/src/assets/player.png")

        const player = new Player(40, 100, 64, 64)

        player.setSprite(new Sprite(image))
        player.gravity = 500

        const platform = new Actor(0, 500, 800, 50)
        platform.solid = true

        this.add(player)
        this.add(platform)
    }
    
    update(dt) {
        if (this.game.keyboard.isDown("Escape")) {
            this.game.setScene(this.game.menuScene)
        }
    }
}