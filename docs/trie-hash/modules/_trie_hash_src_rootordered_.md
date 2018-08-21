[@polkadot/util-crypto](../README.md) > ["trie-hash/src/rootOrdered"](../modules/_trie_hash_src_rootordered_.md)

# External module: "trie-hash/src/rootOrdered"

## Index

### Functions

* [trieRootOrdered](_trie_hash_src_rootordered_.md#trierootordered)

---

## Functions

<a id="trierootordered"></a>

###  trieRootOrdered

▸ **trieRootOrdered**(values: *`Array`<`Uint8Array`>*): `Uint8Array`

*Defined in [trie-hash/src/rootOrdered.ts:25](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-hash/src/rootOrdered.ts#L25)*

*__name__*: trieRootOrdered

*__signature__*: trieRootOrdered (values: Array): Uint8Array

*__summary__*: Creates a trie hash from the supplied values.

*__description__*: From an `Array<Uint8Array>` input, calculate the ordered triehash and return the result as a `Uint8Array`.

*__example__*: import { u8aFromString } from '@polkadot/util'; import { trieRootOrdered } from '@polkadot/trie-hash';

trieRootOrdered(\[ u8aFromString('doe'), u8aFromString('reindeer') \]) // => 0xe766d5d51b89dc39d981b41bda63248d7abce4f0225eefd023792a540bcffee3

**Parameters:**

| Param | Type |
| ------ | ------ |
| values | `Array`<`Uint8Array`> |

**Returns:** `Uint8Array`

___

