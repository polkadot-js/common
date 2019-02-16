

# Functions

<a id="xxhashasu8a"></a>

##  xxhashAsU8a

▸ **xxhashAsU8a**(data: *`Buffer` \| `Uint8Array` \| `string`*, bitLength?: *`number`*): `Uint8Array`

*Defined in [xxhash/asU8a.ts:21](https://github.com/polkadot-js/common/blob/bc2b134/packages/util-crypto/src/xxhash/asU8a.ts#L21)*

*__name__*: xxhashAsU8a

*__summary__*: Creates a xxhash64 u8a from the input.

*__description__*: From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash64 and return the result as a `Uint8Array` with the specified `bitLength`.

*__example__*:   

```javascript
import { xxhashAsU8a } from '@polkadot/util-crypto';

xxhashAsU8a('abc'); // => 0x44bc2cf5ad770999
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | `Buffer` \| `Uint8Array` \| `string` | - |
| `Default value` bitLength | `number` | 64 |

**Returns:** `Uint8Array`

___

