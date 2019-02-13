

# Functions

<a id="u8atohex"></a>

##  u8aToHex

▸ **u8aToHex**(value?: *`Uint8Array` | `null`*, bitLength?: *`number`*, isPrefixed?: *`boolean`*): `string`

*Defined in [u8a/toHex.ts:22](https://github.com/polkadot-js/common/blob/294c255/packages/util/src/u8a/toHex.ts#L22)*

*__name__*: u8aToHex

*__signature__*: u8aToHex (value?: UInt8Array): string

*__summary__*: Creates a hex string from a Uint8Array object.

*__description__*: `UInt8Array` input values return the actual hex string. `null` or `undefined` values returns an `0x` string.

*__example__*:   

```javascript
import { u8aToHex } from '@polkadot/util';

u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0xf])); // 0x68656c0f
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Optional` value | `Uint8Array` | `null` | - |
| `Default value` bitLength | `number` |  -1 |
| `Default value` isPrefixed | `boolean` | true |

**Returns:** `string`

___

