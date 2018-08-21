[@polkadot/util](../README.md) > ["util-crypto/src/nacl/keypair/fromSecret"](../modules/_util_crypto_src_nacl_keypair_fromsecret_.md)

# External module: "util-crypto/src/nacl/keypair/fromSecret"

## Index

### Functions

* [naclKeypairFromSecret](_util_crypto_src_nacl_keypair_fromsecret_.md#naclkeypairfromsecret)

---

## Functions

<a id="naclkeypairfromsecret"></a>

###  naclKeypairFromSecret

▸ **naclKeypairFromSecret**(secret: *`Uint8Array`*): `KeypairType`

*Defined in [util-crypto/src/nacl/keypair/fromSecret.ts:20](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/nacl/keypair/fromSecret.ts#L20)*

*__name__*: naclKeypairFromSecret

*__signature__*: naclKeypairFromSecret (secret: Uint8Array): { secretKey: Uint8Array, publicKey: Uint8Array }

*__summary__*: Creates a new public/secret keypair from a secret.

*__description__*: Returns a object containing a `publicKey` & `secretKey` generated from the supplied secret.

*__example__*: import { naclKeypairFromSecret } from '@polkadot/util-crypto';

naclKeypairFromSecret(...) // => { secretKey: \[...\], publicKey: \[...\] }

**Parameters:**

| Param | Type |
| ------ | ------ |
| secret | `Uint8Array` |

**Returns:** `KeypairType`

___

