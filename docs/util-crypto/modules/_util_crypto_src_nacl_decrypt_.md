[@polkadot/util](../README.md) > ["util-crypto/src/nacl/decrypt"](../modules/_util_crypto_src_nacl_decrypt_.md)

# External module: "util-crypto/src/nacl/decrypt"

## Index

### Functions

* [naclDecrypt](_util_crypto_src_nacl_decrypt_.md#nacldecrypt)

---

## Functions

<a id="nacldecrypt"></a>

###  naclDecrypt

▸ **naclDecrypt**(encrypted: *`Uint8Array`*, nonce: *`Uint8Array`*, secret: *`Uint8Array`*):  `Uint8Array` &#124; `null`

*Defined in [util-crypto/src/nacl/decrypt.ts:18](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/nacl/decrypt.ts#L18)*

*__name__*: naclDecrypt

*__signature__*: naclDecrypt (message: Uint8Array, nonce: Uint8Array, secret: Uint8Array): Uint8Array

*__summary__*: Decrypts a message using the supplied secretKey and nonce

*__description__*: Returns an decrypted message, using the `secret` and `nonce`.

*__example__*: import { naclDecrypt } from '@polkadot/util-crypto';

naclDecrypt(\[...\], \[...\], \[...\]) // => \[...\]

**Parameters:**

| Param | Type |
| ------ | ------ |
| encrypted | `Uint8Array` |
| nonce | `Uint8Array` |
| secret | `Uint8Array` |

**Returns:**  `Uint8Array` &#124; `null`

___

