[@polkadot/util](../README.md) > ["util-crypto/src/nacl/sign"](../modules/_util_crypto_src_nacl_sign_.md)

# External module: "util-crypto/src/nacl/sign"

## Index

### Functions

* [naclSign](_util_crypto_src_nacl_sign_.md#naclsign)

---

## Functions

<a id="naclsign"></a>

###  naclSign

▸ **naclSign**(message: *`Uint8Array`*, secretKey: *`Uint8Array`*): `Uint8Array`

*Defined in [util-crypto/src/nacl/sign.ts:18](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/nacl/sign.ts#L18)*

*__name__*: naclSign

*__signature__*: naclSign (message: Uint8Array, secretKey: Uint8Array): Uint8Array

*__summary__*: Signs a message using the supplied secretKey

*__description__*: Returns message signature of `message`, using the `secretKey`.

*__example__*: import { naclSign } from '@polkadot/util-crypto';

naclSign(\[...\], \[...\]) // => \[...\]

**Parameters:**

| Param | Type |
| ------ | ------ |
| message | `Uint8Array` |
| secretKey | `Uint8Array` |

**Returns:** `Uint8Array`

___

