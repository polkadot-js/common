# blake2

Create blake2b values with specified bitlengths 

- [blake2AsHex](#blake2ashex) Creates a blake2b hex from the input.
- [blake2AsU8a](#blake2asu8a) Creates a blake2b u8a from the input.

## blake2AsHex

Creates a blake2b hex from the input. 

```js
blake2AsHex (data: Uint8Array, bitLenght: number = 256): string
```


From a `Uint8Array` input, create the blake2b and return the result as a hex string with the specified `bitLength`.

```js
import { blake2AsHex } from '@polkadot/util-crypto';

blake2AsHex('abc') // => 0xba80a53f981c4d0d
```

## blake2AsU8a

Creates a blake2b u8a from the input. 

```js
blake2AsU8a (data: Uint8Array, bitLenght: number = 256): Uint8Array
```


From a `Uint8Array` input, create the blake2b and return the result as a u8a with the specified `bitLength`.

```js
import { blake2AsU8a } from '@polkadot/util-crypto';

blake2AsU8a('abc') // => [0xba, 0x80, 0xa53, 0xf98, 0x1c, 0x4d, 0x0d]
```