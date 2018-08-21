[@polkadot/util](../README.md) > ["util-crypto/src/xxhash/xxhash64/asBn"](../modules/_util_crypto_src_xxhash_xxhash64_asbn_.md)

# External module: "util-crypto/src/xxhash/xxhash64/asBn"

## Index

### Functions

* [xxhash64AsBn](_util_crypto_src_xxhash_xxhash64_asbn_.md#xxhash64asbn)

---

## Functions

<a id="xxhash64asbn"></a>

###  xxhash64AsBn

▸ **xxhash64AsBn**(data: * `Buffer` &#124; `Uint8Array` &#124; `string`*, seed: *`number`*): `BN`

*Defined in [util-crypto/src/xxhash/xxhash64/asBn.ts:20](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/xxhash/xxhash64/asBn.ts#L20)*

*__name__*: xxhash64AsBn

*__signature__*: xxhash64AsBn (data: Buffer | Uint8Array | string, seed: number): BN

*__summary__*: Creates a xxhash BN from the input.

*__description__*: From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a BN.

*__example__*: import { xxhash64AsNumber } from '@polkadot/util-crypto';

xxhash64AsBn('abcd', 0xabcd)) // => new BN(0xe29f70f8b8c96df7)

**Parameters:**

| Param | Type |
| ------ | ------ |
| data |  `Buffer` &#124; `Uint8Array` &#124; `string`|
| seed | `number` |

**Returns:** `BN`

___

