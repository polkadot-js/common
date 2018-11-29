

# Hierarchy

**NodeHeader**

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new NodeHeader**(input?: * `null` &#124; `Uint8Array` &#124; `Array`< `null` &#124; `Uint8Array`>*): [NodeHeader](_nodeheader_.nodeheader.md)

*Defined in [NodeHeader.ts:40](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-codec/src/NodeHeader.ts#L40)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` input |  `null` &#124; `Uint8Array` &#124; `Array`< `null` &#124; `Uint8Array`>|

**Returns:** [NodeHeader](_nodeheader_.nodeheader.md)

___

# Accessors

<a id="encodedlength"></a>

##  encodedLength

getencodedLength(): `number`

*Defined in [NodeHeader.ts:127](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-codec/src/NodeHeader.ts#L127)*

**Returns:** `number`

___
<a id="nodetype"></a>

##  nodeType

getnodeType(): `number`

*Defined in [NodeHeader.ts:149](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-codec/src/NodeHeader.ts#L149)*

**Returns:** `number`

___
<a id="value"></a>

##  value

getvalue():  [Null](_nodeheader_.null.md) &#124; [BranchHeader](_nodeheader_.branchheader.md) &#124; [ExtensionHeader](_nodeheader_.extensionheader.md) &#124; [LeafHeader](_nodeheader_.leafheader.md)

*Defined in [NodeHeader.ts:153](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-codec/src/NodeHeader.ts#L153)*

**Returns:**  [Null](_nodeheader_.null.md) &#124; [BranchHeader](_nodeheader_.branchheader.md) &#124; [ExtensionHeader](_nodeheader_.extensionheader.md) &#124; [LeafHeader](_nodeheader_.leafheader.md)

___

# Methods

<a id="tou8a"></a>

##  toU8a

▸ **toU8a**(): `Uint8Array`

*Defined in [NodeHeader.ts:157](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-codec/src/NodeHeader.ts#L157)*

**Returns:** `Uint8Array`

___

