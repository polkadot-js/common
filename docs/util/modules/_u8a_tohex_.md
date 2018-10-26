

# Functions

<a id="u8atohex"></a>

##  u8aToHex

▸ **u8aToHex**(value?: * `Uint8Array` &#124; `null`*, bitLength?: *`number`*, isPrefixed?: *`boolean`*): `string`

*Defined in [u8a/toHex.ts:20](https://github.com/polkadot-js/common/blob/d0291db/packages/util/src/u8a/toHex.ts#L20)*

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

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Optional` value |  `Uint8Array` &#124; `null`| - |
| `Default value` bitLength | `number` |  -1 |
| `Default value` isPrefixed | `boolean` | true |

**Returns:** `string`

___

