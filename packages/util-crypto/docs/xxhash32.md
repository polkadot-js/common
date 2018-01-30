# xxhash32

Create [XXHash](http://cyan4973.github.io/xxHash/) values as BN, hex & number output 

- [xxhash32AsBn](#xxhash32asbn) Creates a xxhash BN from the input.
- [xxhash32AsHex](#xxhash32ashex) Creates a xxhash hex from the input.
- [xxhash32AsRaw](#xxhash32asraw) Creates a xxhash non-prefixed hex from the input.

## xxhash32AsBn

Creates a xxhash BN from the input. 

```js
xxhash32AsBn (data: Buffer | Uint8Array | string, seed: number): BN
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a BN.

```js
import { xxhash32AsNumber } from '@polkadot/util-crypto';

xxhash32AsBn('abcd', 0xabcd)) // => new BN(0xcda8fae4)
```

## xxhash32AsHex

Creates a xxhash hex from the input. 

```js
xxhash32AsHex (data: Buffer | Uint8Array | string, seed: number): string
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a hex string.

```js
import { xxhash32AsHex } from '@polkadot/util-crypto';

xxhash32AsHex('abcd', 0xabcd)) // => 0xcda8fae4
```

## xxhash32AsRaw

Creates a xxhash non-prefixed hex from the input. 

```js
xxhash32AsRaw (data: Buffer | Uint8Array | string, seed: number): string
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a non-prefixed hex string.

```js
import { xxhash32AsRaw } from '@polkadot/util-crypto';

xxhash32AsRaw('abcd', 0xabcd)) // => cda8fae4
```