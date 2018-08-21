[@polkadot/util-crypto](../README.md) > ["util/src/bn/toHex"](../modules/_util_src_bn_tohex_.md)

# External module: "util/src/bn/toHex"

## Index

### Variables

* [ZERO_STR](_util_src_bn_tohex_.md#zero_str)

### Functions

* [bnToHex](_util_src_bn_tohex_.md#bntohex)

---

## Variables

<a id="zero_str"></a>

### `<Const>` ZERO_STR

**● ZERO_STR**: *"0x00"* = "0x00"

*Defined in [util/src/bn/toHex.ts:10](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/bn/toHex.ts#L10)*

___

## Functions

<a id="bntohex"></a>

###  bnToHex

▸ **bnToHex**(value?: * `BN` &#124; `number`*, bitLength?: *`number`*): `string`

*Defined in [util/src/bn/toHex.ts:24](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/bn/toHex.ts#L24)*

*__name__*: bnToHex

*__signature__*: bnToHex (value?: BN, bitLength: number = -1): string

*__summary__*: Creates a hex value from a BN.js bignumber object.

*__description__*: `null` inputs returns a `0x` result, BN values return the actual value as a `0x` prefixed hex value. Anything that is not a BN object throws an error. With `bitLength` set, it fixes the number to the specified length.

*__example__*: import BN from 'bn.js'; import { bnToHex } from '@polkadot/util';

bnToHex(new BN(0x123456)); // => '0x123456'

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Optional` value |  `BN` &#124; `number`| - |
| `Default value` bitLength | `number` |  -1 |

**Returns:** `string`

___

