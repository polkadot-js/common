

# Functions

<a id="compactstriplength"></a>

##  compactStripLength

▸ **compactStripLength**(input: *`Uint8Array`*, bitLength?: *`BitLength`*): [`number`, `Uint8Array`]

*Defined in [compact/stripLength.ts:22](https://github.com/polkadot-js/common/blob/dc996ef/packages/util/src/compact/stripLength.ts#L22)*

*__name__*: compactStripLength

*__description__*: Removes the length prefix, returning both the total length (including the value + compact encoding) and the decoded value with the correct length

*__example__*:   

```javascript
import { compactStripLength } from '@polkadot/util';

console.log(compactStripLength(new Uint8Array([2 << 2, 0xde, 0xad]))); // [2, Uint8Array[0xde, 0xad]]
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| input | `Uint8Array` | - |
| `Default value` bitLength | `BitLength` |  DEFAULT_BITLENGTH |

**Returns:** [`number`, `Uint8Array`]

___

