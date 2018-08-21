[@polkadot/util](../README.md) > ["util-crypto/src/nacl/verify"](../modules/_util_crypto_src_nacl_verify_.md)

# External module: "util-crypto/src/nacl/verify"

## Index

### Functions

* [naclVerify](_util_crypto_src_nacl_verify_.md#naclverify)

---

## Functions

<a id="naclverify"></a>

###  naclVerify

▸ **naclVerify**(message: *`Uint8Array`*, signature: *`Uint8Array`*, publicKey: *`Uint8Array`*): `boolean`

*Defined in [util-crypto/src/nacl/verify.ts:18](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/nacl/verify.ts#L18)*

*__name__*: naclSign

*__signature__*: naclVerify (message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array): boolean

*__summary__*: Verifies the signature on the supplied message.

*__description__*: Verifies the `signature` on `message` with the supplied `plublicKey`. Returns `true` on sucess, `false` otherwise.

*__example__*: import { naclVerify } from '@polkadot/util-crypto';

naclVerify(\[...\], \[...\], \[...\]) // => true/false

**Parameters:**

| Param | Type |
| ------ | ------ |
| message | `Uint8Array` |
| signature | `Uint8Array` |
| publicKey | `Uint8Array` |

**Returns:** `boolean`

___

