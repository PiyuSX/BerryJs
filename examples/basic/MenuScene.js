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
}