[@polkadot/util](../README.md) > ["is/observable"](../modules/_is_observable_.md)

# External module: "is/observable"

## Index

### Type aliases

* [Observable](_is_observable_.md#observable)

### Functions

* [isObservable](_is_observable_.md#isobservable)

---

## Type aliases

<a id="observable"></a>

###  Observable

**ΤObservable**: *`object`*

*Defined in [is/observable.ts:8](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/is/observable.ts#L8)*

#### Type declaration

 next: `function`

▸(...paarams: *`any`[]*): `any`

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Rest` paarams | `any`[] |

**Returns:** `any`

___

## Functions

<a id="isobservable"></a>

###  isObservable

▸ **isObservable**(value: *`any`*): `boolean`

*Defined in [is/observable.ts:23](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/is/observable.ts#L23)*

*__name__*: isBObservable

*__signature__*: isObservable (value: any): boolean

*__summary__*: Tests for a `Observable` object instance.

*__description__*: Checks to see if the input object is an instance of `BN` (bn.js).

*__example__*: import { isObservable } from '@polkadot/util';

console.log('isObservable', isObservable(...));

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___

