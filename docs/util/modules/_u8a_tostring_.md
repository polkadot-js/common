[@polkadot/util](../README.md) > ["u8a/toString"](../modules/_u8a_tostring_.md)

# External module: "u8a/toString"

## Index

### Functions

* [u8aToString](_u8a_tostring_.md#u8atostring)

---

## Functions

<a id="u8atostring"></a>

###  u8aToString

▸ **u8aToString**(value?: *`Uint8Array`*): `string`

*Defined in [u8a/toString.ts:16](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/u8a/toString.ts#L16)*

*__name__*: u8aToString

*__signature__*: u8aToString (value?: UInt8Array): string

*__summary__*: Creates a string from a Uint8Array object.

*__description__*: `UInt8Array` input values return the actual decoded string. `null` or `undefined` values returns an empty string.

*__example__*: import { u8aToString } from '@polkadot/util';

u8aToString(new Uint8Array(\[21,23,45,67\])); // 21,23,45,67

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` value | `Uint8Array` |

**Returns:** `string`

___

