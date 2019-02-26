

# Functions

<a id="hexaddprefix"></a>

##  hexAddPrefix

▸ **hexAddPrefix**(value?: *`string` \| `null`*): `string`

*Defined in [hex/addPrefix.ts:21](https://github.com/polkadot-js/common/blob/815fdc7/packages/util/src/hex/addPrefix.ts#L21)*

*__name__*: hexAddPrefix

*__summary__*: Adds the `0x` prefix to string values.

*__description__*: Returns a `0x` prefixed string from the input value. If the input is already prefixed, it is returned unchanged.

*__example__*:   

```javascript
import { hexAddPrefix } from '@polkadot/util';

console.log('With prefix', hexAddPrefix('0a0b12')); // => 0x0a0b12
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` value | `string` \| `null` |

**Returns:** `string`

___

