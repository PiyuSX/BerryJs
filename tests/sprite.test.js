import { describe, it, expect } from "vitest"
import { Sprite } from "../src/graphics/Sprite.js"

describe("Sprite", () => {
    it("advances through frames", () => {
        const sprite = new Sprite({ width: 96, height: 32 }, 32, 32 )

        expect(sprite.frameCount).toBe(3)
         
        sprite.update(0.1)
        expect(sprite.frame).toBe(1)

        sprite.update(0.1)
        expect(sprite.frame).toBe(2)

        sprite.update(0.1)
        expect(sprite.frame).toBe(0)
    })

    it("does not animate a single image", () => {
        const sprite = new Sprite({ width: 32, height: 32 })

        sprite.update(1)

        expect(sprite.frameCount).toBe(1)
        expect(sprite.frame).toBe(0)
    })
})