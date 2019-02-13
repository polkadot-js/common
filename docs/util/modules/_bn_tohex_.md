

# Functions

<a id="bntohex"></a>

##  bnToHex

▸ **bnToHex**(value?: *`BN` | `number` | `null`*, options?: *`number` | `Options`*): `string`

*Defined in [bn/toHex.ts:34](https://github.com/polkadot-js/common/blob/2aba82e/packages/util/src/bn/toHex.ts#L34)*

*__name__*: bnToHex

*__signature__*: bnToHex (value?: BN, bitLength: number = -1): string

*__summary__*: Creates a hex value from a BN.js bignumber object.

*__description__*: `null` inputs returns a `0x` result, BN values return the actual value as a `0x` prefixed hex value. Anything that is not a BN object throws an error. With `bitLength` set, it fixes the number to the specified length.

*__example__*:   

```javascript
import BN from 'bn.js';
import { bnToHex } from '@polkadot/util';

bnToHex(new BN(0x123456)); // => '0x123456'
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Optional` value | `BN` | `number` | `null` | - |
| `Default value` options | `number` | `Options` |  { bitLength: -1, isLe: false, isNegative: false } |

**Returns:** `string`

___

