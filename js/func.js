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

export {findAngle, rand}
