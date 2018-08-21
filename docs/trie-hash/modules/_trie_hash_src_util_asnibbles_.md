[@polkadot/util-crypto](../README.md) > ["trie-hash/src/util/asNibbles"](../modules/_trie_hash_src_util_asnibbles_.md)

# External module: "trie-hash/src/util/asNibbles"

## Index

### Functions

* [asNibbles](_trie_hash_src_util_asnibbles_.md#asnibbles)

---

## Functions

<a id="asnibbles"></a>

###  asNibbles

▸ **asNibbles**(bytes: * `Uint8Array` &#124; `Array`<`number`>*): `Uint8Array`

*Defined in [trie-hash/src/util/asNibbles.ts:16](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-hash/src/util/asNibbles.ts#L16)*

*__name__*: asNibbles

*__signature__*: asNibbles (pairs: Trie$Pairs): Uint8Array

*__summary__*: Converts the input to Nibbles.

*__description__*: From an `Uint8Array` input, calculate and return a list of nibbles that makes up the input.

*__example__*: import { asNibbles } from '@polkadot/trie-hash/util';

asNibbles(new Uint8Array(\[0x41, 0x20\]) // => Uint8Array(\[4, 1, 2, 0\])

**Parameters:**

| Param | Type |
| ------ | ------ |
| bytes |  `Uint8Array` &#124; `Array`<`number`>|

**Returns:** `Uint8Array`

___

