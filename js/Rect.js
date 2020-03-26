export function Rect(x, y, w, h) {
    return [
        {
            a: {x: x, y: y},
            b: {x: x + w, y: y}
        },
        {
            a: {x: x + w, y: y},
            b: {x: x + w, y: y + h}
        },
        {
            a: {x: x + w, y: y + h},
            b: {x: x, y: y + h}
        },
        {
            a: {x: x, y: y + h},
            b: {x: x, y: y}
        }
    ]
}

export function drawRect(rect, context, color) {
    let first = true, path = new Path2D();
    for(let wall of rect) {
        if(first) {
            first = false;
            path.moveTo(wall.a.x, wall.a.y);
        }
        path.lineTo(wall.b.x, wall.b.y);
    }
    context.fillStyle = color;
    context.fill(path);
}
