

# Functions

<a id="trieroot"></a>

##  trieRoot

▸ **trieRoot**(input: *`Array`<[TriePair](_types_.md#triepair)>*, codec?: *`Codec`*): `Uint8Array`

*Defined in [trieRoot.ts:30](https://github.com/polkadot-js/common/blob/9fc3354/packages/trie-hash/src/trieRoot.ts#L30)*

*__name__*: trieRoot

*__signature__*: trieRoot (pairs: Trie$Pairs): Uint8Array

*__summary__*: Creates a trie hash from the supplied pairs.

*__description__*: From an `Array<{k: Uint8Array, v: Uint8Array}>` input, calculate the triehash and return the result as a `Uint8Array`.

*__example__*:   

```javascript
import { stringToU8a } from '@polkadot/util';
import { trieRoot } from '@polkadot/trie-hash';

trieRoot([{
  k: stringToU8a('A'),
  v: stringToU8a('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
}]); // => 0xd23786fb4a010da3ce639d66d5e904a11dbc02746d1ce25029e53290cabf28ab
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| input | `Array`<[TriePair](_types_.md#triepair)> | - |
| `Default value` codec | `Codec` |  DEFAULT_CODEC |

**Returns:** `Uint8Array`

___

