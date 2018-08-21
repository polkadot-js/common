[@polkadot/util](../README.md) > ["trie-db/src/nodeFactory"](../modules/_trie_db_src_nodefactory_.md)

# External module: "trie-db/src/nodeFactory"

## Index

### Variables

* [l](_trie_db_src_nodefactory_.md#l)

### Functions

* [fromBranch](_trie_db_src_nodefactory_.md#frombranch)
* [fromRaw](_trie_db_src_nodefactory_.md#fromraw)
* [fromType](_trie_db_src_nodefactory_.md#fromtype)
* [getNodeType](_trie_db_src_nodefactory_.md#getnodetype)

---

## Variables

<a id="l"></a>

### `<Const>` l

**● l**: *`object`* =  logger('trie/node')

*Defined in [trie-db/src/nodeFactory.ts:17](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/nodeFactory.ts#L17)*

#### Type declaration

 debug: `function`

▸(...values: *`Logger$Data`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Rest` values | `Logger$Data` |

**Returns:** `void`

 error: `function`

▸(...values: *`Logger$Data`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Rest` values | `Logger$Data` |

**Returns:** `void`

 log: `function`

▸(...values: *`Logger$Data`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Rest` values | `Logger$Data` |

**Returns:** `void`

 warn: `function`

▸(...values: *`Logger$Data`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Rest` values | `Logger$Data` |

**Returns:** `void`

___

## Functions

<a id="frombranch"></a>

###  fromBranch

▸ **fromBranch**(l: *`Logger`*, hashing: *`HashFn`*): `(Anonymous function)`

*Defined in [trie-db/src/nodeFactory.ts:44](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/nodeFactory.ts#L44)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| l | `Logger` |
| hashing | `HashFn` |

**Returns:** `(Anonymous function)`

___
<a id="fromraw"></a>

###  fromRaw

▸ **fromRaw**(l: *`Logger`*, hashing: *`HashFn`*): `(Anonymous function)`

*Defined in [trie-db/src/nodeFactory.ts:63](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/nodeFactory.ts#L63)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| l | `Logger` |
| hashing | `HashFn` |

**Returns:** `(Anonymous function)`

___
<a id="fromtype"></a>

###  fromType

▸ **fromType**(l: *`Logger`*, hashing: *`HashFn`*, type: *`Trie$Node$Type`*): `(Anonymous function)`

*Defined in [trie-db/src/nodeFactory.ts:73](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/nodeFactory.ts#L73)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| l | `Logger` |
| hashing | `HashFn` |
| type | `Trie$Node$Type` |

**Returns:** `(Anonymous function)`

___
<a id="getnodetype"></a>

###  getNodeType

▸ **getNodeType**(node: *`DecodedRlp`*): `Trie$Node$Type`

*Defined in [trie-db/src/nodeFactory.ts:26](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/nodeFactory.ts#L26)*

Determines the node type.

**Parameters:**

| Param | Type |
| ------ | ------ |
| node | `DecodedRlp` |

**Returns:** `Trie$Node$Type`
- the node type
  - leaf - if the node is a leaf
  - branch - if the node is a branch
  - extention - if the node is an extention

___

