import Vec from './Vector.js';

export default class Ray {
    constructor(x, y, angle) {
        this.pos = Vec.create(x, y);
        this.dir = Vec.fromAngle(angle);
        this.pos.set = function(x, y) {
            this.x = x;
            this.y = y;
        }
    }

    cast(obstacle) {
        const x1 = obstacle.a.x;
        const y1 = obstacle.a.y;
        const x2 = obstacle.b.x;
        const y2 = obstacle.b.y;

        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.dir.x;
        const y4 = this.pos.y + this.dir.y;

        //Divider
        const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if(d == 0) return;
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / d;

        if(t >= 0 && t <= 1 && u >= 0) {
            const pt = Vec.create(
                    x1 + t * (x2 - x1),
                    y1 + t * (y2 - y1)
                    //Different way to get intersection point
                    //P(x, y) = ( x3 + u * (x4 - x3), y3 + u * (y4 - y3) )
            );
            return pt;
        } else {
            return;
        }
    }
}
