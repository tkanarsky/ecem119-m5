import { PaddleController } from "./paddle_controller.js";
import { BallController } from "./ball_controller.js";
import { Bluetooth } from "./bluetooth.js";

class MainController {
    constructor(state) {
        this.state = state;
        this.bluetooth = new Bluetooth("connect-button", state);
        this.paddleController = new PaddleController(state, this.bluetooth);
        this.ballController = new BallController(state);
    }

    update() {
        if (this.state.connected) {
            if (this.state.paused) {
                if (Math.sqrt(Math.pow(this.bluetooth.ax, 2) + Math.pow(this.bluetooth.ay, 2) + Math.pow(this.bluetooth.az, 2)) > 2) {
                    this.state.paused = false;
                }
            } else {
                this.ballController.update();
                this.paddleController.update();
            }
        }
    }
}
export { MainController };