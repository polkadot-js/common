[@polkadot/util](../README.md) > ["u8a/toUtf8"](../modules/_u8a_toutf8_.md)

# External module: "u8a/toUtf8"

## Index

### Variables

* [decoder](_u8a_toutf8_.md#decoder)

### Functions

* [u8aToUtf8](_u8a_toutf8_.md#u8atoutf8)

---

## Variables

<a id="decoder"></a>

### `<Const>` decoder

**● decoder**: *`TextDecoder`* =  new TextDecoder('utf-8')

*Defined in [u8a/toUtf8.ts:7](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/u8a/toUtf8.ts#L7)*

___

## Functions

<a id="u8atoutf8"></a>

###  u8aToUtf8

▸ **u8aToUtf8**(value?: *`Uint8Array`*): `string`

*Defined in [u8a/toUtf8.ts:20](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/u8a/toUtf8.ts#L20)*

*__name__*: u8aToUtf8

*__signature__*: u8aToUtf8 (value?: UInt8Array): string

*__summary__*: Creates a utf-8 string from a Uint8Array object.

*__description__*: `UInt8Array` input values return the actual decoded utf-8 string. `null` or `undefined` values returns an empty string.

*__example__*: import { u8aToUtf8 } from '@polkadot/util';

u8aToUtf8(new Uint8Array(\[0x68, 0x65, 0x6c, 0x6c, 0x6f\])); // hello

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` value | `Uint8Array` |

**Returns:** `string`

___

