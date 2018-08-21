[@polkadot/util](../README.md) > ["util-crypto/src/blake2/asHex"](../modules/_util_crypto_src_blake2_ashex_.md)

# External module: "util-crypto/src/blake2/asHex"

## Index

### Functions

* [blake2AsHex](_util_crypto_src_blake2_ashex_.md#blake2ashex)

---

## Functions

<a id="blake2ashex"></a>

###  blake2AsHex

▸ **blake2AsHex**(data: *`Uint8Array`*, bitLength?: *`number`*): `string`

*Defined in [util-crypto/src/blake2/asHex.ts:18](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/blake2/asHex.ts#L18)*

*__name__*: blake2AsHex

*__signature__*: blake2AsHex (data: Uint8Array, bitLenght: number = 256): string

*__summary__*: Creates a blake2b hex from the input.

*__description__*: From a `Uint8Array` input, create the blake2b and return the result as a hex string with the specified `bitLength`.

*__example__*: import { blake2AsHex } from '@polkadot/util-crypto';

blake2AsHex('abc') // => 0xba80a53f981c4d0d

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| data | `Uint8Array` | - |
| `Default value` bitLength | `number` | 256 |

**Returns:** `string`

___

