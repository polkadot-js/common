

# Functions

<a id="u8afixlength"></a>

##  u8aFixLength

▸ **u8aFixLength**(value: *`Uint8Array`*, bitLength?: *`number`*, atStart?: *`boolean`*): `Uint8Array`

*Defined in [u8a/fixLength.ts:21](https://github.com/polkadot-js/common/blob/49b0c84/packages/util/src/u8a/fixLength.ts#L21)*

*__name__*: u8aFixLength

*__summary__*: Shifts a Uint8Array to a specific bitLength

*__description__*: Returns a uint8Array with the specified number of bits contained in the return value. (If bitLength is -1, length checking is not done). Values with more bits are trimmed to the specified length.

*__example__*:   

```javascript
import { u8aFixLength } from '@polkadot/util';

u8aFixLength('0x12') // => 0x12
u8aFixLength('0x12', 16) // => 0x0012
u8aFixLength('0x1234', 8) // => 0x12
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| value | `Uint8Array` | - |
| `Default value` bitLength | `number` |  -1 |
| `Default value` atStart | `boolean` | false |

**Returns:** `Uint8Array`

___

