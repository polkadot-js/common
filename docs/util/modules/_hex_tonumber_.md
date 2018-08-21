[@polkadot/util](../README.md) > ["hex/toNumber"](../modules/_hex_tonumber_.md)

# External module: "hex/toNumber"

## Index

### Functions

* [hexToNumber](_hex_tonumber_.md#hextonumber)

---

## Functions

<a id="hextonumber"></a>

###  hexToNumber

▸ **hexToNumber**(value?: * `undefined` &#124; `string`*): `number`

*Defined in [hex/toNumber.ts:18](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/hex/toNumber.ts#L18)*

*__name__*: hexToNumber

*__signature__*: hexToNumber (value?: string): number

*__summary__*: Creates a Number value from a Buffer object.

*__description__*: `null` inputs returns an NaN result, `hex` values return the actual value as a `Number`.

*__example__*: import { hexToNumber } from '@polkadot/util';

hexToNumber('0x1234'); // => 0x1234

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` value |  `undefined` &#124; `string`|

**Returns:** `number`

___

