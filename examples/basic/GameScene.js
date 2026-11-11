import { Scene, Actor, Sprite, loadImage } from "../../src/index.js"

class Player extends Actor {
    update(dt) {
        const left = this.game.keyboard.isDown("ArrowLeft")
        const right = this.game.keyboard.isDown("ArrowRight")
        const running = this.game.keyboard.isDown("ShiftLeft") || this.game.keyboard.isDown("ShiftRight")
        const speed = running ? 300 : 200

        if (right) {
            this.x += speed * dt
            this.flipX = false
        }

        if (left) {
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
            this.sprite.offsetY = 18

        } else if (
            (left || right) && running
        ) {
            this.sprite.bleed = 0
            this.sprite.offsetY = 36
            this.sprite.setAnimation(2, 5)
        } else if (left || right) {
            this.sprite.bleed = 0
            this.sprite.offsetY = 28
            this.sprite.setAnimation(1, 5)
        } else {
            this.sprite.bleed = 0
            this.sprite.offsetY = 18
            this.sprite.setAnimation(0, 5)
        }
    }

    onOverlap(other) {
        if (other.tag !== "coin") return

        this.score += 1
        this.game.remove(other)
    }
}


export class GameScene extends Scene {
    async start() {
        
        this.actors.length = 0

        const image = await loadImage("/src/assets/player-sheet.png")
        const frameWidth = image.width / 5
        const frameHeight = image.height / 4

        const player = new Player(40, 100, 64, 64)
        player.score = 0
        this.player = player

        player.setSprite(new Sprite(image, frameWidth, frameHeight))
        player.sprite.offsetY = 18
        player.gravity = 500

        const platform = new Actor(0, 500, 1600, 50)
        platform.solid = true
        platform.color = "#3ddc84"

        this.add(player)
        this.game.camera.follow(player)
        this.game.camera.setBounds(0, null, 1600, null)
        this.add(platform)

        const coin = new Actor(400, 476, 24, 24)
        coin.tag = "coin"
        coin.color = "#ffd000"
        this.add(coin)


        const otherCoin = new Actor(700, 476, 24, 24)
        otherCoin.tag = "coin"
        otherCoin.color = "#ffd000"
        this.add(otherCoin)
    }
    
    update(dt) {
        if (this.game.keyboard.isDown("Escape")) {
            this.game.setScene(this.game.menuScene)
        }
    }

    draw(ctx) {
        if (!this.player) return

        ctx.fillStyle = "white"
        ctx.font = "24px sans-serif"
        ctx.fillText("Score: " + this.player.score, 24, 40)
    }
}




