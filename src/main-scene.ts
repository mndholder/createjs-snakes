import { Scene } from './classes/scene';
import { SnakeRowContainer } from './classes/snake-row-container';
import * as constants from './const';

export class MainScene extends Scene {
    public backgroundShape: createjs.Shape;
    public containers: SnakeRowContainer[] = [];

    constructor(
        canvas: HTMLCanvasElement
    ) {
        super(canvas);
        this._initSceneObjects();
    }

    render() {
        this.containers.forEach((container: SnakeRowContainer) => container.play());
        super.render();
    }

    public setBgColors(top: string, bottom: string) {
        this._initBackground(top, bottom);
    }

    private _initSceneObjects() {
        this._initBackground(constants.GRADIENT_TOP_COLOR, constants.GRADIENT_BOTTOM_COLOR);
        this._initSnakeContainers();
    }

    private _initBackground(topColor: string, bottomColor: string) {
        this.removeChild(this.backgroundShape);
        this.backgroundShape = new createjs.Shape();
        this.backgroundShape.graphics
            .beginLinearGradientFill([topColor, bottomColor], [0, 1], 0, 20, 0, this.canvasHeight - 20)
            .drawRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.backgroundShape.cache(0, 0, this.canvasWidth, this.canvasHeight);
        this.addChildAt(this.backgroundShape, 0);
        return this.backgroundShape;
    }

    private _initSnakeContainers() {
        const size = this.canvasHeight / constants.LINES_COUNT;
        for (let i = 0; i < constants.LINES_COUNT; i++) {
            let container = new SnakeRowContainer(constants.SNAKES_PER_LINE_COUNT, size, constants.SNAKE_LENGTH, this.canvasWidth);
            this.containers.push(container);
            container.y = i * size;
            this.addChild(container);
        }
    }
}