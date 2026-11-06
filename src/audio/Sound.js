export class Sound {
    constructor(src) {
        this.audio = new Audio(src)
    }

    play() {
        const copy = this.audio.cloneNode()
        copy.play()
    }
}