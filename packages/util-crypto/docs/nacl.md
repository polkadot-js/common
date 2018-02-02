# nacl

Implements [NaCl](http://nacl.cr.yp.to/) secret-key authenticated encryption, public-key authenticated encryption, hashing, and public-key signatures 

- [naclKeypair](#naclkeypair) Creates a new public/secret keypair.
- [naclKeypairFromSecret](#naclkeypairfromsecret) Creates a new public/secret keypair from a secret.
- [naclKeypairFromSeed](#naclkeypairfromseed) Creates a new public/secret keypair from a seed.
- [naclSign](#naclsign) Signs a message using the supplied secretKey
- [naclSign](#naclsign) Verifies the signature on the supplied message.

## naclKeypair

Creates a new public/secret keypair. 

```js
naclKeypair (): { secretKey: Uint8Array, publicKey: Uint8Array }
```


Returns a new generate object containing a `publicKey` & `secretKey`.

```js
import { naclKeypair } from '@polkadot/util-crypto';

naclKeypair() // => { secretKey: [...], publicKey: [...] }
```

## naclKeypairFromSecret

Creates a new public/secret keypair from a secret. 

```js
naclKeypairFromSecret (secret: Uint8Array | string): { secretKey: Uint8Array, publicKey: Uint8Array }
```


Returns a object containing a `publicKey` & `secretKey` generated from the supplied secret.

```js
import { naclKeypairFromSecret } from '@polkadot/util-crypto';

naclKeypairFromSecret(...) // => { secretKey: [...], publicKey: [...] }
```

## naclKeypairFromSeed

Creates a new public/secret keypair from a seed. 

```js
naclKeypairFromSeed (seed: Uint8Array | string): { secretKey: Uint8Array, publicKey: Uint8Array }
```


Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed. Seed can be a `Uint8Array`, a hex string or a string of bytes.

```js
import { naclKeypairFromSeed } from '@polkadot/util-crypto';

naclKeypairFromSeed(...) // => { secretKey: [...], publicKey: [...] }
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