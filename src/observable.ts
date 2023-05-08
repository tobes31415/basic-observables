import {
  Action,
  EventHandler,
  Observable,
  Observer,
  Operator,
  Subscription,
} from "./types";
import { LightweightSubscription } from "./subscription";
import * as gc from "@tobes31415/dispose";
import { LightweightSubscriber } from "./subscriber";
import { makeFull } from "./util";

export class LightweightObservable<T> implements Observable<T> {
  constructor(private initFunc: (subscriber: Observer<T>) => void | Action) {}

  subscribe(
    next: EventHandler<T>,
    error?: EventHandler<any>,
    complete?: EventHandler<void>,
  ): Subscription;
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

  private subscribeToObserver(observer: Partial<Observer<T>>): Subscription {
    const subscription = new LightweightSubscription();
    try {
      gc.onDisposeChain(this, subscription);

      const subscriber = new LightweightSubscriber<T>(
        makeFull(observer),
        subscription,
      );
      gc.onDisposeChain(this, subscriber);

      const onFinish = this.initFunc(subscriber);
      if (typeof onFinish === "function") {
        gc.onDispose(subscription, onFinish);
      }
    } catch (err) {
      gc.dispose(subscription);
    }
    return subscription;
  }

  pipe<TFinal = T>(...operators: Operator<any, any>[]): Observable<TFinal> {
    return operators.reduce<Observable<any>>(
      (previous, operator) => operator(previous),
      this,
    );
  }
}
