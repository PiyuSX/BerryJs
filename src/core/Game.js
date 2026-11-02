export class Game {
    constructor({ canvas, width = 800, height = 600 }) {
        if (!canvas) {
            throw new Error("Canvas is required")
        }

        this.canvas = canvas
        this.ctx = canvas.getContext("2d")

        this.width = width
        this.height = height
        
        this.canvas.width = width
        this.canvas.height = height

        this.isRunning = false
    }
}