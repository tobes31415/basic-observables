[**@tobes31415/basic-observables**](../README.md) • **Docs**

***

[@tobes31415/basic-observables](../globals.md) / Subject

# Class: Subject\<T\>

A multi-cast observable that synchrnously sends an update to all connected subscribers

## Type parameters

• **T**

## Implements

- [`Observable`](../interfaces/Observable.md)\<`T`\>

## Constructors

### new Subject()

> **new Subject**\<`T`\>(): [`Subject`](Subject.md)\<`T`\>

#### Returns

[`Subject`](Subject.md)\<`T`\>

## Methods

### complete()

> **complete**(): `void`

Signals that no further values are expected and shuts down the subscription

#### Returns

`void`

#### Source

[subject.ts:82](https://github.com/tobes31415/basic-observables/blob/c3e2dc2c699ee60e9f4a58e029cf80562cb6c910/src/subject.ts#L82)

***

### error()

> **error**(`reason`): `void`

Signals that an error has occured and shuts down the subscription

#### Parameters

• **reason**: `any`

#### Returns

`void`

#### Source

[subject.ts:75](https://github.com/tobes31415/basic-observables/blob/c3e2dc2c699ee60e9f4a58e029cf80562cb6c910/src/subject.ts#L75)

***

### next()

> **next**(`value`): `void`

Emits one value

#### Parameters

• **value**: `T`

#### Returns

`void`

#### Source

[subject.ts:69](https://github.com/tobes31415/basic-observables/blob/c3e2dc2c699ee60e9f4a58e029cf80562cb6c910/src/subject.ts#L69)

***

### pipe()

> **pipe**\<`TFinal`\>(...`operators`): [`Observable`](../interfaces/Observable.md)\<`TFinal`\>

Creates a new observable that applies the listed transformations to the event stream

#### Type parameters

• **TFinal** = `T`

#### Parameters

• ...**operators**: [`Operator`](../type-aliases/Operator.md)\<`any`, `any`\>[]

#### Returns

[`Observable`](../interfaces/Observable.md)\<`TFinal`\>

#### Implementation of

[`Observable`](../interfaces/Observable.md).[`pipe`](../interfaces/Observable.md#pipe)

#### Source

[subject.ts:90](https://github.com/tobes31415/basic-observables/blob/c3e2dc2c699ee60e9f4a58e029cf80562cb6c910/src/subject.ts#L90)

***

### subscribe()

#### subscribe(next, error, complete)

> **subscribe**(`next`, `error`?, `complete`?): [`Subscription`](../interfaces/Subscription.md)

Subscribes to the event stream

##### Parameters

• **next**: [`EventHandler`](../type-aliases/EventHandler.md)\<`T`\>

• **error?**: [`EventHandler`](../type-aliases/EventHandler.md)\<`any`\>

• **complete?**: [`EventHandler`](../type-aliases/EventHandler.md)\<`void`\>

##### Returns

[`Subscription`](../interfaces/Subscription.md)

##### Implementation of

[`Observable`](../interfaces/Observable.md).[`subscribe`](../interfaces/Observable.md#subscribe)

##### Source

[subject.ts:26](https://github.com/tobes31415/basic-observables/blob/c3e2dc2c699ee60e9f4a58e029cf80562cb6c910/src/subject.ts#L26)

#### subscribe(observer)

> **subscribe**(`observer`): [`Subscription`](../interfaces/Subscription.md)

Subscribes to the event stream

##### Parameters

• **observer**: `Partial`\<[`Observer`](../interfaces/Observer.md)\<`T`\>\>

##### Returns

[`Subscription`](../interfaces/Subscription.md)

##### Implementation of

[`Observable`](../interfaces/Observable.md).[`subscribe`](../interfaces/Observable.md#subscribe)

##### Source

[subject.ts:34](https://github.com/tobes31415/basic-observables/blob/c3e2dc2c699ee60e9f4a58e029cf80562cb6c910/src/subject.ts#L34)
