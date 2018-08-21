[@polkadot/util](../README.md) > ["u8a/fromString"](../modules/_u8a_fromstring_.md)

# External module: "u8a/fromString"

## Index

### Functions

* [u8aFromString](_u8a_fromstring_.md#u8afromstring)

---

## Functions

<a id="u8afromstring"></a>

###  u8aFromString

▸ **u8aFromString**(value: *`string`*): `Uint8Array`

*Defined in [u8a/fromString.ts:16](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/u8a/fromString.ts#L16)*

*__name__*: u8aFromString

*__signature__*: u8aFromString (value: string): UInt8Array

*__summary__*: Creates a Uint8Array object from a string.

*__description__*: String input values return the actual encoded `UInt8Array`.

*__example__*: import { u8aFromString } from '@polkadot/util';

u8aFromString('hello'); // \[0x68, 0x65, 0x6c, 0x6c, 0x6f\]

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `string` |

**Returns:** `Uint8Array`

___

