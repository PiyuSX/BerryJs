export class Sprite {
    constructor(image, frameWidth = image.width, frameHeight = image.height) {

        this.image = image
        this.frameWidth = frameWidth
        this.frameHeight = frameHeight
        this.frame = 0
        this.row = 0
        this.offsetY = 0
        this.start = 0
        this.frameCount = Math.max(1, Math.floor(image.width / frameWidth))
        this.frameTime = 0.1
        this.elapsed = 0
        this.bleed = 0
        
    }

    setAnimation(row, frameCount, start = 0) {
        if (this.row === row && this.frameCount === frameCount && this.start == start) {
            return
        }
``
        this.row = row
        this.frameCount = frameCount
        this.start = start
        this.frame = 0
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
        const bleed = this.bleed

        const ratio = this.frameHeight / this.frameWidth
        const drawW = width
        const drawH = width * ratio
        const drawY = y + height - drawH + this.offsetY
        const sx = (this.start + this.frame) * this.frameWidth 
        const sy = this.row * this.frameHeight - bleed
        const srcH = this.frameHeight + bleed
        const extraH = bleed * (drawW / this.frameWidth)
        const top = drawY - extraH

        if (!flipX) {
            ctx.drawImage(
                this.image,
                sx, sy, this.frameWidth, srcH,
                x, top, drawW, drawH + extraH
            )
            return
        }
        ctx.save()
        ctx.translate(x + drawW, top)
        ctx.scale(-1, 1)
        ctx.drawImage(
            this.image,
            sx,
            sy,
            this.frameWidth,
            srcH,
            0,
            0,
            drawW,
            drawH + extraH
        )
        ctx.restore()
    }
}


