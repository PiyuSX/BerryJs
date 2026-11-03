export class Collision {
    static check(a, b) {

        if (
            a.x >= b.x + b.width ||
            a.x + a.width <= b.x ||
            a.y >= b.y + b.height ||
            a.y + a.height <= b.y
        ) { 
            return null
        }

        const overlapX = Math.min(
            a.x + a.width - b.x,
            b.x + b.width - a.x
        )

        const overlapY = Math.min(
            a.y + a.height - b.y,
            b.y + b.height - a.y
        )

        let side

        if (overlapX < overlapY) {
            side = a.x < b.x ? "right" : "left"
        } else {
            side = a.y < b.y ? "bottom" : "top"
        }

        return {
            side,
            overlapX,
            overlapY,
            normalX: side === "right" ? -1 : side === "left" ? 1 : 0,
            normalY: side === "bottom" ? -1 : side === "top" ? 1 : 0
            
        }
        
        
    }
    static resolve(actor, collision) {
        if (!collision) return

        actor.x += collision.normalX * collision.overlapX
        actor.y += collision.normalY * collision.overlapY

    }

}
