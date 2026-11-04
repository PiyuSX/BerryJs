import { describe, it, expect, vi } from "vitest"
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

    it("calls start when a scene becomes active", () => {
        const game = Object.create(Game.prototype)
        const scene = new Scene()

        let started = false
        scene.start = () => {
            started = true
        }

        game.scene = new Scene()
        game.setScene(scene)

        expect(started).toBe(true)
    })

    it("calls end when switching scenes", () => {
        const game = Object.create(Game.prototype)
        const firstScene = new Scene()
        const secondScene = new Scene()

        let ended = false
        firstScene.end = () => {
            ended = true
        }

        game.scene = firstScene
        game.actors = firstScene.actors

        game.setScene(secondScene)

        expect(ended).toBe(true)
    })

    it("updates the active scene", () => {
        const game = Object.create(Game.prototype)
        const scene = new Scene()

        let updated = false
        scene.update = (dt) => {
            updated = true
        }

        game.scene = scene
        game.actors = []

        game.update(0.016)

        expect(updated).toBe(true)
    })

    it("starts the default scene when the game is created", () => {
        const context = {}

        vi.spyOn(
            HTMLCanvasElement.prototype,
            "getContext"
        ).mockReturnValue(context)

        const startSpy = vi.spyOn(Scene.prototype, "start")

        const game = new Game()

        expect(game.scene).toBeDefined()
        expect(game.scene.game).toBe(game)
        expect(startSpy).toHaveBeenCalledOnce()

        vi.restoreAllMocks()
    })

    it("ends the old scene before starting the new scene", () => {
        const game = Object.create(Game.prototype)
        const calls = []

        const firstScene = new Scene()
        const secondScene = new Scene()

        firstScene.end = () => calls.push("end")
        secondScene.start = () => calls.push("start")

        game.scene = firstScene
        game.actors = firstScene.actors

        game.scene = firstScene
        game.actors = firstScene.actors

        game.setScene(secondScene)

        expect(calls).toEqual(["end", "start"])
    })
})

