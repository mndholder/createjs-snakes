import { MainScene } from './src/main-scene';

let scene: MainScene;

function start(canvas: HTMLCanvasElement): MainScene {
    if (!scene) {
        scene = new MainScene(canvas);
    }
    return scene.start();
}

function restart(): MainScene {
    return scene && scene.restart();
}

export { MainScene, start, restart };