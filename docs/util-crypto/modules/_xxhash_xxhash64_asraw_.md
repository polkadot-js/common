

# Functions

<a id="xxhash64asraw"></a>

##  xxhash64AsRaw

▸ **xxhash64AsRaw**(data: *`Buffer` | `Uint8Array` | `string`*, seed: *`number`*): `string`

*Defined in [xxhash/xxhash64/asRaw.ts:21](https://github.com/polkadot-js/common/blob/420f807/packages/util-crypto/src/xxhash/xxhash64/asRaw.ts#L21)*

*__name__*: xxhash64AsRaw

*__summary__*: Creates a xxhash non-prefixed hex from the input.

*__description__*: From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a non-prefixed hex string.

*__example__*:   

```javascript
import { xxhash64AsRaw } from '@polkadot/util-crypto';

xxhash64AsRaw('abcd', 0xabcd)); // => e29f70f8b8c96df7
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `Buffer` | `Uint8Array` | `string` |
| seed | `number` |

**Returns:** `string`

___

