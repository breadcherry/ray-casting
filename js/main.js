import Ray from './Ray.js';
import Vec from './Vector.js';
import {Rect, drawRect} from './Rect.js';
import {findAngle, rand} from './func.js';
import Canvas from './createCanvas.js';


const canvas = new Canvas(400, 400);
const context = canvas.ctx;

const rays = [];
for(let i = 0; i <= 360; i+= 0.1) {
    rays.push(new Ray(200, 200, i));
}

const obstacles = [
    Rect(0, 0, 400, 400) //Canvas border-
];

for(let i = 0; i < 5; i++) {
    obstacles.push(Rect(rand(0, 350), rand(0, 350), 25, 25));
}

function update() {
    context.clearRect(0, 0, 400, 400);
    let x = rand(-0.1, 0.1);
    let y = rand(-0.1, 0.1);

    for(let obs of obstacles) {
        let first = true;
        let path = new Path2D();
        if(obstacles.indexOf(obs) != [0]) {
            drawRect(obs, context, "blue");
        }
    }

    let first = true;
    context.beginPath();
    for(let ray of rays) {
        let record = Infinity;
        let closest = null;
        let further = 0;
        for(let obs of obstacles) {
            let change = true;
            for(let wall of obs) {
                let pt = ray.cast(wall);
                if(pt) {
                    let d = Vec.dist(ray.pos, pt);
                    if(d < record) {
                        record = d;
                        if(change) {
                            change = false;
                            further = 0;
                        }
                    }
                    if(d > further && change == false) {
                        closest = pt;
                        further = d;
                    }
                }
            }
        }
        if(closest) {
            context.lineWidth = 0.1;
            if(first) {
                context.moveTo(closest.x, closest.y);
                first = false;
            }
            context.lineTo(closest.x, closest.y);
        }
    }
    context.rect(400, 400, -400, -400);
    context.closePath();
    context.fillStyle = "black";
    context.fill();
    requestAnimationFrame(update);
}
update();

window.addEventListener('mousemove', event => {
    for(let ray of rays) {
        ray.pos.set(event.offsetX, event.offsetY);
    }
});
