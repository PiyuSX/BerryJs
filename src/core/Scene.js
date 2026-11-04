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