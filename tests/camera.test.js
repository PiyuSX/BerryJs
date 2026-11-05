import { describe, it, expect } from "vitest"
import { Camera } from "../src/core/Camera.js"

describe("Camera", () => {
    it("centers the target", () => {
        const camera = new Camera(800, 600)
        const actor = { x: 100, y: 50, width: 40, height: 40}

        camera.follow(actor)
        camera.update()

    })

    it("resets when nothing is followed", () => {
        const camera = new Camera(800, 600)

        camera.x = 50
        camera.y = 50
        camera.follow(null)
        camera.update()

        expect(camera.x).toBe(0)
        expect(camera.y).toBe(0)
    })
})