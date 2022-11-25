class BallView {
    constructor(state, context) {
        this.state = state;
        this.context = context;
    }
    
    redraw() {
        if (this.state.connected && !this.state.paused) {
            this.context.beginPath();
            this.context.arc(this.state.ball.x, this.state.ball.y, this.state.ball.radius, 0, Math.PI*2);
            this.context.fillStyle = "#FF0000";
            this.context.fill();
            this.context.closePath();
        }
    }
}

export { BallView };