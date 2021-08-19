[@tobes31415/basic-observables](README.md) / Exports

# @tobes31415/basic-observables

## Table of contents

### Classes

- [Subject](classes/Subject.md)

### Interfaces

- [Observable](interfaces/Observable.md)
- [Observer](interfaces/Observer.md)
- [Subscription](interfaces/Subscription.md)

### Type aliases

- [Action](modules.md#action)
- [EventHandler](modules.md#eventhandler)
- [Operator](modules.md#operator)

### Functions

- [create](modules.md#create)
- [filter](modules.md#filter)
- [from](modules.md#from)
- [map](modules.md#map)
- [of](modules.md#of)
- [scan](modules.md#scan)
- [skip](modules.md#skip)
- [take](modules.md#take)

## Type aliases

### Action

Ƭ **Action**: () => `void` \| `Promise`<`void`\>

#### Type declaration

▸ (): `void` \| `Promise`<`void`\>

Callback function that doesn't accept or return anything

##### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[types.ts:60](https://github.com/tobes31415/basic-observables/blob/61a3967/src/types.ts#L60)

___

### EventHandler

Ƭ **EventHandler**<`T`\>: (`value`: `T`) => `void` \| `Promise`<`void`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`value`): `void` \| `Promise`<`void`\>

Callback function that accepts a value and doesn't return anything

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`void` \| `Promise`<`void`\>

#### Defined in

[types.ts:55](https://github.com/tobes31415/basic-observables/blob/61a3967/src/types.ts#L55)

___

### Operator

Ƭ **Operator**<`TIn`, `TOut`\>: (`observable`: [`Observable`](interfaces/Observable.md)<`TIn`\>) => [`Observable`](interfaces/Observable.md)<`TOut`\>

#### Type parameters

| Name |
| :------ |
| `TIn` |
| `TOut` |

#### Type declaration

▸ (`observable`): [`Observable`](interfaces/Observable.md)<`TOut`\>

A function which can be chained to modify a stream of events

##### Parameters

| Name | Type |
| :------ | :------ |
| `observable` | [`Observable`](interfaces/Observable.md)<`TIn`\> |

##### Returns

[`Observable`](interfaces/Observable.md)<`TOut`\>

#### Defined in

[types.ts:50](https://github.com/tobes31415/basic-observables/blob/61a3967/src/types.ts#L50)

## Functions

### create

▸ **create**<`T`\>(`fn`): [`Observable`](interfaces/Observable.md)<`T`\>

Creates a new Observable using a generator function

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (`observer`: [`Observer`](interfaces/Observer.md)<`T`\>) => `void` \| () => `void` \| () => `Promise`<`void`\> |

#### Returns

[`Observable`](interfaces/Observable.md)<`T`\>

#### Defined in

[operators.ts:29](https://github.com/tobes31415/basic-observables/blob/61a3967/src/operators.ts#L29)

___

### filter

▸ **filter**<`T`\>(`filterFn`): [`Operator`](modules.md#operator)<`T`, `T`\>

Filters an event stream

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filterFn` | (`value`: `T`) => `boolean` |

#### Returns

[`Operator`](modules.md#operator)<`T`, `T`\>

#### Defined in

[operators.ts:60](https://github.com/tobes31415/basic-observables/blob/61a3967/src/operators.ts#L60)

___

### from

▸ **from**<`T`\>(`values`): [`Observable`](interfaces/Observable.md)<`T`\>

Creates a new Observable using an array

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `values` | `T`[] |

#### Returns

[`Observable`](interfaces/Observable.md)<`T`\>

#### Defined in

[operators.ts:36](https://github.com/tobes31415/basic-observables/blob/61a3967/src/operators.ts#L36)

___

### map

▸ **map**<`TIn`, `TOut`\>(`mapFn`): [`Operator`](modules.md#operator)<`TIn`, `TOut`\>

Maps the values of an event stream

#### Type parameters

| Name |
| :------ |
| `TIn` |
| `TOut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `mapFn` | (`value`: `TIn`) => `TOut` |

#### Returns

[`Operator`](modules.md#operator)<`TIn`, `TOut`\>

#### Defined in

[operators.ts:53](https://github.com/tobes31415/basic-observables/blob/61a3967/src/operators.ts#L53)

___

### of

▸ **of**<`T`\>(...`values`): [`Observable`](interfaces/Observable.md)<`T`\>

Creates a new Observable using a list of values

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...values` | `T`[] |

#### Returns

[`Observable`](interfaces/Observable.md)<`T`\>

#### Defined in

[operators.ts:46](https://github.com/tobes31415/basic-observables/blob/61a3967/src/operators.ts#L46)

___

### scan

▸ **scan**<`TIn`, `TOut`\>(`scanFn`, `initialValue?`): [`Operator`](modules.md#operator)<`TIn`, `TOut`\>

Scans an event stream and produces interim values

#### Type parameters

| Name |
| :------ |
| `TIn` |
| `TOut` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `scanFn` | (`acc`: `TOut` \| `undefined`, `value`: `TIn`) => `TOut` |
| `initialValue?` | `TOut` |

#### Returns

[`Operator`](modules.md#operator)<`TIn`, `TOut`\>

#### Defined in

[operators.ts:67](https://github.com/tobes31415/basic-observables/blob/61a3967/src/operators.ts#L67)

___

### skip

▸ **skip**<`T`\>(`skip`): [`Operator`](modules.md#operator)<`T`, `T`\>

Skips the first 'n' values of an event stream.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `skip` | `number` |

#### Returns

[`Operator`](modules.md#operator)<`T`, `T`\>

#### Defined in

[operators.ts:93](https://github.com/tobes31415/basic-observables/blob/61a3967/src/operators.ts#L93)

___

### take

▸ **take**<`T`\>(`take`): [`Operator`](modules.md#operator)<`T`, `T`\>

Takes the first 'n' values of an event stream then completes.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `take` | `number` |

#### Returns

[`Operator`](modules.md#operator)<`T`, `T`\>

#### Defined in

[operators.ts:77](https://github.com/tobes31415/basic-observables/blob/61a3967/src/operators.ts#L77)
