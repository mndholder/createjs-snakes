import { delay } from '../../utils/random';

export class Container extends createjs.Container {
    private _timers: number[] = [];

    randomDelay(fn: Function, from: number, to: number) {
        let timer: number;
        const cb: Function = function callback() {
            fn.call(this);
            const index = this._timers.indexOf(timer);
            if (index !== -1) {
                this._timers.splice(index, 1);
            }
            clearTimeout(timer);
        };
        timer = delay(cb,  from, to, this);
    }

    destroy() {
        this._timers.forEach((timer: number) => clearTimeout(timer));
        // .removeAllChildren method is slower than just reinitializing the array
        this.children = [];
    }
}