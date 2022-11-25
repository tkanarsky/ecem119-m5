// Game state -- source of truth for the view and the controller.
// For paddles, this contains:
// - left and right paddle positions
// - left and right paddle velocities
// - paddle width and height
// For score, this contains:
// - left and right scores
// For ball, this contains:
// - ball position
// - ball velocity
// - ball radius
// For UI, this contains:
// - canvas size

class State {
    constructor() {
        this.connected = false;
        this.paused = true;
        this.canvas = {
            width: 640,
            height: 480
        };
        this.leftPaddle = {
            width: 10,
            height: 75,
            x: 10,
            y: 0,
            dy: 0,
            score: 0,
            controlState: "gyro",
        };
        this.rightPaddle = {
            width: 10,
            height: 75,
            x: 0,
            y: 0,
            dy: 0,
            score: 0,
            controlState: "gyro",
        };
        this.ball = {
            x: 0,
            y: 0,
            dx: -1,
            dy: Math.random() * 3,
            radius: 10
        };
        this.active = "left";
        this.leftPaddle.y = this.canvas.height / 2 - this.leftPaddle.height / 2;
        this.rightPaddle.x = this.canvas.width - this.rightPaddle.width - 10;
        this.rightPaddle.y = this.canvas.height / 2 - this.rightPaddle.height / 2;
    }

    reset() {
        this.paused = true;
        this.leftPaddle.y = this.canvas.height / 2 - this.leftPaddle.height / 2;
        this.leftPaddle.controlState = "gyro";
        this.rightPaddle.controlState = "gyro";
        this.rightPaddle.y = this.canvas.height / 2 - this.rightPaddle.height / 2;
        this.ball.x = this.canvas.width / 2;
        this.ball.y = this.canvas.height / 2;
        this.ball.dx = -1;
        this.ball.dy = Math.random() * 2;
        this.active = "left";
    }
}

export { State };