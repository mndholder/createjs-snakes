import { Container } from './lib/container';
import { Snake, SnakeDirection } from './snake';
import { rangeInt, chance } from '../utils/random';

export class SnakeRowContainer extends Container {

    constructor(
        public snakeCount: number = 3,
        public snakeSize: number = 30,
        public snakeLength: number = 10,
        public maxWidth: number = 300
    ) {
        super();
        this.randomDelay(this._initSnakes, 0, 1000);
    }

    public play() {
        this.children.forEach((snake: Snake) => snake.play());
    }

    private _initSnakes() {
        for (let i=0; i < this.snakeCount; i++) {
            this.randomDelay(this.addChild.bind(this, this._createSnake()), 0, 3000);
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
        snake.direction = chance(0.5) ? SnakeDirection.Right : SnakeDirection.Left;

        return snake;
    }
}