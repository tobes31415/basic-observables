import { Observable, Observer, Operator, Subscription } from "./types";
import { LightweightSubscription } from './subscription';
import * as gc from "@tobes31415/dispose";
import { LightweightSubscriber } from './subscriber';

export class LightweightObservable<T> implements Observable<T> {
    constructor(private initFunc: (subscriber: Observer<T>) => (void | (() => void) | (() => Promise<void>))) { }

    subscribe(observer: Observer<T>): Subscription {
        const subscription = new LightweightSubscription();
        try {
            gc.onDisposeChain(this, subscription);

            const subscriber = new LightweightSubscriber<T>(observer, subscription);
            gc.onDisposeChain(this, subscriber);

            const onFinish = this.initFunc(subscriber);
            if (typeof onFinish === "function") {
                gc.onDispose(subscription, onFinish);
            }
        }
        catch (err) {
            gc.dispose(subscription);
        }
        return subscription;
    }

    pipe<TFinal = T>(...operators: Operator<any, any>[]): Observable<TFinal> {
        return operators.reduce<Observable<any>>((previous, operator) => operator(previous), this);
    }
}

