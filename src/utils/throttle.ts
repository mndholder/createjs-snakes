export function throttle(timeout: number, fn: Function, ctx: any = null, args: any[] = undefined): () => any {
    let _timer: number;
    return function() {
        if (!_timer) {
            _timer = setTimeout(() => _timer = undefined, timeout);
            fn.apply(ctx || this, args);
        }
    }
}