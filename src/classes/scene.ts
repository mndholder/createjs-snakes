export class Scene extends createjs.Stage {
    private _started: boolean = false;

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
    }

    public stop() {
        this._started = false;
        this._detachEvents();
        this.dispatchEvent(new createjs.Event('stop', true, true));
    }

    public render() {
        this.update();
    }

    private _attachEvents() {
        this.render = this.render.bind(this);
        createjs.Ticker.addEventListener('tick', this.render);
    }

    private _detachEvents() {
        this.removeAllEventListeners();
        createjs.Ticker.removeEventListener('tick', this.render);
    }
}
