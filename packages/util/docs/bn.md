# bn

Utility methods to convert to and from `BN` objects 

- [bnFromHex](#bnfromhex) Creates a BN.js bignumber object from a hex string.
- [bnToHex](#bntohex) Creates a hex value from a BN.js bignumber object.
- [bnToU8a](#bntou8a) Creates a Uint8Array object from a BN.

## bnFromHex

Creates a BN.js bignumber object from a hex string. [(alias of hexToBn)](hex.md#hextobn)

```js
bnFromHex (value?: string): BN
```





## bnToHex

Creates a hex value from a BN.js bignumber object. 

```js
bnToHex (value?: BN, bitLength: number = -1): string
```


`null` inputs returns a `0x` result, BN values return the actual value as a `0x` prefixed hex value. Anything that is not a BN object throws an error. With `bitLength` set, it fixes the number to the specified length.

```js
import BN from 'bn.js';
import { bnToHex } from '@polkadot/util';

bnToHex(new BN(0x123456)); // => '0x123456'
```

## bnToU8a

Creates a Uint8Array object from a BN. 

```js
bnToU8a (value?: BN): Uint8Array
```


`null`/`undefined`/`NaN` inputs returns an empty `Uint8Array` result. `BN` input values return the actual bytes value converted to a `Uint8Array`.

```js
import { bnToU8a } from '@polkadot/util';

bnToU8a(new BN(0x1234)); // => [0x12, 0x34]
```