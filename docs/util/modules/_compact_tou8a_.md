

# Functions

<a id="compacttou8a"></a>

##  compactToU8a

▸ **compactToU8a**(_value: *`BN` \| `number`*): `Uint8Array`

*Defined in [compact/toU8a.ts:27](https://github.com/polkadot-js/common/blob/9864646/packages/util/src/compact/toU8a.ts#L27)*

*__name__*: compactToU8a

*__description__*: Encodes a number into a compact representation

*__example__*:   

```javascript
import { compactToU8a } from '@polkadot/util';

console.log(compactToU8a(511, 32)); // Uint8Array([0b11111101, 0b00000111])
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| _value | `BN` \| `number` |

**Returns:** `Uint8Array`

___

