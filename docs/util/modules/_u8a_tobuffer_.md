

# Functions

<a id="u8atobuffer"></a>

##  u8aToBuffer

▸ **u8aToBuffer**(value?: *`Uint8Array` | `null`*): `Buffer`

*Defined in [u8a/toBuffer.ts:19](https://github.com/polkadot-js/common/blob/9f9ceff/packages/util/src/u8a/toBuffer.ts#L19)*

*__name__*: u8aToBuffer

*__summary__*: Creates a Buffer object from a hex string.

*__description__*: `null` inputs returns an empty `Buffer` result. `UInt8Array` input values return the actual bytes value converted to a `Buffer`. Anything that is not a `UInt8Array` throws an error.

*__example__*:   

```javascript
import { u8aToBuffer } from '@polkadot/util';

console.log('Buffer', u8aToBuffer('0x123480001f'));
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` value | `Uint8Array` | `null` |

**Returns:** `Buffer`

___

