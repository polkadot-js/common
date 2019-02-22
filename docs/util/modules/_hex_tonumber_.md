

# Functions

<a id="hextonumber"></a>

##  hexToNumber

▸ **hexToNumber**(value?: *`string` \| `null`*): `number`

*Defined in [hex/toNumber.ts:21](https://github.com/polkadot-js/common/blob/0f57902/packages/util/src/hex/toNumber.ts#L21)*

*__name__*: hexToNumber

*__summary__*: Creates a Number value from a Buffer object.

*__description__*: `null` inputs returns an NaN result, `hex` values return the actual value as a `Number`.

*__example__*:   

```javascript
import { hexToNumber } from '@polkadot/util';

hexToNumber('0x1234'); // => 0x1234
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` value | `string` \| `null` |

**Returns:** `number`

___

