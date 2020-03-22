import Ray from './Ray.js';
import Vec from './Vector.js';
import Rect from './Rect.js';

function findAngle(x1, y1, x2, y2) {
    const ex = x2 - x1;
    const ey = y1 - y2;
    const d = Math.atan2(ey, ex);
    const angle = d * 180 / Math.PI;
    return Math.abs(angle < 0 ? angle + 360 : angle);
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 400;
const context = canvas.getContext('2d');
context.fillStyle = "black"
context.fillRect(0, 0, 400, 400)
document.body.appendChild(canvas);

const rays = [];
for(let i = 0.25; i <= 360; i+= 0.5) {
    rays.push(new Ray(200, 200, i));
}

let obstacles = [
    Rect(0, 0, 400, 400)
]

for(let i = 0; i < 5; i++) {
    obstacles.push(Rect(rand(0, 350), rand(0, 350), 25, 25));
}

function update() {
    context.clearRect(0, 0, 400, 400);
    context.fillStyle = "black"
    context.fillRect(0, 0, 400, 400)
    context.strokeStyle = "white";
    for(let obs of obstacles) {
        for (let wall of obs) {
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(wall.a.x, wall.a.y);
            context.lineTo(wall.b.x, wall.b.y);
            context.stroke();
        }
    }

    for(let ray of rays) {

        let record = Infinity;
        let closest = null;

        for(let obs of obstacles) {
            for(let wall of obs) {
                let pt = ray.cast(wall);
                if(pt) {
                    let d = Vec.dist(ray.pos, pt);
                    if(d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
        }
        if(closest) {
            context.beginPath();
            context.lineWidth = 0.1;
            context.moveTo(ray.pos.x, ray.pos.y);
            context.lineTo(closest.x, closest.y);
            context.stroke();
        }
    }
    requestAnimationFrame(update);
}
update();

window.addEventListener('mousemove', event => {
    for(let ray of rays) {
        ray.pos.set(event.offsetX, event.offsetY);
    }
});
