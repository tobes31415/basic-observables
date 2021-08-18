
import { Observable, Observer, Subscription, Operator } from './types';
import { LightweightSubscription } from './subscription';
import * as gc from "@tobes31415/dispose";

interface CallbackMap<T> {
    subscription: Subscription;
    observer: Observer<T>;
}

/**
 * A multi-cast observable that synchrnously sends an update to all connected subscribers 
 */
export class Subject<T> implements Observable<T> {
    private callbacks: CallbackMap<T>[] = [];

    /**
     * Subscribes to the event stream
     */
    subscribe(observer: Observer<T>): Subscription {
        const subscription = new LightweightSubscription();
        const cbMap = { subscription, observer };
        this.callbacks.push(cbMap);

        gc.onDispose(cbMap, () => {
            const index = this.callbacks.indexOf(cbMap);
            this.callbacks.splice(index, 1);
        });
        gc.onDisposeChain(this, cbMap);
        gc.onDisposeChain(observer, cbMap);
        gc.onDisposeChain(cbMap, subscription);
        return subscription;
    }
    /**
     * Emits one value
     */

    next(value: T) {
        this.tryForAll(cb => cb.next(value));
    }
    /**
     * Signals that an error has occured and shuts down the subscription
     */
    error(reason: any) {
        this.tryForAll(cb => cb.error(reason));
        gc.dispose(this);
    }
    /**
     * Signals that no further values are expected and shuts down the subscription
     */
    complete() {
        this.tryForAll(cb => cb.complete());
        gc.dispose(this);
    }

    /**
     * Creates a new observable that applies the listed transformations to the event stream
     */
    pipe<TFinal = T>(...operators: Operator<any, any>[]): Observable<TFinal> {
        return operators.reduce<Observable<any>>((previous, operator) => operator(previous), this);
    }

    private tryForAll(fn: (cb: Observer<T>) => void) {
        this.callbacks.forEach(cb => {
            try {
                fn(cb.observer);
            }
            catch (error) {
                try {
                    cb.observer.error(error);
                }
                catch (ignored) { }
                gc.dispose(cb);
            }
        });
    }
}