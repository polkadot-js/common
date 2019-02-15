

# Functions

<a id="u8atostring"></a>

##  u8aToString

▸ **u8aToString**(value?: *`Uint8Array` | `null`*): `string`

*Defined in [u8a/toString.ts:35](https://github.com/polkadot-js/common/blob/74b37cf/packages/util/src/u8a/toString.ts#L35)*

*__name__*: u8aToString

*__summary__*: Creates a utf-8 string from a Uint8Array object.

*__description__*: `UInt8Array` input values return the actual decoded utf-8 string. `null` or `undefined` values returns an empty string.

*__example__*:   

```javascript
import { u8aToString } from '@polkadot/util';

u8aToString(new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f])); // hello
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` value | `Uint8Array` | `null` |

**Returns:** `string`

___

