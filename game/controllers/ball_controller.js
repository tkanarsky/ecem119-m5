
class BallController {
    constructor(state) {
        this.state = state;
    }

    update() {
        this.state.ball.x += this.state.ball.dx;
        this.state.ball.y += this.state.ball.dy;
        // If ball hits top or bottom, bounce it.
        if (this.state.ball.y > this.state.canvas.height - this.state.ball.radius
            || this.state.ball.y < this.state.ball.radius) {
            this.state.ball.dy = -this.state.ball.dy;
        }
        // If ball hits left paddle, bounce it; switch control to right paddle
        if (this.state.ball.x <= this.state.leftPaddle.x + this.state.leftPaddle.width
            && this.state.ball.y > this.state.leftPaddle.y
            && this.state.ball.y < this.state.leftPaddle.y + this.state.leftPaddle.height) {
            this.state.ball.dx = -this.state.ball.dx;
            this.state.leftPaddle.controlState = "gyro";
            this.state.active = "right";
        }
        // If ball hits right paddle, bounce it; switch control to left paddle 
        if (this.state.ball.x >= this.state.rightPaddle.x - this.state.ball.radius
            && this.state.ball.y > this.state.rightPaddle.y
            && this.state.ball.y < this.state.rightPaddle.y + this.state.rightPaddle.height) {
            this.state.ball.dx = -this.state.ball.dx;
            this.state.rightPaddle.controlState = "gyro";
            this.state.active = "left";

        }
        // If ball goes off left side, right paddle scores.
        if (this.state.ball.x < this.state.ball.radius) {
            this.state.rightPaddle.score++;
            this.state.reset();
        }

        // If ball goes off right side, left paddle scores.
        if (this.state.ball.x > this.state.canvas.width - this.state.ball.radius) {
            this.state.leftPaddle.score++;
            this.state.reset();
        }
    }
}

export { BallController };