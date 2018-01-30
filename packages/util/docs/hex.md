# hex

Internal utilities to create and test for hex values 

- [hexAddPrefix](#hexaddprefix) Adds the `0x` prefix to string values.
- [hexFixLength](#hexfixlength) Shifts a hex string to a specific bitLength
- [hexFromBn](#hexfrombn) Creates a hex value from a BN.js bignumber object.
- [hexFromBuffer](#hexfrombuffer) Creates a hex value from a Buffer object.
- [hexFromNumber](#hexfromnumber) Creates a hex value from a number.
- [hexHasPrefix](#hexhasprefix) Tests for the existence of a `0x` prefix.
- [hexStripPrefix](#hexstripprefix) Strips any leading `0x` prefix.
- [hexToBn](#hextobn) Creates a BN.js bignumber object from a hex string.
- [hexToBuffer](#hextobuffer) Creates a Buffer object from a hex string.
- [hexToNumber](#hextonumber) Creates a Number value from a Buffer object.
- [hexToU8a](#hextou8a) Creates a Buffer object from a hex string.

## hexAddPrefix

Adds the `0x` prefix to string values. 

```js
hexAddPrefix (value: ?string): string
```


Returns a `0x` prefixed string from the input value. If the input is already prefixed, it is returned unchanged.

```js
import { hexAddPrefix } from '@polkadot/util';

console.log('With prefix', hexAddPrefix('0a0b12')) // => 0x0a0b12
```

## hexFixLength

Shifts a hex string to a specific bitLength 

```js
hexFixLength (value: string, bitLength: number = -1, withPadding: boolean = false): string
```


Returns a `0x` prefixed string with the specified number of bits contained in the return value. (If bitLength is -1, length checking is not done). Values with more bits are trimmed to the specified length. Input values with less bits are returned as-is by default. When `withPadding` is set, shorter val;ues are padded with `0`.

```js
import { hexFixLength } from '@polkadot/util';

console.log('fixed', hexFixLength('0x12', 16)) // => 0x12
console.log('fixed', hexFixLength('0x12', 16, true)) // => 0x0012
console.log('fixed', hexFixLength('0x0012', 8)) // => 0x12
```

## hexFromBn

Creates a hex value from a BN.js bignumber object. [(alias of bnToHex)](bn.md#bntohex)

```js
hexFromBn (value?: BN): string
```





## hexFromBuffer

Creates a hex value from a Buffer object. [(alias of bufferToHex)](buffer.md#buffertohex)

```js
hexFromBuffer (value?: Buffer): string
```





## hexFromNumber

Creates a hex value from a number. [(alias of numberToHex)](number.md#numbertohex)

```js
hexFromNumber (value?: number): string
```





## hexHasPrefix

Tests for the existence of a `0x` prefix. 

```js
hexHasPrefix (value: ?string): boolean
```


Checks for a valid hex input value and if the start matched `0x`

```js
import { hexHasPrefix } from '@polkadot/util';

console.log('has prefix', hexHasPrefix('0x1234')); // => true
```

## hexStripPrefix

Strips any leading `0x` prefix. 

```js
hexStripPrefix (value: ?string): string
```


Tests for the existence of a `0x` prefix, and returns the value without the prefix. Un-prefixed values are returned as-is.

```js
import { hexStripPrefix } from '@polkadot/util';

console.log('stripped', hexStripPrefix('0x1234')); // => 1234
```

## hexToBn

Creates a BN.js bignumber object from a hex string. 

```js
hexToBn (value?: string): BN
```


`null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.

```js
import { hexToBn } from '@polkadot/util';

hexToBn('0x123480001f'); // => BN(0x123480001f)
```

## hexToBuffer

Creates a Buffer object from a hex string. 

```js
hexToBuffer (value?: string): Buffer
```


`null` inputs returns an empty `Buffer` result. Hex input values return the actual bytes value converted to a Buffer. Anything that is not a hex string (including the `0x` prefix) throws an error.

```js
import { hexToBuffer } from '@polkadot/util';

hexToBuffer('0x123480001f'); // Buffer([0x12, 0x34, 0x80, 0x00, 0x1f])
```

## hexToNumber

Creates a Number value from a Buffer object. 

```js
hexToNumber (value?: string): number
```


`null` inputs returns an NaN result, `hex` values return the actual value as a `Number`.

```js
import { hexToNumber } from '@polkadot/util';

hexToNumber('0x1234'); // => 0x1234
```

## hexToU8a

Creates a Buffer object from a hex string. 

```js
hexToU8a (value?: string): Uint8Array
```


`null` inputs returns an empty `Uint8Array` result. Hex input values return the actual bytes value converted to a Uint8Array. Anything that is not a hex string (including the `0x` prefix) throws an error.

```js
import { hexToU8a } from '@polkadot/util';

hexToU8a('0x123480001f'); // Uint8Array([0x12, 0x34, 0x80, 0x00, 0x1f])
```