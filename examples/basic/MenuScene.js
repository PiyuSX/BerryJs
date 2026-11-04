import { Scene } from "../../src/index.js"

export class MenuScene extends Scene {
    start() {
        console.log("MnuScene started")
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
        ctx.font = "32px sans-serif"
        ctx.fillText("Press Enter", 280, 300)
    }
}