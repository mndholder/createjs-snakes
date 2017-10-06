import { Snake } from './snake';
import { randomlyDelay, rangeInt } from '../utils/random';

export class SnakeRowContainer extends createjs.Container {

    constructor(
        public snakeCount: number = 3,
        public snakeSize: number = 30,
        public snakeLength: number = 10,
        public maxWidth: number = 300
    ) {
        super();
        randomlyDelay(this._initSnakes.bind(this), 0, 1000);
    }

    public play() {
        this.children.forEach((snake: Snake) => snake.play());
    }

    private _initSnakes() {
        for (let i=0; i < this.snakeCount; i++) {
            randomlyDelay(this._createSnake.bind(this), 0, 3000).then(this.addChild.bind(this));
        }

        this.on('fade', ({target}: createjs.Event) => {
            this.removeChild(target);
            this.addChild(this._createSnake());
        });
    }

    private _createSnake(): Snake {
        const x = rangeInt(0, this.maxWidth / this.snakeSize) * this.snakeSize;

        let snake = new Snake(this.snakeLength, this.snakeSize);
        snake.y = 0;
        snake.x = x;

        return snake;
    }
}