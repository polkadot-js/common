

# Functions

<a id="hextonumber"></a>

##  hexToNumber

▸ **hexToNumber**(value?: *`undefined` | `string`*): `number`

*Defined in [hex/toNumber.ts:22](https://github.com/polkadot-js/common/blob/4c658e8/packages/util/src/hex/toNumber.ts#L22)*

*__name__*: hexToNumber

*__signature__*: hexToNumber (value?: string): number

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
| `Optional` value | `undefined` | `string` |

**Returns:** `number`

___

