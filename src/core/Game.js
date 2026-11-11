
import { Keyboard } from "../input/Keyboard.js"
import { Collision } from "./Collision.js"
import { Scene } from "./Scene.js"
import { Camera } from "./Camera.js"

export class Game {
    constructor({
        width = 800,
        height = 600,
        parent,
        background = "#111111"
    } = {}) {
        if (width <= 0 || height <= 0) {
            throw new Error("Width and height must be greater than 0")
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

        this.scene = null
        this.actors = []
        this.removed = []

        this.keyboard = new Keyboard()

        const target = parent ?? document.body

        if (!target) {
            throw new Error("No parent element to attach the canvas")
        }

        target.appendChild(this.canvas)

        this.isRunning = false
        this.lastTime = undefined
        this.frameId = undefined

        this.camera = new Camera(width, height)
        this.setScene(new Scene())
    }

    start() {
        if (this.isRunning) return

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
        if (!this.isRunning) return

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

        if (!this.isRunning) return

        this.frameId = requestAnimationFrame((nextTime) => this.loop(nextTime))
    }

    update(dt) {
        this.scene.update(dt)

        for (const actor of this.actors) {
            actor._update(dt)
        }

        for (const actor of this.actors) {
            actor.grounded = false
         }

         const overlaps = []

         for (let i = 0; i < this.actors.length; i++) {
            for (let j = i + 1; j < this.actors.length; j++) {
                const actor = this.actors[i]
                const other = this.actors[j]

                if (Collision.check(actor, other)) {
                    overlaps.push([actor, other])
                }
            }
         }

        for (const actor of this.actors) {

            if (actor.solid) continue

            for (const other of this.actors) {
                if (!other.solid || actor === other) continue

                const collision = Collision.check(actor, other)

                if (!collision) continue

                if (other.oneWay && (collision.side !== "bottom" || actor.vy < 0)) {
                    continue
                }

                Collision.resolve(actor, collision)

                if (collision.side === "right" || collision.side === "left") {
                    actor.vx = 0
                } else if (collision.side === "bottom" && actor.vy >=0) {
                    actor.vy = 0
                    actor.grounded = true
                } else if (collision.side === "top" && actor.vy < 0) {
                    actor.vy = 0
                }
            }
        }

        for (const [actor, other] of overlaps) {
            if (actor.onOverlap) actor.onOverlap(other)
            if (other.onOverlap) other.onOverlap(actor)
        }


        if (this.camera) {
            this.camera.update()
        }

        if (this.removed) {
            for (const actor of this.removed) {
                const index = this.actors.indexOf(actor)

                if (index !== -1) {
                    this.actors.splice(index, 1)
                }
            }

            this.removed.length = 0
        }
    }

    draw(ctx) {
        ctx.fillStyle = "white"
        ctx.font = "32px sans-serif"
        ctx.fillText("Press Enter", 280, 300)
    }

    render() {
        this.ctx.fillStyle = this.background
        this.ctx.fillRect(0, 0, this.width, this.height)
        this.scene.draw(this.ctx)

        this.ctx.save()
        this.ctx.translate(-this.camera.x, -this.camera.y)

        for (const actor of this.actors) {
            actor.draw(this.ctx)
        }

        this.ctx.restore()
    }

    add(actor) {
        if (!actor) {
            throw new Error("Actor is required")
        }

        if (this.actors.includes(actor)) return

        actor.game = this
        this.actors.push(actor)
    }

    remove(actor) {

        if (!actor || !this.removed) return
        if(this.removed.includes(actor)) return
        if (!this.actors.includes(actor)) return

        this.removed.push(actor)
        
    }

    clear() {
        this.actors.length = 0
    }

    setScene(scene) {
        if (!scene) {
            throw new Error("Scene is required")
        }

        if (scene === this.scene) return

        if (this.scene) {
            this.scene.end()
        }

        this.scene = scene
        this.scene.game = this
        this.actors = scene.actors

        for (const actor of this.actors) {
            actor.game = this
        }

        try {
            Promise.resolve(scene.start()).catch(error => {
                if (this.scene === scene) {
                    console.error("Scene start failed:", error)
                }
            })
        } catch (error) {
            console.error("Scene start failed:", error)
        }
    }
}
