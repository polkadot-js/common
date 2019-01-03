

# Functions

<a id="hexfixlength"></a>

##  hexFixLength

▸ **hexFixLength**(value: *`string`*, bitLength?: *`number`*, withPadding?: *`boolean`*): `string`

*Defined in [hex/fixLength.ts:25](https://github.com/polkadot-js/common/blob/d47b865/packages/util/src/hex/fixLength.ts#L25)*

*__name__*: hexFixLength

*__signature__*: hexFixLength (value: string, bitLength: number = -1, withPadding: boolean = false): string

*__summary__*: Shifts a hex string to a specific bitLength

*__description__*: Returns a `0x` prefixed string with the specified number of bits contained in the return value. (If bitLength is -1, length checking is not done). Values with more bits are trimmed to the specified length. Input values with less bits are returned as-is by default. When `withPadding` is set, shorter values are padded with `0`.

*__example__*:   

```javascript
import { hexFixLength } from '@polkadot/util';

console.log('fixed', hexFixLength('0x12', 16)); // => 0x12
console.log('fixed', hexFixLength('0x12', 16, true)); // => 0x0012
console.log('fixed', hexFixLength('0x0012', 8)); // => 0x12
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| value | `string` | - |
| `Default value` bitLength | `number` |  -1 |
| `Default value` withPadding | `boolean` | false |

**Returns:** `string`

___

