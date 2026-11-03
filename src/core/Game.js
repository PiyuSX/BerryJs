import { Keyboard } from "../input/Keyboard.js"
import { Collision } from "./Collision.js"

export class Game {
    constructor({
        width = 800,
        height = 600,
        parent,
        background = "#111111"
    } = {}) {
        if (width <= 0 || height <= 0) {
            throw new Error("Width and height must be greater greater than 0 bro")
        }

        this.canvas = document.createElement("canvas")
        this.ctx = this.canvas.getContext("2d")

        if (!this.ctx) {
            throw new Error("Failed to get 2d context")

        }

        this.width = width 
        this.height = height
        this.background = background
        

        this.canvas.width = width
        this.canvas.height = height

        this.actors = []

        this.keyboard = new Keyboard()

        const target = parent ?? document.body

        if (!target) {
            throw new Error("No parent element to attach the canvas")

        }

        target.appendChild(this.canvas)

        this.isRunning = false
        this.lastTime = undefined
        this.frameId = undefined
    }

    start() {
        if (this.isRunning) {
            return
        }

        this.isRunning = true
        this.lastTime = undefined
        this.frameId = requestAnimationFrame((time) => this.loop(time))
    }

    stop() {
        this.isRunning = false

        if (this.frameId !== undefined) {
            cancelAnimationFrame(this.frameId)
            this.frameId = undefined
        }
    }

    loop(time) {
        if (!this.isRunning) {
            return
        }

        if (this.lastTime === undefined) {
            this.lastTime = time
        }

        let dt = (time - this.lastTime) / 1000
        this.lastTime = time

        if (dt > 0.1) {
            dt = 0.1
        }

        this.update(dt) 
        this.render()

        if (!this.isRunning) {
            return
        }

        this.frameId = requestAnimationFrame((nextTime) => this.loop(nextTime))
    }

    update (dt) {

        // Updt all actors first 
        for (const actor of this.actors) {
            actor.update(dt)
        }

        //Check collision 

        for (const actor of this.actors) {
            if (actor.solid) continue

            for (const other of this.actors) {
                if (!other.solid || actor === other) continue

                const collision = Collision.check(actor, other)

                if (!collision) continue

                Collision.resolve(actor, collision)


                if (collision.side === "right" || collision.side === "left") {
                    actor.vx = 0
                } else {
                    actor.vy = 0
                }
            }
        }
    }

    render() {
        this.ctx.fillStyle = this.background
        this.ctx.fillRect(0, 0, this.width, this.height)

        for (const actor of this.actors) {
            actor.draw(this.ctx)
        }
    }

    add(actor) {

        if (!actor) {
            throw new Error("Actor is required")
        }

        if (this.actors.includes(actor)) {
            return
        }
        
        actor.game = this
        this.actors.push(actor)
    }

    remove(actor) {
        this.actors = this.actors.filter(item => item !== actor)
    }

    clear() {
        this.actors = []
    }
}


