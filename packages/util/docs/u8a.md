# u8a

Utility methods to convert to and from `Uint8Array` objects 

- [u8aConcat](#u8aconcat) Creates a concatenated Uint8Array from the inputs.
- [u8aFixLength](#u8afixlength) Shifts a Uint8Array to a specific bitLength
- [u8aFromBn](#u8afrombn) Creates a Uint8Array value from a BN object.
- [u8aFromBuffer](#u8afrombuffer) Creates a Uint8Array value from a Buffer object.
- [u8aFromHex](#u8afromhex) Creates a Uint8Array value from a hex string.
- [u8aFromString](#u8afromstring) Creates a Uint8Array object from a string.
- [u8aFromUtf8](#u8afromutf8) Creates a Uint8Array object from a utf-8 string.
- [u8aToBn](#u8atobn) Creates a BN from a Uint8Array object.
- [u8aToBuffer](#u8atobuffer) Creates a Buffer object from a hex string.
- [u8aToHex](#u8atohex) Creates a hex string from a Uint8Array object.
- [u8aToString](#u8atostring) Creates a string from a Uint8Array object.
- [u8aToUtf8](#u8atoutf8) Creates a utf-8 string from a Uint8Array object.

## u8aConcat

Creates a concatenated Uint8Array from the inputs. 

```js
u8aConcat (values: Array<Uint8Array>): Uint8Array
```


Concatenates the input arrays into a single `UInt8Array`.

```js
import { u8aConcat } from '@polkadot/util';

u8aConcat([
new Uint8Array([1, 2, 3]),
new Uint8Array([4, 5, 6])
]); // [1, 2, 3, 4, 5, 6]
```

## u8aFixLength

Shifts a Uint8Array to a specific bitLength 

```js
u8aFixLength (value: string, bitLength: number = -1, withPadding: boolean = false): string
```


Returns a uint8Array with the specified number of bits contained in the return value. (If bitLength is -1, length checking is not done). Values with more bits are trimmed to the specified length.

```js
import { u8aFixLength } from '@polkadot/util';

u8aFixLength('0x12') // => 0x12
u8aFixLength('0x12', 16) // => 0x0012
u8aFixLength('0x1234', 8) // => 0x12
```

## u8aFromBn

Creates a Uint8Array value from a BN object. [(alias of bnToU8a)](bn.md#bntou8a)

```js
u8aFromBn (value?: BN): Uint8Array
```





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

## u8aToBn

Creates a BN from a Uint8Array object. 

```js
u8aToHex (value?: Uint8Array, isLe: boolean = false): BN
```


`UInt8Array` input values return the actual BN. `null` or `undefined` values returns an `0x0` value.

```js
import { u8aToBn } from '@polkadot/util';

u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0xf])); // 0x68656c0f
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

Creates a hex string from a Uint8Array object. 

```js
u8aToHex (value?: UInt8Array): string
```


`UInt8Array` input values return the actual hex string. `null` or `undefined` values returns an `0x` string.

```js
import { u8aToHex } from '@polkadot/util';

u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0xf])); // 0x68656c0f
```

## u8aToString

Creates a string from a Uint8Array object. 

```js
u8aToString (value?: UInt8Array): string
```


`UInt8Array` input values return the actual decoded string. `null` or `undefined` values returns an empty string.

```js
import { u8aToString } from '@polkadot/util';

u8aToString(new Uint8Array([21,23,45,67])); // 21,23,45,67
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