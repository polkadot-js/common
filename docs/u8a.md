# u8a

Utility methods to convert to and from `Uint8Array` objects 

- [u8aFromBuffer](#u8afrombuffer) Creates a Uint8Array value from a Buffer object.
- [u8aToBuffer](#u8atobuffer) Creates a Buffer object from a hex string.

## u8aFromBuffer

Creates a Uint8Array value from a Buffer object.

```js
u8aFromBuffer (value?: Buffer): string
```


`null` inputs returns an empty result, `Buffer` values return the actual value as a `Uint8Array`. Anything that is not a `Buffer` object throws an error.

```js
import { u8aFromBuffer } from '@polkadot/util';

u8aFromBuffer(Buffer.from([1, 2, 3]));
```

## u8aToBuffer

Creates a Buffer object from a hex string.

```js
u8aToBuffer (value?: UInt8Array): Buffer
```


`null` inputs returns an empty `Buffer` result. `UInt8Array` input values return the actual bytes value converted to a `Buffer`. Anything that is not a `UInt8Array` throws an error.

```js
import { u8aToBuffer } from '@polkadot/util';

console.log('Buffer', u8aToBuffer('0x123480001f'));
```