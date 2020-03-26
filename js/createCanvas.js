export default class Canvas {
    constructor(width, height) {
        this.el = document.createElement("canvas");
        this.el.width = width;
        this.el.height = height;
        this.ctx = this.el.getContext('2d');
        document.body.appendChild(this.el);
    }
}
