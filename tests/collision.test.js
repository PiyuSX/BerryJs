import { describe, it, expect } from "vitest"
import { Collision } from "../src/core/Collision.js"


describe("Collision", () => {
    it("detects overlapping actors", () => {
        const a = { x: 0, y: 0, width: 50, height: 50 }
        const b = { x: 25, y: 25, width: 50, height: 50}

        const result = Collision.check(a, b)


    
        expect(result).not.toBeNull()
        expect(result.overlapX).toBe(25)
        expect(result.overlapY).toBe(25)
    })

    it("detects actors that do not overlap", () => {
        const a = { x: 0, y: 0, width: 50, height: 50 }
        const b = { x: 100, y: 100, width: 50, height: 50 }

        expect(Collision.check(a, b)).toBeNull()

    })

    it("detects the collision side", () => {
        const a = { x: 0, y: 0, width: 50, height: 50 }
        const b = { x: 40, y: 0, width: 50, height: 50 }

        expect(Collision.check(a, b).side).toBe("right")
    })

    it("does not detect collision when actors only touch edges", () => {
        const a = { x: 0, y: 0, width: 50, height: 50 }
        const b = { x:50, y:0, width: 50, height: 50}
        
        expect(Collision.check(a, b)).toBeNull()
    })

    it("detects collision from all four sides", () => {
        const a = { x:0, y:0, width: 50, height: 50}

        expect(Collision.check(a, { x: 40, y: 0, width: 50, height: 50}).side).toBe("right")
        expect(Collision.check)
    })

    it("returns the correct collision normal", () => {
        const a = { x: 0, y: 0, width: 50, height: 50 }
        const b = { x: 40, y: 0, width: 50, height: 50 }

        const result = Collision.check(a, b)

        expect(result.normalX).toBe(-1)
        expect(result.normalY).toBe(0)
    })

    it("seperates overlapping actors", () => {
        const a = { x: 0, y: 0, width: 50, height: 50 }
        const b = { x: 40, y: 0, width: 50, height: 50 }

        const collision = Collision.check(a, b)

        Collision.resolve(a, collision)

        expect(a.x).toBe(-10)
    })

})


