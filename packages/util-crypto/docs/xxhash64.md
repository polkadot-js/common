# xxhash64

Create [XXHash](http://cyan4973.github.io/xxHash/) values as BN, hex & number output 

- [xxhash64AsBn](#xxhash64asbn) Creates a xxhash BN from the input.
- [xxhash64AsHex](#xxhash64ashex) Creates a xxhash hex from the input.
- [xxhash64AsRaw](#xxhash64asraw) Creates a xxhash non-prefixed hex from the input.

## xxhash64AsBn

Creates a xxhash BN from the input. 

```js
xxhash64AsBn (data: Buffer | Uint8Array | string, seed: number): BN
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a BN.

```js
import { xxhash64AsNumber } from '@polkadot/util-crypto';

xxhash64AsBn('abcd', 0xabcd)) // => new BN(0xe29f70f8b8c96df7)
```

## xxhash64AsHex

Creates a xxhash hex from the input. 

```js
xxhash64AsHex (data: Buffer | Uint8Array | string, seed: number): string
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a hex string.

```js
import { xxhash64AsHex } from '@polkadot/util-crypto';

xxhash64AsHex('abcd', 0xabcd)) // => 0xe29f70f8b8c96df7
```

## xxhash64AsRaw

Creates a xxhash non-prefixed hex from the input. 

```js
xxhash64AsRaw (data: Buffer | Uint8Array | string, seed: number): string
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a non-prefixed hex string.

```js
import { xxhash64AsRaw } from '@polkadot/util-crypto';

xxhash64AsRaw('abcd', 0xabcd)) // => e29f70f8b8c96df7
```