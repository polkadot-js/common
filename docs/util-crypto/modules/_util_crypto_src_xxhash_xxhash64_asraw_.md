[@polkadot/util](../README.md) > ["util-crypto/src/xxhash/xxhash64/asRaw"](../modules/_util_crypto_src_xxhash_xxhash64_asraw_.md)

# External module: "util-crypto/src/xxhash/xxhash64/asRaw"

## Index

### Functions

* [xxhash64AsRaw](_util_crypto_src_xxhash_xxhash64_asraw_.md#xxhash64asraw)

---

## Functions

<a id="xxhash64asraw"></a>

###  xxhash64AsRaw

▸ **xxhash64AsRaw**(data: * `Buffer` &#124; `Uint8Array` &#124; `string`*, seed: *`number`*): `string`

*Defined in [util-crypto/src/xxhash/xxhash64/asRaw.ts:18](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/xxhash/xxhash64/asRaw.ts#L18)*

*__name__*: xxhash64AsRaw

*__signature__*: xxhash64AsRaw (data: Buffer | Uint8Array | string, seed: number): string

*__summary__*: Creates a xxhash non-prefixed hex from the input.

*__description__*: From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a non-prefixed hex string.

*__example__*: import { xxhash64AsRaw } from '@polkadot/util-crypto';

xxhash64AsRaw('abcd', 0xabcd)) // => e29f70f8b8c96df7

**Parameters:**

| Param | Type |
| ------ | ------ |
| data |  `Buffer` &#124; `Uint8Array` &#124; `string`|
| seed | `number` |

**Returns:** `string`

___

