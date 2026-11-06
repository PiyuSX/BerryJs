export class Scene {
    constructor(game) {
        this.actors = []
        this.game = null
    }

    add(actor) {
        if (!actor) throw new Error("Actor is required")
        if (this.actors.includes(actor)) return

        actor.game = this.game
        this.actors.push(actor)
    }

    remove(actor) {
        if (this.game && this.game.scene === this) {
            this.game.remove(actor)
            return
        }

        this.actors = this.actors.filter(item => item !== actor)
    }

    start() {

    }

    update(dt) {

    }

    draw(ctx) {
        
    }

    end() {

    }

}