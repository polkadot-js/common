

# Functions

<a id="ishex"></a>

##  isHex

▸ **isHex**(value: *`any`*, bitLength?: *`number`*, ignoreLength?: *`boolean`*): `boolean`

*Defined in [is/hex.ts:24](https://github.com/polkadot-js/common/blob/dc0563d/packages/util/src/is/hex.ts#L24)*

*__name__*: isHex

*__summary__*: Tests for a hex string.

*__description__*: Checks to see if the input value is a `0x` prefixed hex string. Optionally (`bitLength` !== -1) checks to see if the bitLength is correct.

*__example__*:   

```javascript
import { isHex } from '@polkadot/util';

isHex('0x1234'); // => true
isHex('0x1234', 8); // => false
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| value | `any` | - |
| `Default value` bitLength | `number` |  -1 |
| `Default value` ignoreLength | `boolean` | false |

**Returns:** `boolean`

___

