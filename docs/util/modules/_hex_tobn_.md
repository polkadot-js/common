

# Functions

<a id="hextobn"></a>

##  hexToBn

▸ **hexToBn**(_value?: * `undefined` &#124; `string`*, isLe?: *`boolean`*): `BN`

*Defined in [hex/toBn.ts:30](https://github.com/polkadot-js/common/blob/02d4155/packages/util/src/hex/toBn.ts#L30)*

*__name__*: hexToBn

*__signature__*: hexToBn (value?: string, isLe: boolean = false): BN

*__summary__*: Creates a BN.js bignumber object from a hex string.

*__description__*: `null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.

*__example__*:   

```javascript
import { hexToBn } from '@polkadot/util';

hexToBn('0x123480001f'); // => BN(0x123480001f)
```

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Optional` _value |  `undefined` &#124; `string`| - |
| `Default value` isLe | `boolean` | false |

**Returns:** `BN`

___

