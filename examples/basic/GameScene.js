import { Scene, Actor, Sprite, loadImage } from "../../src/index.js"

class Player extends Actor {
    update(dt) {
        const speed = 200


        if (this.game.keyboard.isDown("ArrowRight")) {
            this.x += speed * dt
            this.flipX = false
        }

        if (this.game.keyboard.isDown("ArrowLeft")) {
            this.x -= speed * dt
            this.flipX = true
        }

        if (this.grounded && this.game.keyboard.isDown("Space")) {
            this.vy = -350
            this.grounded = false
        }

        if (!this.sprite) return

        if (!this.grounded) {
            this.sprite.setAnimation(3, 1, 2)
            this.sprite.bleed = 20

        } else if (
            this.game.keyboard.isDown("ArrowLeft") ||
            this.game.keyboard.isDown("ArrowRight")
        ) {
            this.sprite.bleed = 0
            this.sprite.setAnimation(1, 5)
        } else {
            this.sprite.bleed = 0
            this.sprite.setAnimation(0, 5)
        }
    }
}

export class GameScene extends Scene {
    async start() {
        
        this.actors.length = 0

        const image = await loadImage("/src/assets/player-sheet.png")
        const frameWidth = image.width / 5
        const frameHeight = image.height / 4

        const player = new Player(40, 100, 64, 64)

        player.setSprite(new Sprite(image, frameWidth, frameHeight))
        player.sprite.offsetY = 18
        player.gravity = 500

        const platform = new Actor(0, 500, 1600, 50)
        platform.solid = true
        platform.color = "#3ddc84"

        this.add(player)
        this.game.camera.follow(player)
        this.add(platform)
    }
    
    update(dt) {
        if (this.game.keyboard.isDown("Escape")) {
            this.game.setScene(this.game.menuScene)
        }
    }
}


