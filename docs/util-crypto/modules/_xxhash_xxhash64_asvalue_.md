

# Functions

<a id="xxhash64asvalue"></a>

##  xxhash64AsValue

▸ **xxhash64AsValue**(data: * `Buffer` &#124; `Uint8Array` &#124; `string`*, seed: *`number`*): `number`

*Defined in [xxhash/xxhash64/asValue.ts:23](https://github.com/polkadot-js/common/blob/f011334/packages/util-crypto/src/xxhash/xxhash64/asValue.ts#L23)*

*__name__*: xxhash64AsValue

*__signature__*: xxhash64AsValue (data: Buffer | Uint8Array | string, seed: number): number

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
| data |  `Buffer` &#124; `Uint8Array` &#124; `string`|
| seed | `number` |

**Returns:** `number`

___

