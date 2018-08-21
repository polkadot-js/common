[@polkadot/util](../README.md) > ["util-crypto/src/nacl/keypair/fromRandom"](../modules/_util_crypto_src_nacl_keypair_fromrandom_.md)

# External module: "util-crypto/src/nacl/keypair/fromRandom"

## Index

### Functions

* [naclKeypairFromRandom](_util_crypto_src_nacl_keypair_fromrandom_.md#naclkeypairfromrandom)

---

## Functions

<a id="naclkeypairfromrandom"></a>

###  naclKeypairFromRandom

▸ **naclKeypairFromRandom**(): `KeypairType`

*Defined in [util-crypto/src/nacl/keypair/fromRandom.ts:20](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/nacl/keypair/fromRandom.ts#L20)*

*__name__*: naclKeypair

*__signature__*: naclKeypairFromRandom (): { secretKey: Uint8Array, publicKey: Uint8Array }

*__summary__*: Creates a new public/secret keypair.

*__description__*: Returns a new generate object containing a `publicKey` & `secretKey`.

*__example__*: import { naclKeypair } from '@polkadot/util-crypto';

naclKeypair() // => { secretKey: \[...\], publicKey: \[...\] }

**Returns:** `KeypairType`

___

