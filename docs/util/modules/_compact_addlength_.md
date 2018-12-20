

# Functions

<a id="compactaddlength"></a>

##  compactAddLength

▸ **compactAddLength**(input: *`Uint8Array`*, bitLength?: *[BitLength](_compact_types_.md#bitlength)*): `Uint8Array`

*Defined in [compact/addLength.ts:23](https://github.com/polkadot-js/common/blob/74744e6/packages/util/src/compact/addLength.ts#L23)*

*__name__*: compactAddLength

*__description__*: Adds a length prefix to the input value

*__example__*:   

```javascript
import { compactAddLength } from '@polkadot/util';

console.log(compactAddLength(new Uint8Array([0xde, 0xad, 0xbe, 0xef]))); // Uint8Array([4 << 2, 0xde, 0xad, 0xbe, 0xef])
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| input | `Uint8Array` | - |
| `Default value` bitLength | [BitLength](_compact_types_.md#bitlength) |  DEFAULT_BITLENGTH |

**Returns:** `Uint8Array`

___

