import { describe, it, expect } from "vitest"
import { Game } from "../src/core/Game.js"

describe("Game", () => {
    it("removes an actor after the update without skipping the next one", () => {
        const game = Object.create(Game.prototype)

        const first = {
            _update() {
                game.remove(first)
            }
        }
        const second = {
            _update() {
                second.updated = true
            }
        }

        game.scene = { update() {} }
        game.actors = [first, second]
        game.removed = []

        game.update(0.1)

        expect(second.updated).toBe(true)
        expect(game.actors).toEqual([second])
    })
})