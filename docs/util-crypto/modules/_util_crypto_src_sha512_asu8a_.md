[@polkadot/util](../README.md) > ["util-crypto/src/sha512/asU8a"](../modules/_util_crypto_src_sha512_asu8a_.md)

# External module: "util-crypto/src/sha512/asU8a"

## Index

### Functions

* [sha512AsU8a](_util_crypto_src_sha512_asu8a_.md#sha512asu8a)

---

## Functions

<a id="sha512asu8a"></a>

###  sha512AsU8a

▸ **sha512AsU8a**(data: *`Uint8Array`*): `Uint8Array`

*Defined in [util-crypto/src/sha512/asU8a.ts:18](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/sha512/asU8a.ts#L18)*

*__name__*: sha512AsU8a

*__signature__*: sha512AsU8a (data: Uint8Array): Uint8Array

*__summary__*: Creates sha-512 hash of the input.

*__description__*: Returns a sha-512 `Uint8Array` from the supplied data.

*__example__*: import { sha512AsU8a } from '@polkadot/util-crypto';

sha512AsU8a(Uint8Array.from(\[...\])) // => Uint8Array(\[...\])

**Parameters:**

| Param | Type |
| ------ | ------ |
| data | `Uint8Array` |

**Returns:** `Uint8Array`

___

