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

    it("flips from the actor right edge", () => {
        const sprite = new Sprite({ width: 32, height: 32})
        const calls = []

        const ctx = {
            save() {},
            restore() {},
            translate(x, y) {
                calls.push(["translate", x, y])
            },
            scale(x, y) {
                calls.push(["scale", x, y])
            },
            drawImage() {}
        }
        sprite.draw(ctx, 10, 20, 32, 32, true)

        expect(calls[0]).toEqual(["translate", 42, 20])
        expect(calls[1]).toEqual(["scale", -1, 1])
    })

    it("changes row without restarting the same animation", () => {
        const sprite = new Sprite({ width: 100, height: 80}, 20, 20)

        sprite.setAnimation(1, 5)
        sprite.frame = 2
        sprite.setAnimation(1, 5)

        expect(sprite.frame).toBe(2)

        sprite.setAnimation(0, 5)

        expect(sprite.row).toBe(0)
        expect(sprite.frame).toBe(0)
    })
})