

# Functions

<a id="hextobn"></a>

##  hexToBn

▸ **hexToBn**(value?: *`string` \| `number` \| `null`*, options?: *[ToBnOptions](../interfaces/_types_.tobnoptions.md) \| `boolean`*): `BN`

*Defined in [hex/toBn.ts:35](https://github.com/polkadot-js/common/blob/db4b221/packages/util/src/hex/toBn.ts#L35)*

*__name__*: hexToBn

*__summary__*: Creates a BN.js bignumber object from a hex string.

*__description__*: `null` inputs returns a `BN(0)` result. Hex input values return the actual value converted to a BN. Anything that is not a hex string (including the `0x` prefix) throws an error.

*__example__*:   

```javascript
import { hexToBn } from '@polkadot/util';

hexToBn('0x123480001f'); // => BN(0x123480001f)
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Optional` value | `string` \| `number` \| `null` | - |
| `Default value` options | [ToBnOptions](../interfaces/_types_.tobnoptions.md) \| `boolean` |  { isLe: false, isNegative: false } |

**Returns:** `BN`

___

