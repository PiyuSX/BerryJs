import { describe, it, expect } from "vitest"
import { Scene } from "../src/core/Scene.js"
import { Actor } from "../src/core/Actor.js"
import { Game } from "../src/core/Game.js"

describe("Scene", () => {
    it("adds actors to the scene", () => {
        const scene = new Scene()
        const actor = new Actor()

        scene.add(actor)

        expect(scene.actors).toContain(actor)
        expect(actor.game).toBe(null)
    })

    it("removes actors from the scene", () => {
        const scene = new Scene()
        const actor = new Actor()

        scene.add(actor)
        scene.remove(actor)

        expect(scene.actors).not.toContain(actor)
    })

    it("does not add the same actor twice", () => {
        const scene = new Scene()
        const actor = new Actor()

        scene.add(actor)
        scene.add(actor)

        expect(scene.actors.length).toBe(1)
    })

    it("switches the active scene", () => {
        const game = Object.create(Game.prototype)

        const firstScene = new Scene()
        const secondScene = new Scene()

        const player = new Actor()
        secondScene.add(player)

        game.setScene(firstScene)
        game.setScene(secondScene)

        expect(game.scene).toBe(secondScene)
        expect(game.actors).toBe(secondScene.actors)
        expect(player.game).toBe(game)
    })
})