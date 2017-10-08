import { MainScene } from './src/main-scene';

function start(canvas: HTMLCanvasElement) {
    return new MainScene(canvas).start();
}

export { MainScene, start };