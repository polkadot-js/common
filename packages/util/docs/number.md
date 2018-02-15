# number

Utility methods to convert to and from `number` values 

- [numberFromHex](#numberfromhex) Creates a Number value from a Buffer object.
- [numberToHex](#numbertohex) Creates a hex value from a number.
- [numberToU8a](#numbertou8a) Creates a Uint8Array object from a number.

## numberFromHex

Creates a Number value from a Buffer object. [(alias of hexToNumber)](hex.md#hextonumber)

```js
numberFromHex (value?: Hex): number
```





## numberToHex

Creates a hex value from a number. 

```js
numberToHex (value?: number): string
```


`null`/`undefined`/`NaN` inputs returns an empty `0x` result. `number` input values return the actual bytes value converted to a `hex`. With `bitLength` set, it converts the number to the equivalent size.

```js
import { numberToHex } from '@polkadot/util';

numberToHex(0x1234); // => '0x1234'
numberToHex(0x1234, 32) // => 0x00001234
```

## numberToU8a

Creates a Uint8Array object from a number. 

```js
numberToU8a (value?: number, bitLenght: number = -1): Uint8Array
```


`null`/`undefined`/`NaN` inputs returns an empty `Uint8Array` result. `number` input values return the actual bytes value converted to a `Uint8Array`. With `bitLength`, it converts the value to the equivalent size.

```js
import { numberToU8a } from '@polkadot/util';

numberToU8a(0x1234); // => [0x12, 0x34]
```