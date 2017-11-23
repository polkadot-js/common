# keccak

Create Keccak256 values as hex, string & buffer output 

- [keccakAsBuffer](#keccakasbuffer) Creates a keccak Buffer from the input.
- [keccakAsHex](#keccakashex) Creates a keccak hex string from the input.
- [keccakAsString](#keccakasstring) Creates a keccak string from the input.

## keccakAsBuffer

Creates a keccak Buffer from the input.

```js
keccakAsBuffer (value: Buffer | string): Buffer
```


From either a `string` or a `Buffer` input, create the keccak and return the result as a `Buffer`.

```js
import { keccakAsBuffer } from '@polkadot/util';

console.log('asBuffer', keccakAsBuffer('123')) // => Buffer
```

## keccakAsHex

Creates a keccak hex string from the input.

```js
keccakAsHex (value: Buffer | string): string
```


From either a `string` or a `Buffer` input, create the keccak and return the result as a `0x` prefixed hex string.

```js
import { keccakAsHex } from '@polkadot/util';

console.log('asHex', keccakAsHex('123')) // => 0x...
```

## keccakAsString

Creates a keccak string from the input.

```js
keccakAsString (value: Buffer | string): string
```


From either a `string` or a `Buffer` input, create the keccak and return the result as a non-prefixed string.

```js
import { keccakAsString } from '@polkadot/util';

console.log('asString', keccakAsString('123')) // => string
```