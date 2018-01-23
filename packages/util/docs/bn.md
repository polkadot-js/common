# bn

Utility methods to convert to and from `BN` objects 

- [bnFromHex](#bnfromhex) Creates a BN.js bignumber object from a hex string.
- [bnToHex](#bntohex) Creates a hex value from a BN.js bignumber object.

## bnFromHex

Creates a BN.js bignumber object from a hex string. [(alias of hexToBn)](hex.md#hextobn)

```js
bnFromHex (value?: string): BN
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

bnToHex(new BN(0x123456)); // => '0x123456'
```