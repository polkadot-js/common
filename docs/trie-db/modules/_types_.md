

# Index

### Enumerations

* [NodeType](../enums/_types_.nodetype.md)

### Interfaces

* [TrieDb](../interfaces/_types_.triedb.md)

### Type aliases

* [EncodedPath](_types_.md#encodedpath)
* [Node](_types_.md#node)
* [NodeBranch](_types_.md#nodebranch)
* [NodeEmpty](_types_.md#nodeempty)
* [NodeEncoded](_types_.md#nodeencoded)
* [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty)
* [NodeKv](_types_.md#nodekv)
* [NodeNotEmpty](_types_.md#nodenotempty)

---

# Type aliases

<a id="encodedpath"></a>

##  EncodedPath

**Ƭ EncodedPath**: *`Uint8Array` \| `null`*

*Defined in [types.ts:28](https://github.com/polkadot-js/common/blob/830c98d/packages/trie-db/src/types.ts#L28)*

___
<a id="node"></a>

##  Node

**Ƭ Node**: *[NodeEmpty](_types_.md#nodeempty) \| [NodeNotEmpty](_types_.md#nodenotempty)*

*Defined in [types.ts:34](https://github.com/polkadot-js/common/blob/830c98d/packages/trie-db/src/types.ts#L34)*

___
<a id="nodebranch"></a>

##  NodeBranch

**Ƭ NodeBranch**: *[[NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty)]*

*Defined in [types.ts:20](https://github.com/polkadot-js/common/blob/830c98d/packages/trie-db/src/types.ts#L20)*

___
<a id="nodeempty"></a>

##  NodeEmpty

**Ƭ NodeEmpty**: *`null`*

*Defined in [types.ts:14](https://github.com/polkadot-js/common/blob/830c98d/packages/trie-db/src/types.ts#L14)*

___
<a id="nodeencoded"></a>

##  NodeEncoded

**Ƭ NodeEncoded**: *`Uint8Array`*

*Defined in [types.ts:16](https://github.com/polkadot-js/common/blob/830c98d/packages/trie-db/src/types.ts#L16)*

___
<a id="nodeencodedorempty"></a>

##  NodeEncodedOrEmpty

**Ƭ NodeEncodedOrEmpty**: *[NodeEncoded](_types_.md#nodeencoded) \| [NodeEmpty](_types_.md#nodeempty)*

*Defined in [types.ts:18](https://github.com/polkadot-js/common/blob/830c98d/packages/trie-db/src/types.ts#L18)*

___
<a id="nodekv"></a>

##  NodeKv

**Ƭ NodeKv**: *[[EncodedPath](_types_.md#encodedpath), [NodeEncodedOrEmpty](_types_.md#nodeencodedorempty)]*

*Defined in [types.ts:30](https://github.com/polkadot-js/common/blob/830c98d/packages/trie-db/src/types.ts#L30)*

___
<a id="nodenotempty"></a>

##  NodeNotEmpty

**Ƭ NodeNotEmpty**: *[NodeKv](_types_.md#nodekv) \| [NodeBranch](_types_.md#nodebranch)*

*Defined in [types.ts:32](https://github.com/polkadot-js/common/blob/830c98d/packages/trie-db/src/types.ts#L32)*

___

