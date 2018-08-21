[@polkadot/util-crypto](../README.md) > ["util/src/hex/addPrefix"](../modules/_util_src_hex_addprefix_.md)

# External module: "util/src/hex/addPrefix"

## Index

### Functions

* [hexAddPrefix](_util_src_hex_addprefix_.md#hexaddprefix)

---

## Functions

<a id="hexaddprefix"></a>

###  hexAddPrefix

▸ **hexAddPrefix**(value: * `string` &#124; `null` &#124; `undefined`*): `string`

*Defined in [util/src/hex/addPrefix.ts:18](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/hex/addPrefix.ts#L18)*

*__name__*: hexAddPrefix

*__signature__*: hexAddPrefix (value: ?string): string

*__summary__*: Adds the `0x` prefix to string values.

*__description__*: Returns a `0x` prefixed string from the input value. If the input is already prefixed, it is returned unchanged.

*__example__*: import { hexAddPrefix } from '@polkadot/util';

console.log('With prefix', hexAddPrefix('0a0b12')) // => 0x0a0b12

**Parameters:**

| Param | Type |
| ------ | ------ |
| value |  `string` &#124; `null` &#124; `undefined`|

**Returns:** `string`

___

