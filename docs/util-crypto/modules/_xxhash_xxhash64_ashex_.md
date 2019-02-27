

# Functions

<a id="xxhash64ashex"></a>

##  xxhash64AsHex

▸ **xxhash64AsHex**(data: *`Buffer` \| `Uint8Array` \| `string`*, seed: *`number`*): `string`

*Defined in [xxhash/xxhash64/asHex.ts:23](https://github.com/polkadot-js/common/blob/e397016/packages/util-crypto/src/xxhash/xxhash64/asHex.ts#L23)*

*__name__*: xxhash64AsHex

*__summary__*: Creates a xxhash hex from the input.

*__description__*: From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a hex string.

*__example__*:   

```javascript
import { xxhash64AsHex } from '@polkadot/util-crypto';

xxhash64AsHex('abcd', 0xabcd)); // => 0xe29f70f8b8c96df7
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `Buffer` \| `Uint8Array` \| `string` |
| seed | `number` |

**Returns:** `string`

___

