

# Functions

<a id="compactaddlength"></a>

##  compactAddLength

▸ **compactAddLength**(input: *`Uint8Array`*): `Uint8Array`

*Defined in [compact/addLength.ts:20](https://github.com/polkadot-js/common/blob/50721f2/packages/util/src/compact/addLength.ts#L20)*

*__name__*: compactAddLength

*__description__*: Adds a length prefix to the input value

*__example__*:   

```javascript
import { compactAddLength } from '@polkadot/util';

console.log(compactAddLength(new Uint8Array([0xde, 0xad, 0xbe, 0xef]))); // Uint8Array([4 << 2, 0xde, 0xad, 0xbe, 0xef])
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| input | `Uint8Array` |

**Returns:** `Uint8Array`

___

