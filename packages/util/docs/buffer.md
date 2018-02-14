# buffer

Utility methods to convert to and from `Buffer` objects 

- [bufferFromU8a](#bufferfromu8a) Creates a Buffer object from a Uint8Array.
- [bufferToU8a](#buffertou8a) Creates a Uint8Array value from a Buffer object.

## bufferFromU8a

Creates a Buffer object from a Uint8Array. [(alias of u8aToBuffer)](u8a.md#u8atobuffer)

```js
bufferFromU8a (value?: string): Buffer
```





## bufferToU8a

Creates a Uint8Array value from a Buffer object. 

```js
bufferToU8a (value?: Buffer): string
```


`null` inputs returns an empty result, `Buffer` values return the actual value as a `Uint8Array`. Anything that is not a `Buffer` object throws an error.

```js
import { bufferToU8a } from '@polkadot/util';

bufferToU8a(Buffer.from([1, 2, 3]));
```