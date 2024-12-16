class VisualClock {
    constructor(width, height) {
        this.canvas = this.createCanvas(width, height);
        this.ctx = this.canvas.getContext("2d");
        this.updateTime();
    }

    createCanvas(width, height) {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);
        return canvas;
    }

    updateTime() {
        const now = new Date();
        this.hours = now.getHours() % 12;
        this.minutes = now.getMinutes();
        this.seconds = now.getSeconds();
    }

    showTime() {
        this.updateTime();
        this.draw();
        requestAnimationFrame(() => this.showTime());
    }

    draw() {
        const { ctx } = this;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.font = "15px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const centerX = ctx.canvas.width / 2;
        const centerY = ctx.canvas.height / 2;

        this.drawNumber(centerX, centerY, this.hours, 12, 10, 70);
        this.drawNumber(centerX, centerY, this.minutes, 60, 10, 100);
        this.drawNumber(centerX, centerY, this.seconds, 60, 10, 140);
    }

    drawNumber(centerX, centerY, number, maxNumber, startRadius, endRadius) {
        const angle = (number / maxNumber) * 2 * Math.PI - Math.PI / 2;
        for (let radius = startRadius; radius <= endRadius; radius += 20) {
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            this.ctx.fillText(number, x, y);
        }
    }
}
