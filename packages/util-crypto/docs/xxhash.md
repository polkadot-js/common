# xxhash

Create xxhash64 values with specified bitlengths 

- [xxhashAsHex](#xxhashashex) Creates a xxhash64 hex from the input.
- [xxhashAsHex128](#xxhashashex128) Creates a xxhash64 hex with 128-bits from the input.
- [xxhashAsHex256](#xxhashashex256) Creates a xxhash64 hex with 256-bits from the input.
- [xxhashAsU8a](#xxhashasu8a) Creates a xxhash64 u8a from the input.
- [xxhashAsU8a128](#xxhashasu8a128) Creates a xxhash64 u8a with 128-bits from the input.
- [xxhashAsU8a256](#xxhashasu8a256) Creates a xxhash64 u8a with 256-bits from the input.

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

## xxhashAsHex128

Creates a xxhash64 hex with 128-bits from the input. 

```js
xxhashAsHex128 (data: Buffer | Uint8Array | string): string
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a hex string with 128 bits.

```js
import { xxhashAsHex128 } from '@polkadot/util-crypto';

xxhashAsHex128('abc') // => 0x44bc2cf5ad770999
```

## xxhashAsHex256

Creates a xxhash64 hex with 256-bits from the input. 

```js
xxhashAsHex256 (data: Buffer | Uint8Array | string): string
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a hex string with 256 bits.

```js
import { xxhashAsHex256 } from '@polkadot/util-crypto';

xxhashAsHex256('abc') // => 0x44bc2cf5ad770999bea9ca8199328908
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

## xxhashAsU8a128

Creates a xxhash64 u8a with 128-bits from the input. 

```js
xxhashAsU8a128 (data: Buffer | Uint8Array | string): Uint8Array
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a Uint8Array with 128 bits.

```js
import { xxhashAsU8a128 } from '@polkadot/util-crypto';

xxhashAsU8a128('abc') // => 0x44bc2cf5ad770999
```

## xxhashAsU8a256

Creates a xxhash64 u8a with 256-bits from the input. 

```js
xxhashAsU8a256 (data: Buffer | Uint8Array | string): Uint8Array
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a Uint8Array with 256 bits.

```js
import { xxhashAsU8a256 } from '@polkadot/util-crypto';

xxhashAsU8a256('abc') // => 0x44bc2cf5ad770999
```