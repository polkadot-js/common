

# Functions

<a id="hexhasprefix"></a>

##  hexHasPrefix

▸ **hexHasPrefix**(value?: *`string` | `null`*): `boolean`

*Defined in [hex/hasPrefix.ts:21](https://github.com/polkadot-js/common/blob/8513530/packages/util/src/hex/hasPrefix.ts#L21)*

*__name__*: hexHasPrefix

*__summary__*: Tests for the existence of a `0x` prefix.

*__description__*: Checks for a valid hex input value and if the start matched `0x`

*__example__*:   

```javascript
import { hexHasPrefix } from '@polkadot/util';

console.log('has prefix', hexHasPrefix('0x1234')); // => true
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` value | `string` | `null` |

**Returns:** `boolean`

___

