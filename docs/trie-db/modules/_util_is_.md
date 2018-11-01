

# Functions

<a id="isbranchnode"></a>

##  isBranchNode

▸ **isBranchNode**(node: *[Node](_types_.md#node)*): `boolean`

*Defined in [util/is.ts:57](https://github.com/polkadot-js/common/blob/0ddac0a/packages/trie-db/src/util/is.ts#L57)*

*__name__*: isBranchNode

*__signature__*: isBranchNode (node: Node): node is NodeKv

*__summary__*: Returns true if node is an Branch 17-item node

*__description__*: Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)

**Parameters:**

| Param | Type |
| ------ | ------ |
| node | [Node](_types_.md#node) |

**Returns:** `boolean`

___
<a id="isemptynode"></a>

##  isEmptyNode

▸ **isEmptyNode**(node: *[Node](_types_.md#node)*): `boolean`

*Defined in [util/is.ts:17](https://github.com/polkadot-js/common/blob/0ddac0a/packages/trie-db/src/util/is.ts#L17)*

*__name__*: isEmptyNode

*__signature__*: isEmptyNode (node: Node): node is NodeEmpty

*__summary__*: Returns true if node is NULL

*__description__*: Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)

**Parameters:**

| Param | Type |
| ------ | ------ |
| node | [Node](_types_.md#node) |

**Returns:** `boolean`

___
<a id="isextensionnode"></a>

##  isExtensionNode

▸ **isExtensionNode**(node: *[Node](_types_.md#node)*): `boolean`

*Defined in [util/is.ts:37](https://github.com/polkadot-js/common/blob/0ddac0a/packages/trie-db/src/util/is.ts#L37)*

*__name__*: isExtensionNode

*__signature__*: isExtensionNode (node: Node): node is NodeKv

*__summary__*: Returns true if node is an Extension 2-item node

*__description__*: Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)

**Parameters:**

| Param | Type |
| ------ | ------ |
| node | [Node](_types_.md#node) |

**Returns:** `boolean`

___
<a id="iskvnode"></a>

##  isKvNode

▸ **isKvNode**(node: *[Node](_types_.md#node)*): `boolean`

*Defined in [util/is.ts:27](https://github.com/polkadot-js/common/blob/0ddac0a/packages/trie-db/src/util/is.ts#L27)*

*__name__*: isKvNode

*__signature__*: isKvNode (node: Node): node is NodeKv

*__summary__*: Returns true if node is not empty and contains a single key/value pair

*__description__*: Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)

**Parameters:**

| Param | Type |
| ------ | ------ |
| node | [Node](_types_.md#node) |

**Returns:** `boolean`

___
<a id="isleafnode"></a>

##  isLeafNode

▸ **isLeafNode**(node: *[Node](_types_.md#node)*): `boolean`

*Defined in [util/is.ts:47](https://github.com/polkadot-js/common/blob/0ddac0a/packages/trie-db/src/util/is.ts#L47)*

*__name__*: isLeafNode

*__signature__*: isLeafNode (node: Node): node is NodeKv

*__summary__*: Returns true if node is an Leaf 2-item node

*__description__*: Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)

**Parameters:**

| Param | Type |
| ------ | ------ |
| node | [Node](_types_.md#node) |

**Returns:** `boolean`

___

