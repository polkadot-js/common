[@polkadot/util](../README.md) > ["u8a/toBuffer"](../modules/_u8a_tobuffer_.md)

# External module: "u8a/toBuffer"

## Index

### Functions

* [u8aToBuffer](_u8a_tobuffer_.md#u8atobuffer)

---

## Functions

<a id="u8atobuffer"></a>

###  u8aToBuffer

▸ **u8aToBuffer**(value?: *`Uint8Array`*): `Buffer`

*Defined in [u8a/toBuffer.ts:16](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/u8a/toBuffer.ts#L16)*

*__name__*: u8aToBuffer

*__signature__*: u8aToBuffer (value?: UInt8Array): Buffer

*__summary__*: Creates a Buffer object from a hex string.

*__description__*: `null` inputs returns an empty `Buffer` result. `UInt8Array` input values return the actual bytes value converted to a `Buffer`. Anything that is not a `UInt8Array` throws an error.

*__example__*: import { u8aToBuffer } from '@polkadot/util';

console.log('Buffer', u8aToBuffer('0x123480001f'));

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` value | `Uint8Array` |

**Returns:** `Buffer`

___

