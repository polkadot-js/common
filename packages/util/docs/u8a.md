# u8a

Utility methods to convert to and from `Uint8Array` objects 

- [u8aFromBuffer](#u8afrombuffer) Creates a Uint8Array value from a Buffer object.
- [u8aFromHex](#u8afromhex) Creates a Uint8Array value from a hex string.
- [u8aFromString](#u8afromstring) Creates a Uint8Array object from a string.
- [u8aFromUtf8](#u8afromutf8) Creates a Uint8Array object from a utf-8 string.
- [u8aToBuffer](#u8atobuffer) Creates a Buffer object from a hex string.
- [u8aToHex](#u8atohex) Creates a hex-8 string from a Uint8Array object.
- [u8aToUtf8](#u8atoutf8) Creates a utf-8 string from a Uint8Array object.

## u8aFromBuffer

Creates a Uint8Array value from a Buffer object. [(alias of bufferToU8a)](buffer.md#buffertou8a)

```js
u8aFromBuffer (value?: Buffer): Uint8Array
```





## u8aFromHex

Creates a Uint8Array value from a hex string. [(alias of hexToU8a)](hex.md#hextou8a)

```js
u8aFromHex (value?: string): Uint8Array
```





## u8aFromString

Creates a Uint8Array object from a string. 

```js
u8aFromString (value: string): UInt8Array
```


String input values return the actual encoded `UInt8Array`.

```js
import { u8aFromString } from '@polkadot/util';

u8aFromString('hello'); // [0x68, 0x65, 0x6c, 0x6c, 0x6f]
```

## u8aFromUtf8

Creates a Uint8Array object from a utf-8 string. 

```js
u8aFromUtf8 (value?: string): UInt8Array
```


String input values return the actual encoded `UInt8Array`. `null` or `undefined` values returns an empty encoded array.

```js
import { u8aFromUtf8 } from '@polkadot/util';

u8aFromUtf8('hello'); // [0x68, 0x65, 0x6c, 0x6c, 0x6f]
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

## u8aToHex

Creates a hex-8 string from a Uint8Array object. 

```js
u8aToHex (value?: UInt8Array): string
```


`UInt8Array` input values return the actual hex string. `null` or `undefined` values returns an `0x` string.

```js
import { u8aToHex\ } from '@polkadot/util';

u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0xf])); // 0x68656c0f
```

## u8aToUtf8

Creates a utf-8 string from a Uint8Array object. 

```js
u8aToUtf8 (value?: UInt8Array): string
```


`UInt8Array` input values return the actual decoded utf-8 string. `null` or `undefined` values returns an empty string.

```js
import { u8aToUtf8 } from '@polkadot/util';

u8aToUtf8(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f])); // hello
```