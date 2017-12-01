# buffer

Utility methods to convert to and from `Buffer` objects 

- [bufferFromHex](#bufferfromhex) Creates a Buffer object from a hex string.
- [bufferFromNumber](#bufferfromnumber) Creates a Buffer object from a number.
- [bufferFromU8a](#bufferfromu8a) Creates a Buffer object from a Uint8Array.
- [bufferToHex](#buffertohex) Creates a hex value from a Buffer object.
- [bufferToNumber](#buffertonumber) Creates a Number value from a Buffer object.
- [bufferToU8a](#buffertou8a) Creates a Uint8Array value from a Buffer object.

## bufferFromHex

Creates a Buffer object from a hex string. [(alias of hexToBuffer)](hex.md#hextobuffer)

```js
bufferFromHex (value?: string): Buffer
```





## bufferFromNumber

Creates a Buffer object from a number. [(alias of numberToBuffer)](number.md#numbertobuffer)

```js
bufferFromNumber (value?: number): Buffer
```





## bufferFromU8a

Creates a Buffer object from a Uint8Array. [(alias of u8aToBuffer)](u8a.md#u8atobuffer)

```js
bufferFromU8a (value?: string): Buffer
```





## bufferToHex

Creates a hex value from a Buffer object. 

```js
bufferToHex (value?: Buffer): string
```


`null` inputs returns a `0x` result, `Buffer` values return the actual value as a `0x` prefixed hex value. Anything that is not a `Buffer` object throws an error.

```js
import { bufferToHex } from '@polkadot/util';

console.log('Hex value', bufferToHex(Buffer.from([1, 2, 3]));
```

## bufferToNumber

Creates a Number value from a Buffer object. 

```js
bufferToNumber (value?: Buffer): number
```


`null` inputs returns an NaN result, `Buffer` values return the actual value as a `Number`.

```js
import { bufferToNumber } from '@polkadot/util';

bufferToNumber(Buffer.from([12, 34, 56])); // => 0x123456
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