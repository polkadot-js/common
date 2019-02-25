

# Functions

<a id="bntobn"></a>

##  bnToBn

▸ **bnToBn**(value?: *`BN` \| `number` \| `null`*): `BN`

*Defined in [bn/toBn.ts:23](https://github.com/polkadot-js/common/blob/6610403/packages/util/src/bn/toBn.ts#L23)*

*__name__*: bnToBn

*__summary__*: Creates a BN value from a BN.js bignumber or number input.

*__description__*: `null` inputs returns a `0x0` result, BN values returns the value, numnbers returns a BN representation.

*__example__*:   

```javascript
import BN from 'bn.js';
import { bnToBn } from '@polkadot/util';

bnToBn(0x1234); // => BN(0x1234)
bnToBn(new BN(0x1234)); // => BN(0x1234)
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` value | `BN` \| `number` \| `null` |

**Returns:** `BN`

___

