# number

Utility methods to convert to and from `number` values 

- [numberFromBuffer](#numberfrombuffer) Creates a Number value from a Buffer object.
- [numberFromHex](#numberfromhex) Creates a Number value from a Buffer object.
- [numberToBuffer](#numbertobuffer) Creates a Buffer object from a number.
- [numberToHex](#numbertohex) Creates a hex value from a number.
- [numberToU8a](#numbertou8a) Creates a Uint8Array object from a number.

## numberFromBuffer

Creates a Number value from a Buffer object. [(alias of bufferToNumber)](buffer.md#buffertonumber)

```js
numberFromBuffer (value?: Buffer): number
```





## numberFromHex

Creates a Number value from a Buffer object. [(alias of hexToNumber)](hex.md#hextonumber)

```js
numberFromHex (value?: Hex): number
```





## numberToBuffer

Creates a Buffer object from a number. 

```js
numberToBuffer (value?: number): Buffer
```


`null`/`undefined`/`NaN` inputs returns an empty `Buffer` result. `number` input values return the actual bytes value converted to a `Buffer`.

```js
import { numberToBuffer } from '@polkadot/util';

const buffer = numberToBuffer(0x1234); // => Buffer.from([0x12, 0x34])
```

## numberToHex

Creates a hex value from a number. 

```js
numberToHex (value?: number): string
```


`null`/`undefined`/`NaN` inputs returns an empty `0x` result. `number` input values return the actual bytes value converted to a `hex`.

```js
import { numberToHex } from '@polkadot/util';

const hex = numberToHex(0x1234); // => '0x1234'
```

## numberToU8a

Creates a Uint8Array object from a number. 

```js
numberToBuffer (value?: number): Uint8Array
```


`null`/`undefined`/`NaN` inputs returns an empty `Uint8Array` result. `number` input values return the actual bytes value converted to a `Uint8Array`.

```js
import { numberToU8a } from '@polkadot/util';

numberToU8a(0x1234); // => [0x12, 0x34]
```