[@polkadot/util](../README.md) > ["hex/toBn"](../modules/_hex_tobn_.md)

# External module: "hex/toBn"

## Index

### Functions

* [hexToBn](_hex_tobn_.md#hextobn)
* [reverse](_hex_tobn_.md#reverse)

---

## Functions

<a id="hextobn"></a>

###  hexToBn

▸ **hexToBn**(_value?: * `undefined` &#124; `string`*, isLe?: *`boolean`*): `BN`

*Defined in [hex/toBn.ts:26](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/hex/toBn.ts#L26)*

*__name__*: hexToBn

*__signature__*: hexToBn (value?: string, isLe: boolean = false): BN

*__summary__*: Creates a BN.js bignumber object from a hex string.

*__description__*: `null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.

*__example__*: import { hexToBn } from '@polkadot/util';

hexToBn('0x123480001f'); // => BN(0x123480001f)

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Optional` _value |  `undefined` &#124; `string`| - |
| `Default value` isLe | `boolean` | false |

**Returns:** `BN`

___
<a id="reverse"></a>

###  reverse

▸ **reverse**(value: *`string`*): `string`

*Defined in [hex/toBn.ts:9](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/hex/toBn.ts#L9)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `string` |

**Returns:** `string`

___

