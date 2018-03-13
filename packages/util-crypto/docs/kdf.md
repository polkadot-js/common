# kdf

Create Keys for use in encryption (rounds & salt) based on inputs 

- [kdfAsU8a](#kdfasu8a) Create Uint8Array key based on inputs

## kdfAsU8a

Create Uint8Array key based on inputs 

```js
kdfAsU8a (secret: Uint8Array | string, rounds?: number, salt?: Uint8Array): { key: Uint8Array, rounds: number, salt: Uint8Array }
```


From either a `string` or a `Uint8Array` input, create a key with an optional (or random) salt based on the number of rounds with Blake2. Return return the result key as a `Uint8Array` in addition to the salt used and rounds employed.

```js
import { kdfAsU8a } from '@polkadot/util-crypto';

kdfAsU8a('123') // => { key: Uint8Array, rounds: number, salt: Uint8Array }
```