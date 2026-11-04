import { Game } from "../src/core/Game.js"
import { describe, it, expect } from "vitest"
import { Actor } from "../src/core/Actor.js"

describe("Game Physics Integration", () => {
    it("applies physics even with a custom update method", () => {
        const game = Object.create(Game.prototype)

        game.scene = {
            update() {}
        }
        class Player extends Actor {
            update(dt) {
                this.x += 10 * dt
            }
        }

        const player = new Player(0, 0)
        player.gravity = 100

        game.actors = [player]
        game.update(1)

        expect(player.x).toBe(10)
        expect(player.vy).toBe(100)
        expect(player.y).toBe(100)
    })

    it("lands on a solid platform", () => {
        const game = Object.create(Game.prototype)

        game.scene = {
            update() {}
        }


        const player = new Actor(0, 40, 20, 20)
        player.gravity = 100

        const platform = new Actor(0, 60, 100, 20)
        platform.solid = true

        game.actors = [player, platform]
        game.update(0.1)

        expect(player.y).toBe(40)
        expect(player.vy).toBe(0)
    })

    it("stop when hitting a solid wall", () => {
        const game = Object.create(Game.prototype)

        game.scene = {
            update() {}
        }

        const player = new Actor(0, 0, 20, 20)
        player.vx = 100

        const wall = new Actor(25, 0, 20, 100)
        wall.solid = true

        game.actors = [player, wall]
        game.update(0.1)

        expect(player.x).toBe(5)
        expect(player.vx).toBe(0)
    })

})

