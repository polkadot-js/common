[@polkadot/util](../README.md) > ["util-crypto/src/nacl/keypair/fromString"](../modules/_util_crypto_src_nacl_keypair_fromstring_.md)

# External module: "util-crypto/src/nacl/keypair/fromString"

## Index

### Functions

* [naclKeypairFromString](_util_crypto_src_nacl_keypair_fromstring_.md#naclkeypairfromstring)

---

## Functions

<a id="naclkeypairfromstring"></a>

###  naclKeypairFromString

▸ **naclKeypairFromString**(value: *`string`*): `KeypairType`

*Defined in [util-crypto/src/nacl/keypair/fromString.ts:23](https://github.com/polkadot-js/util/blob/7550b44/packages/util-crypto/src/nacl/keypair/fromString.ts#L23)*

*__name__*: naclKeypairFromString

*__signature__*: naclKeypairFromString (value: string): { secretKey: Uint8Array, publicKey: Uint8Array }

*__summary__*: Creates a new public/secret keypair from a string.

*__description__*: Returns a object containing a `publicKey` & `secretKey` generated from the supplied string. The string is hashed and the value used as the input seed.

*__example__*: import { naclKeypairFromString } from '@polkadot/util-crypto';

naclKeypairFromString('test') // => { secretKey: \[...\], publicKey: \[...\] }

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `string` |

**Returns:** `KeypairType`

___

