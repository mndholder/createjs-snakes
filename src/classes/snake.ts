import * as constants from '../const';

export enum SnakeDirection {
    Left, Right, Up, Down
}

export class Snake extends createjs.Container {
    public direction: SnakeDirection = SnakeDirection.Left;

    private _currentFrames: number[] = [];
    private _counter: number = 0;
    private _steps: number = 0;

    constructor(
        public length: number = 10,
        public size: number = 30,
        public margin: number = 2,
        public padding: number = 2,
        public maxSteps: number = 10
    ) {
        super();
        this._addShape(0, 0);
    }

    public play() {
        if (this._steps <= this.maxSteps) {
            this._move();
        } else {
            this._fade();
        }
    }

    private _move() {
        ++this._counter;

        this.children.forEach((shape: createjs.Shape, index: number) => {
            shape.alpha = this._getNextAlphaFrame(index);
        });

        if (this.children.length >= this.length) {
            this.removeChild(this.getChildAt(0));
            this._currentFrames.splice(0, 1);
        }

        if (this._counter % 3 === 0 && this.children.length < this.length) {
            this._counter = 0;

            this._steps++;
            switch (this.direction) {
                case SnakeDirection.Right:
                    this._addShape(this._steps * this.size);
                    break;
                case SnakeDirection.Left:
                    this._addShape(-(this._steps * this.size));
                    break;
                case SnakeDirection.Down:
                    this._addShape(this.x, this._steps * this.size);
                    break;
                case SnakeDirection.Up:
                    this._addShape(this.x, -(this._steps * this.size));
                    break;
            }

            let event = new createjs.Event('step', true, true);
            event.data = {step: this._steps};
            this.dispatchEvent(event);
        }
    }

    private _fade() {
        let alive = false;
        this.children.forEach(shape => {
            shape.alpha -= constants.SNAKE_FADE_STEP;
            shape.alpha > 0 && (alive = true);
        });
        if (!alive) {
            this.dispatchEvent(new createjs.Event('fade', true, true));
        }
    }

    private _addShape(x: number, y: number = 0) {
        let shape = new createjs.Shape();
        shape.graphics
            .beginFill(constants.SNAKE_COLOR)
            .drawRect(x + this.padding, y + this.padding, this.size - this.padding, this.size - this.padding);
        shape.alpha = 0;
        this.addChild(shape);
    }

    private _getNextAlphaFrame(shapeIndex): number {
        if (this._currentFrames[shapeIndex] === undefined) {
            this._currentFrames[shapeIndex] = 0;
        } else if (this._currentFrames[shapeIndex] < constants.SNAKE_ALPHA_FRAMES.length - 1) {
            this._currentFrames[shapeIndex]++;
        }
        return constants.SNAKE_ALPHA_FRAMES[this._currentFrames[shapeIndex]];
    }
}