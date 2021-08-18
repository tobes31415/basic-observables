import { Observer, Subscription } from "./types";
import * as gc from "@tobes31415/dispose";

const MSG_IS_CLOSED = "This subscriber is already completed";

export class LightweightSubscriber<T> implements Observer<T> {
    constructor(private observer: Observer<T>, private subscription: Subscription) {
        gc.onDisposeChain(observer, this);
        gc.onDisposeChain(subscription, this);

        gc.onDispose(this, () => subscription.unsubscribe());
    }

    next(value: T) {
        try {
            this.assertOpen();
            this.observer.next(value);
        }
        catch (err) {
            gc.dispose(this);
        }
    }
    error(reason: any) {
        try {
            this.assertOpen();
            this.observer.error(reason);
        }
        finally {
            gc.dispose(this);
        }
    }
    complete() {
        try {
            this.assertOpen();
            this.observer.complete();
        }
        finally {
            gc.dispose(this);
        }
    }

    private assertOpen() {
        gc.assertNotDisposed(this, MSG_IS_CLOSED);
    }
}