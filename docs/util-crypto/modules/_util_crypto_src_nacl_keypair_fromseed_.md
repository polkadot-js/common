[@polkadot/util](../README.md) > ["util-crypto/src/nacl/keypair/fromSeed"](../modules/_util_crypto_src_nacl_keypair_fromseed_.md)

# External module: "util-crypto/src/nacl/keypair/fromSeed"

## Index

### Functions

* [naclKeypairFromSeed](_util_crypto_src_nacl_keypair_fromseed_.md#naclkeypairfromseed)

---

## Functions

<a id="naclkeypairfromseed"></a>

###  naclKeypairFromSeed

▸ **naclKeypairFromSeed**(seed: *`Uint8Array`*): `KeypairType`

*Defined in [util-crypto/src/nacl/keypair/fromSeed.ts:20](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/nacl/keypair/fromSeed.ts#L20)*

*__name__*: naclKeypairFromSeed

*__signature__*: naclKeypairFromSeed (seed: Uint8Array): { secretKey: Uint8Array, publicKey: Uint8Array }

*__summary__*: Creates a new public/secret keypair from a seed.

*__description__*: Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.

*__example__*: import { naclKeypairFromSeed } from '@polkadot/util-crypto';

naclKeypairFromSeed(...) // => { secretKey: \[...\], publicKey: \[...\] }

**Parameters:**

| Param | Type |
| ------ | ------ |
| seed | `Uint8Array` |

**Returns:** `KeypairType`

___

