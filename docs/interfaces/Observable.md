[**@tobes31415/basic-observables**](../README.md) • **Docs**

***

[@tobes31415/basic-observables](../globals.md) / Observable

# Interface: Observable\<T\>

An asynchronous event source that can be subscribed to

## Type parameters

• **T**

## Methods

### pipe()

> **pipe**\<`TFinal`\>(...`operators`): [`Observable`](Observable.md)\<`TFinal`\>

Creates a new observable that applies the listed transformations to the event stream

#### Type parameters

• **TFinal** = `T`

#### Parameters

• ...**operators**: [`Operator`](../type-aliases/Operator.md)\<`any`, `any`\>[]

#### Returns

[`Observable`](Observable.md)\<`TFinal`\>

#### Source

[types.ts:20](https://github.com/tobes31415/basic-observables/blob/c3e2dc2c699ee60e9f4a58e029cf80562cb6c910/src/types.ts#L20)

***

### subscribe()

#### subscribe(observer)

> **subscribe**(`observer`): [`Subscription`](Subscription.md)

Subscribes to the event stream

##### Parameters

• **observer**: `Partial`\<[`Observer`](Observer.md)\<`T`\>\>

##### Returns

[`Subscription`](Subscription.md)

##### Source

[types.ts:8](https://github.com/tobes31415/basic-observables/blob/c3e2dc2c699ee60e9f4a58e029cf80562cb6c910/src/types.ts#L8)

#### subscribe(next, error, complete)

> **subscribe**(`next`, `error`?, `complete`?): `any`

Subscribes to the event stream

##### Parameters

• **next**: [`EventHandler`](../type-aliases/EventHandler.md)\<`T`\>

• **error?**: [`EventHandler`](../type-aliases/EventHandler.md)\<`any`\>

• **complete?**: [`Action`](../type-aliases/Action.md)

##### Returns

`any`

##### Source

[types.ts:12](https://github.com/tobes31415/basic-observables/blob/c3e2dc2c699ee60e9f4a58e029cf80562cb6c910/src/types.ts#L12)
