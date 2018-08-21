[@polkadot/util](../README.md) > ["util-crypto/src/xxhash/xxhash64/asHex"](../modules/_util_crypto_src_xxhash_xxhash64_ashex_.md)

# External module: "util-crypto/src/xxhash/xxhash64/asHex"

## Index

### Functions

* [xxhash64AsHex](_util_crypto_src_xxhash_xxhash64_ashex_.md#xxhash64ashex)

---

## Functions

<a id="xxhash64ashex"></a>

###  xxhash64AsHex

▸ **xxhash64AsHex**(data: * `Buffer` &#124; `Uint8Array` &#124; `string`*, seed: *`number`*): `string`

*Defined in [util-crypto/src/xxhash/xxhash64/asHex.ts:20](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/xxhash/xxhash64/asHex.ts#L20)*

*__name__*: xxhash64AsHex

*__signature__*: xxhash64AsHex (data: Buffer | Uint8Array | string, seed: number): string

*__summary__*: Creates a xxhash hex from the input.

*__description__*: From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a hex string.

*__example__*: import { xxhash64AsHex } from '@polkadot/util-crypto';

xxhash64AsHex('abcd', 0xabcd)) // => 0xe29f70f8b8c96df7

**Parameters:**

| Param | Type |
| ------ | ------ |
| data |  `Buffer` &#124; `Uint8Array` &#124; `string`|
| seed | `number` |

**Returns:** `string`

___

