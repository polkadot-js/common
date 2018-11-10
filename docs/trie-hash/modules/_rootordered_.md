

# Functions

<a id="trierootordered"></a>

##  trieRootOrdered

▸ **trieRootOrdered**(values: *`Array`<`Uint8Array`>*): `Uint8Array`

*Defined in [rootOrdered.ts:29](https://github.com/polkadot-js/common/blob/a9878a2/packages/trie-hash/src/rootOrdered.ts#L29)*

*__name__*: trieRootOrdered

*__signature__*: trieRootOrdered (values: Array): Uint8Array

*__summary__*: Creates a trie hash from the supplied values.

*__description__*: From an `Array<Uint8Array>` input, calculate the ordered triehash and return the result as a `Uint8Array`.

*__example__*:   

```javascript
import { stringToU8a } from '@polkadot/util';
import { trieRootOrdered } from '@polkadot/trie-hash';

trieRootOrdered([
  stringToU8a('doe'),
  stringToU8a('reindeer')
]); // => 0xe766d5d51b89dc39d981b41bda63248d7abce4f0225eefd023792a540bcffee3
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| values | `Array`<`Uint8Array`> |

**Returns:** `Uint8Array`

___

