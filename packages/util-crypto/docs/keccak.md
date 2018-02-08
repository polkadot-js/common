# keccak

Create Keccak256 values as hex, string, Buffer & Uint8Array output 

- [keccakAsBuffer](#keccakasbuffer) Creates a keccak Buffer from the input.
- [keccakAsHex](#keccakashex) Creates a keccak hex string from the input.
- [keccakAsString](#keccakasstring) Creates a keccak string from the input.
- [keccakAsU8a](#keccakasu8a) Creates a keccak Uint8Array from the input.

## keccakAsBuffer

Creates a keccak Buffer from the input. 

```js
keccakAsBuffer (value: Buffer | Uint8Array | string): Buffer
```


From either a `string` or a `Buffer` input, create the keccak and return the result as a `Buffer`.

```js
import { keccakAsBuffer } from '@polkadot/util-crypto';

console.log('asBuffer', keccakAsBuffer('123')) // => Buffer
```

## keccakAsHex

Creates a keccak hex string from the input. 

```js
keccakAsHex (value: Buffer | Uint8Array | string): string
```


From either a `string` or a `Buffer` input, create the keccak and return the result as a `0x` prefixed hex string.

```js
import { keccakAsHex } from '@polkadot/util-crypto';

console.log('asHex', keccakAsHex('123')) // => 0x...
```

## keccakAsString

Creates a keccak string from the input. 

```js
keccakAsString (value: Buffer | Uint8Array | string): string
```


From either a `string` or a `Buffer` input, create the keccak and return the result as a non-prefixed string.

```js
import { keccakAsString } from '@polkadot/util-crypto';

console.log('asString', keccakAsString('123')) // => string
```

## keccakAsU8a

Creates a keccak Uint8Array from the input. 

```js
keccakAsU8a (value: Buffer | Uint8Array | string): Uint8Array
```


From either a `string` or a `Buffer` input, create the keccak and return the result as a `Uint8Array`.

```js
import { keccakAsU8a } from '@polkadot/util-crypto';

keccakAsU8a('123') // => Uint8Array
```