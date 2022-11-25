class PaddleController {
    
    constructor(state, bluetooth) {
        this.state = state;
        this.bluetooth = bluetooth;
    }

    update() {
        if (this.state.active === "left") {
            this.state.rightPaddle.dy = 0;
            if (this.state.leftPaddle.y + this.state.leftPaddle.dy < 0) {
                this.state.leftPaddle.dy = 0;
                this.state.leftPaddle.y = 0;
            }
            else if (this.state.leftPaddle.y + this.state.leftPaddle.dy > this.state.canvas.height - this.state.leftPaddle.height) {
                this.state.leftPaddle.dy = 0;
                this.state.leftPaddle.y = this.state.canvas.height - this.state.leftPaddle.height;
            }
            else {
                if (this.state.leftPaddle.controlState === "gyro") {
                    this.state.leftPaddle.dy = this.bluetooth.rx / 20;
                } else if (this.state.leftPaddle.controlState === "up") {
                    this.state.leftPaddle.dy = -3;
                } else if (this.state.leftPaddle.controlState === "down") {
                    this.state.leftPaddle.dy = 3;
                }
                this.state.leftPaddle.y += this.state.leftPaddle.dy;
            }
        } else {
            this.state.leftPaddle.dy = 0;
            if (this.state.rightPaddle.y + this.state.rightPaddle.dy < 0) {
                this.state.rightPaddle.dy = 0;
                this.state.rightPaddle.y = 0;
            }
            else if (this.state.rightPaddle.y + this.state.rightPaddle.dy > this.state.canvas.height - this.state.rightPaddle.height) {
                this.state.rightPaddle.dy = 0;
                this.state.rightPaddle.y = this.state.canvas.height - this.state.rightPaddle.height;
            }
            else {
                if (this.state.rightPaddle.controlState === "gyro") {
                    this.state.rightPaddle.dy = this.bluetooth.rx / 20;
                } else if (this.state.rightPaddle.controlState === "up") {
                    this.state.rightPaddle.dy = -3;
                } else if (this.state.rightPaddle.controlState === "down") {
                    this.state.rightPaddle.dy = 3;
                }
                this.state.rightPaddle.y += this.state.rightPaddle.dy;
            }
        }
    }
}

export { PaddleController };