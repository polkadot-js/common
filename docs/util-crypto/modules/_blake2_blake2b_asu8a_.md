

# Functions

<a id="blake2basu8a"></a>

##  blake2bAsU8a

▸ **blake2bAsU8a**(data: *`Uint8Array` | `string`*, bitLength?: *`number`*, key?: *`Uint8Array` | `null`*): `Uint8Array`

*Defined in [blake2/blake2b/asU8a.ts:22](https://github.com/polkadot-js/common/blob/c3fafbe/packages/util-crypto/src/blake2/blake2b/asU8a.ts#L22)*

*__name__*: blake2bAsU8a

*__summary__*: Creates a blake2b Uint8Array from the input.

*__description__*: From a `Uint8Array` input, create the blake2b and return the result as a `Uint8Array`.

*__example__*:   

```javascript
import { blake2bAsU8a } from '@polkadot/util-crypto';

blake2bAsU8a('abc'); // => Uint8Array('508c5e8c327c14e2e1a72ba34eeb452f37458b209ed63a294d999b4c86675982')
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | `Uint8Array` | `string` | - |
| `Default value` bitLength | `number` | 512 |
| `Default value` key | `Uint8Array` | `null` |  null |

**Returns:** `Uint8Array`

___

