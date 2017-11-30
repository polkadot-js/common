# u8a

Utility methods to convert to and from `Uint8Array` objects 

- [u8aFromBuffer](#u8afrombuffer) Creates a Uint8Array value from a Buffer object. [buffer.md#buffertou8a](alias bufferToU8a)
- [u8aToBuffer](#u8atobuffer) Creates a Buffer object from a hex string.

## u8aFromBuffer

Creates a Uint8Array value from a Buffer object. [buffer.md#buffertou8a](alias bufferToU8a)

```js
u8aFromBuffer (value?: Buffer): number
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