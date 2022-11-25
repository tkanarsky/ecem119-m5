import { MainController } from "./controllers/main_controller.js";
import { MainView } from "./views/main_view.js";
import { State } from "./state.js";

const state = new State();
const controller = new MainController(state);
const view = new MainView(state);

function redraw() {
    view.redraw();
    window.requestAnimationFrame(redraw);
}

function update() {
    controller.update();
}

setInterval(update, 10);
redraw();
