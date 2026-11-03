import { describe, it, expect } from "vitest"
import { Actor } from "../src/core/Actor.js"

describe("Actor", () => {
    it("moves uing horizontal velocity", () => {
        const actor = new Actor(0, 0)

        actor.vx = 100
        actor._physics(1)

        expect(actor.x).toBe(100)
    })

    it("moves using vertical velocity", () => {
        const actor = new Actor(0, 0)

        actor.vy = 100
        actor._physics(1)

        expect(actor.y).toBe(100)
    })

    it("moves gravity over time", () => {
        const actor = new Actor(0, 0)

        actor.gravity = 100
        actor._physics(1)

        expect(actor.vy).toBe(100)
        expect(actor.y).toBe(100)
    })
})