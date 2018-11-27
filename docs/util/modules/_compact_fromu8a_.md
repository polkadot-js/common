

# Functions

<a id="compactfromu8a"></a>

##  compactFromU8a

▸ **compactFromU8a**(_input: * `Uint8Array` &#124; `string`*, bitLength?: *`BitLength`*): [`number`, `BN`]

*Defined in [compact/fromU8a.ts:26](https://github.com/polkadot-js/common/blob/148f956/packages/util/src/compact/fromU8a.ts#L26)*

*__name__*: compactFromU8a

*__description__*: Retrievs the offset and encoded length from a compact-prefixed value

*__example__*:   

```javascript
import { compactFromU8a } from '@polkadot/util';

const [offset, length] = compactFromU8a(new Uint8Array([254, 255, 3, 0]), 32));

console.log('value offset=', offset, 'length=', length); // 4, 0xffff
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| _input |  `Uint8Array` &#124; `string`| - |
| `Default value` bitLength | `BitLength` |  DEFAULT_BITLENGTH |

**Returns:** [`number`, `BN`]

___

