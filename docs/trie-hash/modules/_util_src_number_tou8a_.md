[@polkadot/util-crypto](../README.md) > ["util/src/number/toU8a"](../modules/_util_src_number_tou8a_.md)

# External module: "util/src/number/toU8a"

## Index

### Functions

* [numberToU8a](_util_src_number_tou8a_.md#numbertou8a)

---

## Functions

<a id="numbertou8a"></a>

###  numberToU8a

▸ **numberToU8a**(value?: * `undefined` &#124; `number`*, bitLength?: *`number`*): `Uint8Array`

*Defined in [util/src/number/toU8a.ts:19](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/number/toU8a.ts#L19)*

*__name__*: numberToU8a

*__signature__*: numberToU8a (value?: number, bitLenght: number = -1): Uint8Array

*__summary__*: Creates a Uint8Array object from a number.

*__description__*: `null`/`undefined`/`NaN` inputs returns an empty `Uint8Array` result. `number` input values return the actual bytes value converted to a `Uint8Array`. With `bitLength`, it converts the value to the equivalent size.

*__example__*: import { numberToU8a } from '@polkadot/util';

numberToU8a(0x1234); // => \[0x12, 0x34\]

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Optional` value |  `undefined` &#124; `number`| - |
| `Default value` bitLength | `number` |  -1 |

**Returns:** `Uint8Array`

___

