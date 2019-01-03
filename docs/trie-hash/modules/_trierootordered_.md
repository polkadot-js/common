

# Functions

<a id="trierootordered"></a>

##  trieRootOrdered

▸ **trieRootOrdered**(input: *`Array`<`Uint8Array`>*, codec?: *`Codec`*): `Uint8Array`

*Defined in [trieRootOrdered.ts:31](https://github.com/polkadot-js/common/blob/d47b865/packages/trie-hash/src/trieRootOrdered.ts#L31)*

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

| Name | Type | Default value |
| ------ | ------ | ------ |
| input | `Array`<`Uint8Array`> | - |
| `Default value` codec | `Codec` |  DEFAULT_CODEC |

**Returns:** `Uint8Array`

___

