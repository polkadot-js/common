# nacl

Implements [NaCl](http://nacl.cr.yp.to/) secret-key authenticated encryption, public-key authenticated encryption, hashing, and public-key signatures 

- [naclDecrypt](#nacldecrypt) Decrypts a message using the supplied secretKey and nonce
- [naclEncrypt](#naclencrypt) Encrypts a message using the supplied secretKey and nonce
- [naclSign](#naclsign) Signs a message using the supplied secretKey
- [naclSign](#naclsign) Verifies the signature on the supplied message.

## naclDecrypt

Decrypts a message using the supplied secretKey and nonce 

```js
naclDecrypt (message: Uint8Array, secretKey: Uint8Array, nonce: Uint8Array): Uint8Array
```


Returns an decrypted message, using the `secretKey` and `nonce`.

```js
import { naclDecrypt } from '@polkadot/util-crypto';

naclDecrypt([...], [...], [...]) // => [...]
```

## naclEncrypt

Encrypts a message using the supplied secretKey and nonce 

```js
naclEncrypt (message: Uint8Array, secretKey: Uint8Array, nonce?: Uint8Array): { encrypted: Uint8Array, nonce: Uint8Array }
```


Returns an encrypted message, using the `secretKey` and `nonce`. If the `nonce` was not supplied, a random value is generated.

```js
import { naclEncrypt } from '@polkadot/util-crypto';

naclSign([...], [...]) // => [...]
```

## naclSign

Signs a message using the supplied secretKey 

```js
naclSign (message: Uint8Array, secretKey: Uint8Array): Uint8Array
```


Returns message signature of `message`, using the `secretKey`.

```js
import { naclSign } from '@polkadot/util-crypto';

naclSign([...], [...]) // => [...]
```

## naclSign

Verifies the signature on the supplied message. 

```js
naclVerify (message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array): boolean
```


Verifies the `signature` on `message` with the supplied `plublicKey`. Returns `true` on sucess, `false` otherwise.

```js
import { naclVerify } from '@polkadot/util-crypto';

naclVerify([...], [...], [...]) // => true/false
```