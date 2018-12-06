

# Functions

<a id="xxhash64asraw"></a>

##  xxhash64AsRaw

▸ **xxhash64AsRaw**(data: * `Buffer` &#124; `Uint8Array` &#124; `string`*, seed: *`number`*): `string`

*Defined in [xxhash/xxhash64/asRaw.ts:22](https://github.com/polkadot-js/common/blob/2be211c/packages/util-crypto/src/xxhash/xxhash64/asRaw.ts#L22)*

*__name__*: xxhash64AsRaw

*__signature__*: xxhash64AsRaw (data: Buffer | Uint8Array | string, seed: number): string

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
| data |  `Buffer` &#124; `Uint8Array` &#124; `string`|
| seed | `number` |

**Returns:** `string`

___

