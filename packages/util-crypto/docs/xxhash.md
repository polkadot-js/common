# xxhash

Create [XXHash](http://cyan4973.github.io/xxHash/) values as BN, hex & number output 

- [xxhashAsBn](#xxhashasbn) Creates a xxhash BN from the input.
- [xxhashAsHex](#xxhashashex) Creates a xxhash hex from the input.
- [xxhashAsNumber](#xxhashasnumber) Creates a xxhash number from the input.

## xxhashAsBn

Creates a xxhash BN from the input. 

```js
xxhashAsBn (data: Buffer | Uint8Array | string, seed: number): BN
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a BN.

```js
import { xxhashAsNumber } from '@polkadot/util-crypto';

xxhashAsBn('abcd', 0xabcd)) // => new BN(0xcda8fae4)
```

## xxhashAsHex

Creates a xxhash hex from the input. 

```js
xxhashAsHex (data: Buffer | Uint8Array | string, seed: number): string
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a hex string.

```js
import { xxhashAsHex } from '@polkadot/util-crypto';

xxhashAsHex('abcd', 0xabcd)) // => 0xcda8fae4
```

## xxhashAsNumber

Creates a xxhash number from the input. 

```js
xxhashAsNumber (data: Buffer | Uint8Array | string, seed: number): number
```


From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a number.

```js
import { xxhashAsNumber } from '@polkadot/util-crypto';

xxhashAsNumber('abcd', 0xabcd)) // => 0xcda8fae4
```