# keccak

Create Keccak256 values as hex, string, Buffer & Uint8Array output 

- [keccakAsHex](#keccakashex) Creates a keccak hex string from the input.
- [keccakAsU8a](#keccakasu8a) Creates a keccak Uint8Array from the input.

## keccakAsHex

Creates a keccak hex string from the input. 

```js
keccakAsHex (value: Buffer | Uint8Array | string): string
```


From either a `string` or a `Buffer` input, create the keccak and return the result as a `0x` prefixed hex string.

```js
import { keccakAsHex } from '@polkadot/util-crypto';

keccakAsHex('123') // => 0x...
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