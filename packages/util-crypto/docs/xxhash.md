# xxhash

Create xxhash64 values with specified bitlengths 

- [xxhashAsHex](#xxhashashex) Creates a xxhash64 hex from the input.
- [xxhashAsU8a](#xxhashasu8a) Creates a xxhash64 u8a from the input.

## xxhashAsHex

Creates a xxhash64 hex from the input. 

```js
xxhashAsHex (data: Buffer | Uint8Array | string, bitLenght: number = 64): string
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a hex string with the specified `bitLength`.

```js
import { xxhashAsHex } from '@polkadot/util-crypto';

xxhashAsHex('abc') // => 0x44bc2cf5ad770999
```

## xxhashAsU8a

Creates a xxhash64 u8a from the input. 

```js
xxhashAsU8a (data: Buffer | Uint8Array | string, bitLenght: number = 64): Uint8Array
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a `Uint8Array` with the specified `bitLength`.

```js
import { xxhashAsU8a } from '@polkadot/util-crypto';

xxhashAsU8a('abc') // => 0x44bc2cf5ad770999
```