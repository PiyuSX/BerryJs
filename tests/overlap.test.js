import { describe, it, expect } from 'vitest'
import { Game } from '../src/core/Game.js'
import { Actor } from '../src/core/Actor.js'


describe("Overlap", () => {
    it("reports a touch without moving eihter actor", () => {
        const game = Object.create(Game.prototype)
        const player = new Actor(0, 0, 20, 20)
        const coin = new Actor(10, 10, 20, 20)
        const hits = []

        player.onOverlap = (other) => hits.push(other)
        game.scene = { update() {} }
        game.actors = [player, coin]
        game.removed = []

        game.update(0.1)

        expect(hits).toEqual([coin])
        expect(player.x).toBe(0)
        expect(coin.x).toBe(10)

    })

    it("does not report a miss", () => {
        const game = Object.create(Game.prototype)
        const player = new Actor(0, 0, 20, 20)
        const coin = new Actor(100, 100, 20, 20)
        let called = false


        player.onOverlap = () => {
            called = true
        }

        game.scene = { update() {} }
        game.actors = [player, coin]
        game.removed = []

        game.update(0.1)

        expect(called).toBe(false)
    })

})
