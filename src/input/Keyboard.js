export class Keyboard {
    constructor() {
        this.keys = new Set()

        window.addEventListener("keydown", (event) => {
            this.keys.add(event.code)
        })

        window.addEventListener("keyup", (event) => {
            this.keys.delete(event.code)
        })
    }

    isDown(key) {
        return this.keys.has(key)
    }
}