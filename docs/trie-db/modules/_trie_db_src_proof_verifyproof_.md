[@polkadot/util](../README.md) > ["trie-db/src/proof/verifyProof"](../modules/_trie_db_src_proof_verifyproof_.md)

# External module: "trie-db/src/proof/verifyProof"

## Index

### Functions

* [verifyProof](_trie_db_src_proof_verifyproof_.md#verifyproof)

---

## Functions

<a id="verifyproof"></a>

###  verifyProof

▸ **verifyProof**(rootHash: *`any`*, _key: *`any`*, proofs: *`any`*, hashing?: *`HashFn`*): `Promise`<`Uint8Array`>

*Defined in [trie-db/src/proof/verifyProof.ts:24](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/proof/verifyProof.ts#L24)*

Verifies a merkle proof for a given key
*__method__*: Trie.verifyProof

**Parameters:**

| Param | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| rootHash | `any` | - |  - |
| _key | `any` | - |
| proofs | `any` | - |
| `Default value` hashing | `HashFn` |  keccakAsU8a |

**Returns:** `Promise`<`Uint8Array`>
Promise<{String}>

___

