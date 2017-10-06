export function range(min: number = 0, max: number = 1): number {
    return Math.random() * (max - min) + min;
}

export function rangeInt(min: number = 0, max: number = 1): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomlyDelay(fn: Function, from: number = 0, to: number = 1000, ctx: Object = null, args: any[] = null): Promise<any> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(fn.apply(ctx || this, args));
        }, rangeInt(from, to));
    });
}

export function chance(p: number = 0.1): boolean {
    return Math.random() <= p;
}
