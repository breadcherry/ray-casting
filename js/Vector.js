class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    normalize() {
        let max = Math.max(Math.abs(this.x), Math.abs(this.y));
        let d = (1 / max);
        this.x *= d;
        this.y *= d;
    }
}

class Vector {
    create(x, y) {
        return new Vec2(x, y);
    }

    fromAngle(angle) {
        const d = -1 * angle * Math.PI / 180;
        return new Vec2(
                Math.cos(d),
                Math.sin(d)
        );
    }

    dist(first, second) {
        return Math.sqrt(
            Math.pow(first.x - second.x, 2) +
            Math.pow(first.y - second.y, 2)
        );
    }
}
const Vec = new Vector();
export default Vec;
