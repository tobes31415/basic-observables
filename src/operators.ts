import { LightweightObservable } from "./observable";
import { Operator, Observable, Observer } from "./types";
import * as gc from "@tobes31415/dispose";

/**
 * A standard base for creating operators so that they all behave consistently
 */
function operatorBase<TIn, TOut, State>(nextFn: (observer: Observer<TOut>, value: TIn, state: State) => void, initialState?: State) {
    let state = initialState;
    return (observable: Observable<TIn>) => {
        const result = new LightweightObservable<TOut>(observer => {
            const inner = observable.subscribe({
                next: (value) => {
                    nextFn(observer, value, state!);
                },
                error: reason => observer.error(reason),
                complete: () => observer.complete(),
            });
            return () => gc.dispose(inner);
        });
        gc.onDisposeChain(observable, result);
        return result;
    }
}

/**
 * Creates a new Observable using a generator function
 */
export function create<T>(fn: (observer: Observer<T>) => void | (() => void) | (() => Promise<void>)): Observable<T> {
    return new LightweightObservable(fn);
}

/**
 * Creates a new Observable using an array
 */
export function from<T>(values: T[]): Observable<T> {
    return new LightweightObservable(subscriber => {
        values.forEach(value => subscriber.next(value));
        subscriber.complete();
    });
}

/**
 * Creates a new Observable using a list of values
 */
export function of<T>(...values: T[]): Observable<T> {
    return from(values);
}

/**
 * Maps the values of an event stream
 */
export function map<TIn, TOut>(mapFn: (value: TIn) => TOut): Operator<TIn, TOut> {
    return operatorBase((observer, value) => observer.next(mapFn(value)));
}

/**
 * Filters an event stream
 */
export function filter<T>(filterFn: (value: T) => boolean): Operator<T, T> {
    return operatorBase((observer, value) => { if (filterFn(value)) { observer.next(value); } });
}

/**
 * Scans an event stream and produces interim values
 */
export function scan<TIn, TOut>(scanFn: (acc: TOut | undefined, value: TIn) => TOut, initialValue?: TOut): Operator<TIn, TOut> {
    return operatorBase((observer, value, state) => {
        state.currentValue = scanFn(state.currentValue, value);
        observer.next(state.currentValue);
    }, { currentValue: initialValue });
}

/**
 * Takes the first 'n' values of an event stream then completes.
 */
export function take<T>(take: number): Operator<T, T> {
    if (take < 1) {
        return () => from<T>([]);
    }
    return operatorBase((observer, value, state) => {
        observer.next(value);
        state.count++;
        if (state.count >= take) {
            observer.complete();
        }
    }, { count: 0 });
}

/**
 * Skips the first 'n' values of an event stream.
 */
export function skip<T>(skip: number): Operator<T, T> {
    return operatorBase((observer, value, state) => {
        if (state.count >= skip) {
            observer.next(value);
        }
        state.count++;
    }, { count: 0 });
}
