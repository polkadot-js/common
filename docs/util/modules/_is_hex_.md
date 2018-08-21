[@polkadot/util](../README.md) > ["is/hex"](../modules/_is_hex_.md)

# External module: "is/hex"

## Index

### Variables

* [HEX_REGEX](_is_hex_.md#hex_regex)

### Functions

* [isHex](_is_hex_.md#ishex)

---

## Variables

<a id="hex_regex"></a>

### `<Const>` HEX_REGEX

**● HEX_REGEX**: *`RegExp`* =  /^0x[a-fA-F0-9]+$/

*Defined in [is/hex.ts:7](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/is/hex.ts#L7)*

___

## Functions

<a id="ishex"></a>

###  isHex

▸ **isHex**(_value: *`any`*, bitLength?: *`number`*, ignoreLength?: *`boolean`*): `boolean`

*Defined in [is/hex.ts:21](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/is/hex.ts#L21)*

*__name__*: isHex

*__signature__*: isHex (value: any, bitLength: number = -1): boolean

*__summary__*: Tests for a hex string.

*__description__*: Checks to see if the input value is a `0x` prefixed hex string. Optionally (`bitLength` !== -1) checks to see if the bitLength is correct.

*__example__*: import { isHex } from '@polkadot/util';

isHex('0x1234'); // => true isHex('0x1234', 8); // => false

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| _value | `any` | - |
| `Default value` bitLength | `number` |  -1 |
| `Default value` ignoreLength | `boolean` | false |

**Returns:** `boolean`

___

