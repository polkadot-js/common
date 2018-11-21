

# Functions

<a id="blake2asu8a"></a>

##  blake2AsU8a

▸ **blake2AsU8a**(data: *`Uint8Array`*, bitLength?: *`number`*, key?: *`Uint8Array`*): `Uint8Array`

*Defined in [blake2/asU8a.ts:22](https://github.com/polkadot-js/common/blob/3bc1b75/packages/util-crypto/src/blake2/asU8a.ts#L22)*

*__name__*: blake2AsU8a

*__signature__*: blake2AsU8a (data: Uint8Array, bitLength: number = 256): Uint8Array

*__summary__*: Creates a blake2b u8a from the input.

*__description__*: From a `Uint8Array` input, create the blake2b and return the result as a u8a with the specified `bitLength`.

*__example__*:   

```javascript
import { blake2AsU8a } from '@polkadot/util-crypto';

blake2AsU8a('abc'); // => [0xba, 0x80, 0xa53, 0xf98, 0x1c, 0x4d, 0x0d]
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| data | `Uint8Array` | - |
| `Default value` bitLength | `number` | 256 |
| `Optional` key | `Uint8Array` | - |

**Returns:** `Uint8Array`

___

