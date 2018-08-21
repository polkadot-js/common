[@polkadot/util-crypto](../README.md) > ["trie-hash/src/root"](../modules/_trie_hash_src_root_.md)

# External module: "trie-hash/src/root"

## Index

### Functions

* [trieRoot](_trie_hash_src_root_.md#trieroot)

---

## Functions

<a id="trieroot"></a>

###  trieRoot

▸ **trieRoot**(pairs: *`Trie$Pairs`*): `Uint8Array`

*Defined in [trie-hash/src/root.ts:26](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-hash/src/root.ts#L26)*

*__name__*: trieRoot

*__signature__*: trieRoot (pairs: Trie$Pairs): Uint8Array

*__summary__*: Creates a trie hash from the supplied pairs.

*__description__*: From an `Array<{k: Uint8Array, v: Uint8Array}>` input, calculate the triehash and return the result as a `Uint8Array`.

*__example__*: import { u8aFromString } from '@polkadot/util'; import { trieRoot } from '@polkadot/trie-hash';

trieRoot(\[{ k: u8aFromString('A'), v: u8aFromString('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa') }\]) // => 0xd23786fb4a010da3ce639d66d5e904a11dbc02746d1ce25029e53290cabf28ab

**Parameters:**

| Param | Type |
| ------ | ------ |
| pairs | `Trie$Pairs` |

**Returns:** `Uint8Array`

___

