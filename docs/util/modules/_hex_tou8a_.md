

# Functions

<a id="hextou8a"></a>

##  hexToU8a

▸ **hexToU8a**(_value?: * `string` &#124; `null`*, bitLength?: *`number`*): `Uint8Array`

*Defined in [hex/toU8a.ts:25](https://github.com/polkadot-js/common/blob/67f66a3/packages/util/src/hex/toU8a.ts#L25)*

*__name__*: hexToU8a

*__signature__*: hexToU8a (value?: string, bitLength: number = -1): Uint8Array

*__summary__*: Creates a Buffer object from a hex string.

*__description__*: `null` inputs returns an empty `Uint8Array` result. Hex input values return the actual bytes value converted to a Uint8Array. Anything that is not a hex string (including the `0x` prefix) throws an error.

*__example__*:   

```javascript
import { hexToU8a } from '@polkadot/util';

hexToU8a('0x80001f'); // Uint8Array([0x80, 0x00, 0x1f])
hexToU8a('0x80001f', 32); // Uint8Array([0x00, 0x80, 0x00, 0x1f])
```

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Optional` _value |  `string` &#124; `null`| - |
| `Default value` bitLength | `number` |  -1 |

**Returns:** `Uint8Array`

___

