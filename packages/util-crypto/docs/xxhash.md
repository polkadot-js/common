# xxhash

Create xxhash64 values with specified bitlengths 

- [xxhashAsHex](#xxhashashex) Creates a xxhash64 hex from the input.
- [xxhashAsHex128](#xxhashashex128) Creates a xxhash64 hex with 128-bits from the input.
- [xxhashAsHex256](#xxhashashex256) Creates a xxhash64 hex with 256-bits from the input.

## xxhashAsHex

Creates a xxhash64 hex from the input. 

```js
xxhashAsHex (data: Buffer | Uint8Array | string, bitLenght: number = 64): string
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a hex string with the specified `bitLength`.

```js
import { xxhashAsHex } from '@polkadot/util-crypto';

xxhashAsHex('abc')) // => 0x44bc2cf5ad770999
```

## xxhashAsHex128

Creates a xxhash64 hex with 128-bits from the input. 

```js
xxhashAsHex128 (data: Buffer | Uint8Array | string): string
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a hex string with 128 bits.

```js
import { xxhashAsHex128 } from '@polkadot/util-crypto';

xxhashAsHex128('abc')) // => 0x44bc2cf5ad770999
```

## xxhashAsHex256

Creates a xxhash64 hex with 256-bits from the input. 

```js
xxhashAsHex256 (data: Buffer | Uint8Array | string): string
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a hex string with 256 bits.

```js
import { xxhashAsHex256 } from '@polkadot/util-crypto';

xxhashAsHex256('abc')) // => 0x44bc2cf5ad770999bea9ca8199328908
```