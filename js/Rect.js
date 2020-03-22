export default function Rect(x, y, w, h) {
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
