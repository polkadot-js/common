

# Functions

<a id="u8atobn"></a>

##  u8aToBn

▸ **u8aToBn**(value: *`Uint8Array`*, isLe: *`boolean`*): `BN`

*Defined in [u8a/toBn.ts:25](https://github.com/polkadot-js/common/blob/ccfed2a/packages/util/src/u8a/toBn.ts#L25)*

*__name__*: u8aToBn

*__signature__*: u8aToHex (value?: Uint8Array, isLe: boolean = false): BN

*__summary__*: Creates a BN from a Uint8Array object.

*__description__*: `UInt8Array` input values return the actual BN. `null` or `undefined` values returns an `0x0` value.

*__example__*:   

```javascript
import { u8aToBn } from '@polkadot/util';

u8aToHex(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0xf])); // 0x68656c0f
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `Uint8Array` |
| isLe | `boolean` |

**Returns:** `BN`

___

