declare var module: {
    id: string;
};

import './vendor';
import './css/main.css';
import * as constants from './const';
import { MainScene } from './main-scene';
import { throttle } from './utils/throttle';

let scene: MainScene = null;

function initCanvas(): HTMLCanvasElement {
    let canvas = document.querySelector('#createjs-canvas') as HTMLCanvasElement;
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;
    return canvas;
}

function initScene() {
    createjs.Ticker.removeAllEventListeners();
    createjs.Ticker.timingMode = constants.CREATEJS_TIMING_MODE;
    createjs.Ticker.framerate = constants.CREATEJS_FRAMERATE;
    scene = new MainScene(initCanvas());
    scene.start();
}

window.addEventListener('resize', throttle(100, () => setTimeout(() => {
    if (scene) {
        initCanvas();
        scene.restart();
    }
}, 100)));

(document.readyState === 'complete')
    ? initScene()
    : document.addEventListener('DOMContentLoaded', initScene);

if (module['hot']) {
    module['hot'].accept();
}