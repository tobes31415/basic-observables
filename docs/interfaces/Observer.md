[**@tobes31415/basic-observables**](../README.md) • **Docs**

***

[@tobes31415/basic-observables](../globals.md) / Observer

# Interface: Observer\<T\>

Code that will consume the events

## Type parameters

• **T**

## Properties

### complete()

> **complete**: () => `void`

Signals that no further values are expected and shuts down the subscription

#### Returns

`void`

#### Source

[types.ts:48](https://github.com/tobes31415/basic-observables/blob/c3e2dc2c699ee60e9f4a58e029cf80562cb6c910/src/types.ts#L48)

***

### error()

> **error**: (`reason`) => `void`

Signals that an error has occured and shuts down the subscription

#### Parameters

• **reason**: `any`

#### Returns

`void`

#### Source

[types.ts:44](https://github.com/tobes31415/basic-observables/blob/c3e2dc2c699ee60e9f4a58e029cf80562cb6c910/src/types.ts#L44)

***

### next()

> **next**: (`value`) => `void`

Emits one value

#### Parameters

• **value**: `T`

#### Returns

`void`

#### Source

[types.ts:40](https://github.com/tobes31415/basic-observables/blob/c3e2dc2c699ee60e9f4a58e029cf80562cb6c910/src/types.ts#L40)
