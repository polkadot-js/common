# bn

Utility methods to convert to and from `BN` objects 

- [bnFromHex](#bnfromhex) Creates a BN.js bignumber object from a hex string.
- [bnToHex](#bntohex) Creates a hex value from a BN.js bignumber object.

## bnFromHex

Creates a BN.js bignumber object from a hex string.

```js
bnFromHex (value?: string): BN
```


`null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.

```js
import { bnFromHex } from '@polkadot/util';

console.log('BN object', bnFromHex('0x123480001f'));
```

## bnToHex

Creates a hex value from a BN.js bignumber object.

```js
bnToHex (value?: BN): string
```


`null` inputs returns a `0x` result, BN values return the actual value as a `0x` prefixed hex value. Anything that is not a BN object throws an error.

```js
import BN from 'bn.js';
import { bnToHex } from '@polkadot/util';

console.log('Hex value', bnToHex(new BN(123456));
```