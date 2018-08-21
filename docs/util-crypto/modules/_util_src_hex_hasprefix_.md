[@polkadot/util](../README.md) > ["util/src/hex/hasPrefix"](../modules/_util_src_hex_hasprefix_.md)

# External module: "util/src/hex/hasPrefix"

## Index

### Functions

* [hexHasPrefix](_util_src_hex_hasprefix_.md#hexhasprefix)

---

## Functions

<a id="hexhasprefix"></a>

###  hexHasPrefix

▸ **hexHasPrefix**(value: * `string` &#124; `null` &#124; `undefined`*): `boolean`

*Defined in [util/src/hex/hasPrefix.ts:18](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/hex/hasPrefix.ts#L18)*

*__name__*: hexHasPrefix

*__signature__*: hexHasPrefix (value: ?string): boolean

*__summary__*: Tests for the existence of a `0x` prefix.

*__description__*: Checks for a valid hex input value and if the start matched `0x`

*__example__*: import { hexHasPrefix } from '@polkadot/util';

console.log('has prefix', hexHasPrefix('0x1234')); // => true

**Parameters:**

| Param | Type |
| ------ | ------ |
| value |  `string` &#124; `null` &#124; `undefined`|

**Returns:** `boolean`

___

