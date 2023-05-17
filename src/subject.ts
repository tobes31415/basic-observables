import {
  Observable,
  Observer,
  Subscription,
  Operator,
  EventHandler,
} from "./types";
import { LightweightSubscription } from "./subscription";
import * as gc from "@tobes31415/dispose";
import { makeFull } from "./util";

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
  subscribe(
    next: EventHandler<T>,
    error?: EventHandler<any>,
    complete?: EventHandler<void>,
  ): Subscription;
  /**
   * Subscribes to the event stream
   */
  subscribe(observer: Partial<Observer<T>>): Subscription;
  subscribe(...args: any[]): Subscription {
    if (typeof args[0] === "function") {
      return this.subscribeToObserver({
        next: args[0],
        error: args[1],
        complete: args[2],
      });
    } else {
      return this.subscribeToObserver(args[0]);
    }
  }

  /**
   * Subscribes to the event stream
   */
  private subscribeToObserver(observer: Partial<Observer<T>>): Subscription {
    const subscription = new LightweightSubscription();
    const cbMap = { subscription, observer: makeFull(observer) };
    this.callbacks.push(cbMap);

    gc.onDispose(cbMap, () => {
      const index = this.callbacks.indexOf(cbMap);
      this.callbacks.splice(index, 1);
    });
    gc.onDisposeChain(this, cbMap);
    gc.onDisposeChain(observer, cbMap);
    gc.onDisposeChain(cbMap, subscription);
    gc.onDisposeChain(subscription, cbMap);
    return subscription;
  }
  /**
   * Emits one value
   */

  next(value: T) {
    this.tryForAll((cb) => cb.next(value));
  }
  /**
   * Signals that an error has occured and shuts down the subscription
   */
  error(reason: any) {
    this.tryForAll((cb) => cb.error(reason));
    gc.dispose(this);
  }
  /**
   * Signals that no further values are expected and shuts down the subscription
   */
  complete() {
    this.tryForAll((cb) => cb.complete());
    gc.dispose(this);
  }

  /**
   * Creates a new observable that applies the listed transformations to the event stream
   */
  pipe<TFinal = T>(...operators: Operator<any, any>[]): Observable<TFinal> {
    return operators.reduce<Observable<any>>(
      (previous, operator) => operator(previous),
      this,
    );
  }

  private tryForAll(fn: (cb: Observer<T>) => void) {
    this.callbacks.forEach((cb) => {
      try {
        fn(cb.observer);
      } catch (error) {
        try {
          cb.observer.error(error);
        } catch (ignored) {
          // eslint-disable-next-line no-empty
        }
        gc.dispose(cb);
      }
    });
  }
}
