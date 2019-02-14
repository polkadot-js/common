

# Functions

<a id="xxhash64asvalue"></a>

##  xxhash64AsValue

▸ **xxhash64AsValue**(data: *`Buffer` | `Uint8Array` | `string`*, seed: *`number`*): `number`

*Defined in [xxhash/xxhash64/asValue.ts:22](https://github.com/polkadot-js/common/blob/0710c73/packages/util-crypto/src/xxhash/xxhash64/asValue.ts#L22)*

*__name__*: xxhash64AsValue

*__summary__*: Creates a hex number from the input.

*__description__*: From either a `string`, `Uint8Array` or a `Buffer` input, create the xxhash and return the result as a hex number

*__example__*:   

```javascript
import { xxhash64AsValue } from '@polkadot/util-crypto';

xxhash64AsValue('abcd', 0xabcd)); // => e29f70f8b8c96df7
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `Buffer` | `Uint8Array` | `string` |
| seed | `number` |

**Returns:** `number`

___

