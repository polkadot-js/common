[@polkadot/util-crypto](../README.md) > ["util/src/u8a/fromUtf8"](../modules/_util_src_u8a_fromutf8_.md)

# External module: "util/src/u8a/fromUtf8"

## Index

### Variables

* [encoder](_util_src_u8a_fromutf8_.md#encoder)

### Functions

* [u8aFromUtf8](_util_src_u8a_fromutf8_.md#u8afromutf8)

---

## Variables

<a id="encoder"></a>

### `<Const>` encoder

**● encoder**: *`TextEncoder`* =  new TextEncoder()

*Defined in [util/src/u8a/fromUtf8.ts:7](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/u8a/fromUtf8.ts#L7)*

___

## Functions

<a id="u8afromutf8"></a>

###  u8aFromUtf8

▸ **u8aFromUtf8**(value?: * `undefined` &#124; `string`*): `Uint8Array`

*Defined in [util/src/u8a/fromUtf8.ts:20](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/u8a/fromUtf8.ts#L20)*

*__name__*: u8aFromUtf8

*__signature__*: u8aFromUtf8 (value?: string): UInt8Array

*__summary__*: Creates a Uint8Array object from a utf-8 string.

*__description__*: String input values return the actual encoded `UInt8Array`. `null` or `undefined` values returns an empty encoded array.

*__example__*: import { u8aFromUtf8 } from '@polkadot/util';

u8aFromUtf8('hello'); // \[0x68, 0x65, 0x6c, 0x6c, 0x6f\]

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` value |  `undefined` &#124; `string`|

**Returns:** `Uint8Array`

___

