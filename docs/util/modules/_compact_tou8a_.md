

# Functions

<a id="compacttou8a"></a>

##  compactToU8a

▸ **compactToU8a**(_value: * `BN` &#124; `number`*, bitLength?: *[BitLength](_compact_types_.md#bitlength)*): `Uint8Array`

*Defined in [compact/toU8a.ts:29](https://github.com/polkadot-js/common/blob/caec22d/packages/util/src/compact/toU8a.ts#L29)*

*__name__*: compactToU8a

*__description__*: Encodes a number into a compact representation

*__example__*:   

```javascript
import { compactToU8a } from '@polkadot/util';

console.log(compactToU8a(511, 32)); // Uint8Array([0b11111101, 0b00000111])
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| _value |  `BN` &#124; `number`| - |
| `Default value` bitLength | [BitLength](_compact_types_.md#bitlength) |  DEFAULT_BITLENGTH |

**Returns:** `Uint8Array`

___

