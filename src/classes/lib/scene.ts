export class Scene extends createjs.Stage {
    private _started: boolean = false;

    constructor(canvas: HTMLCanvasElement | string | Object) {
        super(canvas);
        this.render = this.render.bind(this);
    }

    get canvasWidth() {
        return (this.canvas as HTMLCanvasElement).width;
    }

    get canvasHeight() {
        return (this.canvas as HTMLCanvasElement).height;
    }

    public start() {
        if (!this._started) {
            this._attachEvents();
            this._started = true;
            this.dispatchEvent(new createjs.Event('start', true, true));
        }
        return this;
    }

    public stop() {
        this._started = false;
        this._detachEvents();
        this.dispatchEvent(new createjs.Event('stop', true, true));
        return this;
    }

    public render() {
        this.update();
    }

    private _attachEvents() {
        createjs.Ticker.addEventListener('tick', this.render);
    }

    private _detachEvents() {
        this.removeAllEventListeners();
        createjs.Ticker.removeEventListener('tick', this.render);
    }
}
