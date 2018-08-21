[@polkadot/util-crypto](../README.md) > ["util/src/is/bn"](../modules/_util_src_is_bn_.md)

# External module: "util/src/is/bn"

## Index

### Functions

* [isBn](_util_src_is_bn_.md#isbn)

---

## Functions

<a id="isbn"></a>

###  isBn

▸ **isBn**(value: *`any`*): `boolean`

*Defined in [util/src/is/bn.ts:19](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/is/bn.ts#L19)*

*__name__*: isBn

*__signature__*: isBN (value: any): boolean

*__summary__*: Tests for a `BN` object instance.

*__description__*: Checks to see if the input object is an instance of `BN` (bn.js).

*__example__*: import BN from 'bn.js'; import { isBn } from '@polkadot/util';

console.log('isBn', isBn(new BN(1))); // => true

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___

