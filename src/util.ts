import { Observer } from './types';

export function makeFull<T>(obs: Partial<Observer<T>>): Observer<T> {
    const noop: any = () => { };
    return Object.assign({ next: noop, error: noop, complete: noop }, obs) as any;
}