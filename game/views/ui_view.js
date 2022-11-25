// Draw left and right scores in left and right corners of the screen
// Draw "Ready" in the middle of the screen if the game is paused
// Draw "Connect to start" in the middle of the screen if the remote is not connected
// Draw dividing line down the middle of the screen.

class UIView {
    constructor(state, context) {
        this.state = state;
        this.context = context;
    }

    redraw() {
        if (!this.state.connected) {
            this.context.font = "16px Arial";
            this.context.fillStyle = "#FFFFFF";
            this.context.fillText("Connect to start", this.state.canvas.width / 2 - 50, this.state.canvas.height / 2);
        }

        else if (this.state.paused) {
            this.context.font = "16px Arial";
            this.context.fillStyle = "#FFFFFF";
            this.context.fillText("Ready", this.state.canvas.width / 2 - 50, this.state.canvas.height / 2);
        } else {
            // Draw divider line
            this.context.beginPath();
            this.context.rect(this.state.canvas.width / 2, 0, 2, this.state.canvas.height);
            this.context.fillStyle = "#FFFFFF";
            this.context.fill();
            this.context.closePath();

            // Draw left and right scores
            this.context.font = "32px Arial";
            this.context.fillStyle = "#FFFFFF";
            this.context.fillText(this.state.leftPaddle.score, 10, 30);
            this.context.fillText(this.state.rightPaddle.score, this.state.canvas.width - 30, 30);

            // Draw arrow pointing toward active paddle
            if (this.state.active == "left") {
                this.context.moveTo(this.state.canvas.width / 2 - 40, this.state.canvas.height / 2);
                this.context.lineTo(this.state.canvas.width / 2 - 20, this.state.canvas.height / 2 - 10);
                this.context.lineTo(this.state.canvas.width / 2 - 20, this.state.canvas.height / 2 + 10);
            } else {
                this.context.moveTo(this.state.canvas.width / 2 + 40, this.state.canvas.height / 2);
                this.context.lineTo(this.state.canvas.width / 2 + 20, this.state.canvas.height / 2 - 10);
                this.context.lineTo(this.state.canvas.width / 2 + 20, this.state.canvas.height / 2 + 10);

            }
            this.context.fill();
            this.context.closePath();
        }
    }
}

export { UIView };