[@polkadot/util-crypto](../README.md) > ["util/src/number/toHex"](../modules/_util_src_number_tohex_.md)

# External module: "util/src/number/toHex"

## Index

### Functions

* [numberToHex](_util_src_number_tohex_.md#numbertohex)

---

## Functions

<a id="numbertohex"></a>

###  numberToHex

▸ **numberToHex**(value?: * `undefined` &#124; `number`*, bitLength?: *`number`*): `string`

*Defined in [util/src/number/toHex.ts:21](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/number/toHex.ts#L21)*

*__name__*: numberToHex

*__signature__*: numberToHex (value?: number): string

*__summary__*: Creates a hex value from a number.

*__description__*: `null`/`undefined`/`NaN` inputs returns an empty `0x` result. `number` input values return the actual bytes value converted to a `hex`. With `bitLength` set, it converts the number to the equivalent size.

*__example__*: import { numberToHex } from '@polkadot/util';

numberToHex(0x1234); // => '0x1234' numberToHex(0x1234, 32) // => 0x00001234

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Optional` value |  `undefined` &#124; `number`| - |
| `Default value` bitLength | `number` |  -1 |

**Returns:** `string`

___

