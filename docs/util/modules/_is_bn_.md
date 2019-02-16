

# Functions

<a id="isbn"></a>

##  isBn

▸ **isBn**(value: *`any`*): `boolean`

*Defined in [is/bn.ts:22](https://github.com/polkadot-js/common/blob/b15abe1/packages/util/src/is/bn.ts#L22)*

*__name__*: isBn

*__summary__*: Tests for a `BN` object instance.

*__description__*: Checks to see if the input object is an instance of `BN` (bn.js).

*__example__*:   

```javascript
import BN from 'bn.js';
import { isBn } from '@polkadot/util';

console.log('isBn', isBn(new BN(1))); // => true
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___

