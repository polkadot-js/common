

# Functions

<a id="encode"></a>

##  encode

▸ **encode**(pairs: *`Trie$Pairs`*, preLength: *`number`*): `Array`<`any`>

*Defined in [encode/index.ts:36](https://github.com/polkadot-js/common/blob/b53a677/packages/trie-hash/src/encode/index.ts#L36)*

*__name__*: encode

*__signature__*: encode (pairs: Trie$Pairs, preLength: number): Array

*__summary__*: Encodes Trie Pairs depending on a provided Prefix Length and the amount of pairs

*__description__*: *   `encode` is called and provided arguments including Trie Pairs and Prefix Length.
*   If the Trie Pairs have no length then return an empty array
*   If the Trie Pairs have a length of 1 then we call `encodeSingle` to return a single encoded array with two elements. The first element is a u8a calculated from calling `encodeHexPrefix` with arguments including a slice up to the Prefix Length of the pair's key (aka nibbles), and whether it's a leaf. The second element is the pair's value.
*   If the Trie Pairs have a length > 1 and we calculate that their Shared Prefix Length > Prefix Length then we return early with the results of calling `encodeShared` to return a single encoded array with two elements. The first element is a u8a calculated as previously with `encodeHexPrefix` and whereas second element is calculated from calling `encodeAux`, which recursively calls this function `encode` to obtain an encoded value, and then Recursive Length Prefix (RLP) encodes it. If the length of the RLP encoded u8a is less than 32 then return the RLP encoded value, otherwise return call the Keccak-256 hash function from [js-sha3](https://www.npmjs.com/package/js-sha3) library on the RLP encoded value and return the result.
*   If the Trie Pairs have a length > 1 and the calculated Share Prefix Length <= Prefix Length then we return the array result of calling `encodePairs` and push the pair's value onto the end of the array if the Prefix Length !== Pair's Key Length.

*__description__*: Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)

**Parameters:**

| Param | Type |
| ------ | ------ |
| pairs | `Trie$Pairs` |
| preLength | `number` |

**Returns:** `Array`<`any`>

___

