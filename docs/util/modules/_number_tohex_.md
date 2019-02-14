

# Functions

<a id="numbertohex"></a>

##  numberToHex

▸ **numberToHex**(value?: *`number` | `null`*, bitLength?: *`number`*): `string`

*Defined in [number/toHex.ts:24](https://github.com/polkadot-js/common/blob/420f807/packages/util/src/number/toHex.ts#L24)*

*__name__*: numberToHex

*__summary__*: Creates a hex value from a number.

*__description__*: `null`/`undefined`/`NaN` inputs returns an empty `0x` result. `number` input values return the actual bytes value converted to a `hex`. With `bitLength` set, it converts the number to the equivalent size.

*__example__*:   

```javascript
import { numberToHex } from '@polkadot/util';

numberToHex(0x1234); // => '0x1234'
numberToHex(0x1234, 32); // => 0x00001234
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Optional` value | `number` | `null` | - |
| `Default value` bitLength | `number` |  -1 |

**Returns:** `string`

___

