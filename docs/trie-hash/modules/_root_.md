

# Functions

<a id="trieroot"></a>

##  trieRoot

▸ **trieRoot**(pairs: *`Trie$Pairs`*): `Uint8Array`

*Defined in [root.ts:30](https://github.com/polkadot-js/common/blob/dc07e26/packages/trie-hash/src/root.ts#L30)*

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

| Param | Type |
| ------ | ------ |
| pairs | `Trie$Pairs` |

**Returns:** `Uint8Array`

___

