# hex

Internal utilities to create and test for hex values 

- [hexAddPrefix](#hexaddprefix) Adds the `0x` prefix to string values.
- [hexFromBn](#hexfrombn) Creates a hex value from a BN.js bignumber object. [bn.md#bntohex](alias bnToHex)
- [hexHasPrefix](#hexhasprefix) Tests for the existence of a `0x` prefix.
- [hexStripPrefix](#hexstripprefix) Strips any leading `0x` prefix.
- [hexToBn](#hextobn) Creates a BN.js bignumber object from a hex string.

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

## hexFromBn

Creates a hex value from a BN.js bignumber object. [bn.md#bntohex](alias bnToHex)

```js
hexFromBn (value?: BN): string
```


`null` inputs returns a `0x` result, BN values return the actual value as a `0x` prefixed hex value. Anything that is not a BN object throws an error.

```js
import BN from 'bn.js';
import { hexFromBn } from '@polkadot/util';

console.log('Hex value', hexFromBn(new BN(0x123456)); // '0x123456'
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

console.log('BN object', hexToBn('0x123480001f'));
```