[@polkadot/util-crypto](../README.md) > ["util/src/hex/stripPrefix"](../modules/_util_src_hex_stripprefix_.md)

# External module: "util/src/hex/stripPrefix"

## Index

### Variables

* [UNPREFIX_HEX_REGEX](_util_src_hex_stripprefix_.md#unprefix_hex_regex)

### Functions

* [hexStripPrefix](_util_src_hex_stripprefix_.md#hexstripprefix)

---

## Variables

<a id="unprefix_hex_regex"></a>

### `<Const>` UNPREFIX_HEX_REGEX

**● UNPREFIX_HEX_REGEX**: *`RegExp`* =  /^[a-fA-F0-9]+$/

*Defined in [util/src/hex/stripPrefix.ts:7](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/hex/stripPrefix.ts#L7)*

___

## Functions

<a id="hexstripprefix"></a>

###  hexStripPrefix

▸ **hexStripPrefix**(value: * `string` &#124; `null` &#124; `undefined`*): `string`

*Defined in [util/src/hex/stripPrefix.ts:20](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/hex/stripPrefix.ts#L20)*

*__name__*: hexStripPrefix

*__signature__*: hexStripPrefix (value: ?string): string

*__summary__*: Strips any leading `0x` prefix.

*__description__*: Tests for the existence of a `0x` prefix, and returns the value without the prefix. Un-prefixed values are returned as-is.

*__example__*: import { hexStripPrefix } from '@polkadot/util';

console.log('stripped', hexStripPrefix('0x1234')); // => 1234

**Parameters:**

| Param | Type |
| ------ | ------ |
| value |  `string` &#124; `null` &#124; `undefined`|

**Returns:** `string`

___

