

# Functions

<a id="stringtou8a"></a>

##  stringToU8a

▸ **stringToU8a**(value?: *`undefined` | `string`*): `Uint8Array`

*Defined in [string/toU8a.ts:40](https://github.com/polkadot-js/common/blob/294c255/packages/util/src/string/toU8a.ts#L40)*

*__name__*: stringToU8a

*__signature__*: stringToU8a (value?: string): UInt8Array

*__summary__*: Creates a Uint8Array object from a utf-8 string.

*__description__*: String input values return the actual encoded `UInt8Array`. `null` or `undefined` values returns an empty encoded array.

*__example__*:   

```javascript
import { stringToU8a } from '@polkadot/util';

stringToU8a('hello'); // [0x68, 0x65, 0x6c, 0x6c, 0x6f]
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` value | `undefined` | `string` |

**Returns:** `Uint8Array`

___

