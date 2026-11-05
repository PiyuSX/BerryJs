export class Sprite {
    constructor(image, frameWidth = image.width, frameHeight = image.height) {

        this.image = image
        this.frameWidth = frameWidth
        this.frameHeight = frameHeight
        this.frame = 0
        this.frameCount = Math.max(1, Math.floor(image.width / frameWidth))
        this.frameTime = 0.1
        this.elapsed = 0
    }

    update(dt) {
        if (this.frameCount <= 1) return

        this.elapsed += dt

        if (this.elapsed >= this.frameTime) {
            this.elapsed = 0
            this.frame = (this.frame + 1) % this.frameCount
        }
    }

    draw(ctx, x,y , width, height, flipX = false) {
        const sx = this.frame * this.frameWidth

        if (!flipX) {
            ctx.drawImage(
                this.image,
                sx, 0, this.frameWidth, this.frameHeight,
                x, y, width, height
            )
            return
        }
        ctx.save()
        ctx.translate(x + width, y)
        ctx.scale(-1, 1)
        ctx.drawImage(
            this.image,
            sx,
            0,
            this.frameWidth,
            this.frameHeight,
            0,
            0,
            width,
            height
        )
        ctx.restore()
    }
}



