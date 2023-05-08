/**
 * An asynchronous event source that can be subscribed to
 */
export interface Observable<T> {
  /**
   * Subscribes to the event stream
   */
  subscribe(observer: Partial<Observer<T>>): Subscription;
  /**
   * Subscribes to the event stream
   */
  subscribe(
    next: EventHandler<T>,
    error?: EventHandler<any>,
    complete?: Action,
  );
  /**
   * Creates a new observable that applies the listed transformations to the event stream
   */
  pipe<TFinal = T>(...operators: Operator<any, any>[]): Observable<TFinal>;
}

/**
 * An object representing the subscription to an event source
 */
export interface Subscription {
  /**
   * Unsubscribes from the event source
   */
  unsubscribe: () => void;
}

/**
 * Code that will consume the events
 */
export interface Observer<T> {
  /**
   * Emits one value
   */
  next: (value: T) => void;
  /**
   * Signals that an error has occured and shuts down the subscription
   */
  error: (reason: any) => void;
  /**
   * Signals that no further values are expected and shuts down the subscription
   */
  complete: () => void;
}

/**
 * A function which can be chained to modify a stream of events
 */
export type Operator<TIn, TOut> = (
  observable: Observable<TIn>,
) => Observable<TOut>;

/**
 * Callback function that accepts a value and doesn't return anything
 */
export type EventHandler<T> = (value: T) => void | Promise<void>;

/**
 * Callback function that doesn't accept or return anything
 */
export type Action = () => void | Promise<void>;
