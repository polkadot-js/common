

# Functions

<a id="isbranchnode"></a>

##  isBranchNode

▸ **isBranchNode**(node: *[Node](_types_.md#node)*): `boolean`

*Defined in [util/is.ts:52](https://github.com/polkadot-js/common/blob/b15abe1/packages/trie-db/src/util/is.ts#L52)*

*__name__*: isBranchNode

*__summary__*: Returns true if node is an Branch 17-item node

*__description__*: Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)

**Parameters:**

| Name | Type |
| ------ | ------ |
| node | [Node](_types_.md#node) |

**Returns:** `boolean`

___
<a id="isemptynode"></a>

##  isEmptyNode

▸ **isEmptyNode**(node: *[Node](_types_.md#node)*): `boolean`

*Defined in [util/is.ts:16](https://github.com/polkadot-js/common/blob/b15abe1/packages/trie-db/src/util/is.ts#L16)*

*__name__*: isEmptyNode

*__summary__*: Returns true if node is NULL

*__description__*: Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)

**Parameters:**

| Name | Type |
| ------ | ------ |
| node | [Node](_types_.md#node) |

**Returns:** `boolean`

___
<a id="isextensionnode"></a>

##  isExtensionNode

▸ **isExtensionNode**(node: *[Node](_types_.md#node)*): `boolean`

*Defined in [util/is.ts:34](https://github.com/polkadot-js/common/blob/b15abe1/packages/trie-db/src/util/is.ts#L34)*

*__name__*: isExtensionNode

*__summary__*: Returns true if node is an Extension 2-item node

*__description__*: Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)

**Parameters:**

| Name | Type |
| ------ | ------ |
| node | [Node](_types_.md#node) |

**Returns:** `boolean`

___
<a id="iskvnode"></a>

##  isKvNode

▸ **isKvNode**(node: *[Node](_types_.md#node)*): `boolean`

*Defined in [util/is.ts:25](https://github.com/polkadot-js/common/blob/b15abe1/packages/trie-db/src/util/is.ts#L25)*

*__name__*: isKvNode

*__summary__*: Returns true if node is not empty and contains a single key/value pair

*__description__*: Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)

**Parameters:**

| Name | Type |
| ------ | ------ |
| node | [Node](_types_.md#node) |

**Returns:** `boolean`

___
<a id="isleafnode"></a>

##  isLeafNode

▸ **isLeafNode**(node: *[Node](_types_.md#node)*): `boolean`

*Defined in [util/is.ts:43](https://github.com/polkadot-js/common/blob/b15abe1/packages/trie-db/src/util/is.ts#L43)*

*__name__*: isLeafNode

*__summary__*: Returns true if node is an Leaf 2-item node

*__description__*: Refer to [Merkle Patricia Trie specification](https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization)

**Parameters:**

| Name | Type |
| ------ | ------ |
| node | [Node](_types_.md#node) |

**Returns:** `boolean`

___

