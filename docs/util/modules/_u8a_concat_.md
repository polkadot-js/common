[@polkadot/util](../README.md) > ["u8a/concat"](../modules/_u8a_concat_.md)

# External module: "u8a/concat"

## Index

### Functions

* [u8aConcat](_u8a_concat_.md#u8aconcat)

---

## Functions

<a id="u8aconcat"></a>

###  u8aConcat

▸ **u8aConcat**(..._list: *`Array`< `Uint8Array` &#124; `string`>*): `Uint8Array`

*Defined in [u8a/concat.ts:21](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/u8a/concat.ts#L21)*

*__name__*: u8aConcat

*__signature__*: u8aConcat (...values: Array<Uint8Array | string>): Uint8Array

*__summary__*: Creates a concatenated Uint8Array from the inputs.

*__description__*: Concatenates the input arrays into a single `UInt8Array`.

*__example__*: import { u8aConcat } from '@polkadot/util';

u8aConcat( new Uint8Array(\[1, 2, 3\]), new Uint8Array(\[4, 5, 6\]) ); // \[1, 2, 3, 4, 5, 6\]

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Rest` _list | `Array`< `Uint8Array` &#124; `string`> |

**Returns:** `Uint8Array`

___

