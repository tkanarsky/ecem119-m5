class PaddleView {
    constructor(state, context) {
        this.state = state;
        this.context = context;
    }

    redraw() {
        if (this.state.connected && !this.state.paused) {
            // Draw left and right paddles
            this.context.beginPath();
            this.context.fillStyle = "#00FFFF";
            this.context.rect(this.state.leftPaddle.x, this.state.leftPaddle.y, this.state.leftPaddle.width, this.state.leftPaddle.height);
            this.context.fill();
            this.context.closePath();

            this.context.beginPath();
            this.context.fillStyle = "#00FFFF";
            this.context.rect(this.state.rightPaddle.x, this.state.rightPaddle.y, this.state.rightPaddle.width, this.state.rightPaddle.height);
            this.context.fill();
            this.context.closePath();
        }

    }
}

export { PaddleView };