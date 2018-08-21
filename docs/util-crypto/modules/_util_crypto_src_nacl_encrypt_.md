[@polkadot/util](../README.md) > ["util-crypto/src/nacl/encrypt"](../modules/_util_crypto_src_nacl_encrypt_.md)

# External module: "util-crypto/src/nacl/encrypt"

## Index

### Type aliases

* [Encrypted](_util_crypto_src_nacl_encrypt_.md#encrypted)

### Functions

* [naclEncrypt](_util_crypto_src_nacl_encrypt_.md#naclencrypt)

---

## Type aliases

<a id="encrypted"></a>

###  Encrypted

**ΤEncrypted**: *`object`*

*Defined in [util-crypto/src/nacl/encrypt.ts:9](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/nacl/encrypt.ts#L9)*

#### Type declaration

 encrypted: `Uint8Array`

 nonce: `Uint8Array`

___

## Functions

<a id="naclencrypt"></a>

###  naclEncrypt

▸ **naclEncrypt**(message: *`Uint8Array`*, secret: *`Uint8Array`*, nonce?: *`Uint8Array`*): [Encrypted](_util_crypto_src_nacl_encrypt_.md#encrypted)

*Defined in [util-crypto/src/nacl/encrypt.ts:25](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/nacl/encrypt.ts#L25)*

*__name__*: naclEncrypt

*__signature__*: naclEncrypt (message: Uint8Array, secret: Uint8Array, nonce?: Uint8Array): { encrypted: Uint8Array, nonce: Uint8Array }

*__summary__*: Encrypts a message using the supplied secretKey and nonce

*__description__*: Returns an encrypted message, using the `secretKey` and `nonce`. If the `nonce` was not supplied, a random value is generated.

*__example__*: import { naclEncrypt } from '@polkadot/util-crypto';

naclSign(\[...\], \[...\]) // => \[...\]

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| message | `Uint8Array` | - |
| secret | `Uint8Array` | - |
| `Default value` nonce | `Uint8Array` |  randomAsU8a(24) |

**Returns:** [Encrypted](_util_crypto_src_nacl_encrypt_.md#encrypted)

___

