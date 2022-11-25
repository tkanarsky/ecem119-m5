import { BallView } from './ball_view.js';
import { PaddleView } from './paddle_view.js';
import { UIView } from './ui_view.js';

class MainView {
    constructor(state) {
        this.state = state;
        const canvas = document.getElementById("pong-canvas");
        canvas.height = this.state.canvas.height;
        canvas.width = this.state.canvas.width;
        this.ctx = canvas.getContext("2d");
        this.ball_view = new BallView(this.state, this.ctx);
        this.paddle_view = new PaddleView(this.state, this.ctx);
        this.ui_view = new UIView(this.state, this.ctx);
    }

    redraw() {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(0, 0, this.state.canvas.width, this.state.canvas.height);
        this.ball_view.redraw();
        this.paddle_view.redraw();
        this.ui_view.redraw();
    }
}

export { MainView };