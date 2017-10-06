import './vendor';
import './css/main.css';
import * as constants from './const';
import { MainScene } from './main-scene';

let scene: MainScene = null,
    canvas: HTMLCanvasElement = null;

function init() {
    createjs.Ticker.removeAllEventListeners();
    createjs.Ticker.timingMode = constants.CREATEJS_TIMING_MODE;
    createjs.Ticker.framerate = constants.CREATEJS_FRAMERATE;

    canvas = document.querySelector('#createjs-canvas') as HTMLCanvasElement;
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    if (scene) {
        scene.stop();
        scene = undefined;
    }

    scene = new MainScene(document.querySelector('#createjs-canvas') as HTMLCanvasElement);
    scene.start();
}

// window.addEventListener('resize', init);

(document.readyState === 'complete')
    ? init()
    : document.addEventListener('DOMContentLoaded', init);

if (module['hot']) {
    module['hot'].accept();
}