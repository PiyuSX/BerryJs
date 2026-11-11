
import { Scene } from "berryjs"

export class MenuScene extends Scene {
    start() {
        console.log("MenuScene started")
        this.game.camera.follow(null)
    }

    update(dt) {
        if (this.game.keyboard.isDown("Enter")) {
            this.game.setScene(this.game.gameScene)
        }
    }

    end() {
        console.log("Leaving menu")
    }

    draw(ctx) {
    ctx.fillStyle = "white"
    ctx.textAlign = "center"

    ctx.font = "48px sans-serif"
    ctx.fillText("🍓 BerryJs v1", this.game.width / 2, 250)

    ctx.font = "32px sans-serif"
    ctx.fillText("Press Enter", this.game.width / 2, 320)

    ctx.font = "16px sans-serif"
    ctx.fillStyle = "#aaaaaa"
    ctx.fillText("Edit GameScene.js to change the game", this.game.width / 2, 370)

    ctx.textAlign = "right"
    ctx.font = "12px sans-serif"
    ctx.fillStyle = "#888888"
    ctx.fillText("By Piyush", this.game.width - 15, this.game.height - 30)
    ctx.fillStyle = "#4da6ff"
    ctx.fillText("piyushrajbanshi.com.np", this.game.width - 15, this.game.height - 14)
}
}
