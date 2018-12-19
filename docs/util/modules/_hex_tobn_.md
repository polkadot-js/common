

# Functions

<a id="hextobn"></a>

##  hexToBn

▸ **hexToBn**(_value?: * `string` &#124; `number` &#124; `null`*, _options?: * [ToBnOptions](../interfaces/_types_.tobnoptions.md) &#124; `boolean`*): `BN`

*Defined in [hex/toBn.ts:36](https://github.com/polkadot-js/common/blob/0e30c48/packages/util/src/hex/toBn.ts#L36)*

*__name__*: hexToBn

*__signature__*: hexToBn (value?: string, \_options: ToBnOptions | boolean = { isLe: false, isNegative: false }): BN

*__summary__*: Creates a BN.js bignumber object from a hex string.

*__description__*: `null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.

*__example__*:   

```javascript
import { hexToBn } from '@polkadot/util';

hexToBn('0x123480001f'); // => BN(0x123480001f)
```

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| `Optional` _value |  `string` &#124; `number` &#124; `null`| - |  The value to convert |
| `Default value` _options |  [ToBnOptions](../interfaces/_types_.tobnoptions.md) &#124; `boolean`|  { isLe: false, isNegative: false } |  Options to pass while converting |

**Returns:** `BN`

___

