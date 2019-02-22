

# Functions

<a id="u8atobn"></a>

##  u8aToBn

▸ **u8aToBn**(value: *`Uint8Array`*, options?: *[ToBnOptions](../interfaces/_types_.tobnoptions.md) \| `boolean`*): `BN`

*Defined in [u8a/toBn.ts:29](https://github.com/polkadot-js/common/blob/0f57902/packages/util/src/u8a/toBn.ts#L29)*

*__name__*: u8aToBn

*__summary__*: Creates a BN from a Uint8Array object.

*__description__*: `UInt8Array` input values return the actual BN. `null` or `undefined` values returns an `0x0` value.

*__example__*:   

```javascript
import { u8aToBn } from '@polkadot/util';

u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0xf])); // 0x68656c0f
```

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| value | `Uint8Array` | - |  The value to convert |
| `Default value` options | [ToBnOptions](../interfaces/_types_.tobnoptions.md) \| `boolean` |  { isLe: true, isNegative: false } |  Options to pass while converting |

**Returns:** `BN`

___

