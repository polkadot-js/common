[@polkadot/util](../README.md) > ["trie-db/src/Node"](../modules/_trie_db_src_node_.md) > [TrieNode](../classes/_trie_db_src_node_.trienode.md)

# Class: TrieNode

## Hierarchy

**TrieNode**

## Index

### Constructors

* [constructor](_trie_db_src_node_.trienode.md#constructor)

### Properties

* [hashing](_trie_db_src_node_.trienode.md#hashing)
* [raw](_trie_db_src_node_.trienode.md#raw)
* [type](_trie_db_src_node_.trienode.md#type)

### Accessors

* [key](_trie_db_src_node_.trienode.md#key)
* [value](_trie_db_src_node_.trienode.md#value)

### Methods

* [getChildren](_trie_db_src_node_.trienode.md#getchildren)
* [getKey](_trie_db_src_node_.trienode.md#getkey)
* [getValue](_trie_db_src_node_.trienode.md#getvalue)
* [hash](_trie_db_src_node_.trienode.md#hash)
* [serialize](_trie_db_src_node_.trienode.md#serialize)
* [setKey](_trie_db_src_node_.trienode.md#setkey)
* [setValue](_trie_db_src_node_.trienode.md#setvalue)
* [toString](_trie_db_src_node_.trienode.md#tostring)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new TrieNode**(hashing: *`HashFn`*, type: *`Trie$Node$Type`*, raw: *`DecodedRlp`*): [TrieNode](_trie_db_src_node_.trienode.md)

*Defined in [trie-db/src/Node.ts:41](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L41)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| hashing | `HashFn` |
| type | `Trie$Node$Type` |
| raw | `DecodedRlp` |

**Returns:** [TrieNode](_trie_db_src_node_.trienode.md)

___

## Properties

<a id="hashing"></a>

###  hashing

**● hashing**: *`HashFn`*

*Defined in [trie-db/src/Node.ts:39](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L39)*

___
<a id="raw"></a>

###  raw

**● raw**: *`DecodedRlp`*

*Defined in [trie-db/src/Node.ts:40](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L40)*

___
<a id="type"></a>

###  type

**● type**: *`Trie$Node$Type`*

*Defined in [trie-db/src/Node.ts:41](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L41)*

___

## Accessors

<a id="key"></a>

###  key

getkey():  `undefined` &#124; `Uint8Array`setkey(k: * `undefined` &#124; `Uint8Array`*): `void`

*Defined in [trie-db/src/Node.ts:57](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L57)*

**Returns:**  `undefined` &#124; `Uint8Array`

*Defined in [trie-db/src/Node.ts:61](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L61)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| k |  `undefined` &#124; `Uint8Array`|

**Returns:** `void`

___
<a id="value"></a>

###  value

getvalue(): `any`setvalue(v: *`any`*): `void`

*Defined in [trie-db/src/Node.ts:49](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L49)*

**Returns:** `any`

*Defined in [trie-db/src/Node.ts:53](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L53)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| v | `any` |

**Returns:** `void`

___

## Methods

<a id="getchildren"></a>

###  getChildren

▸ **getChildren**(): `any`[][]

*Defined in [trie-db/src/Node.ts:145](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L145)*

**Returns:** `any`[][]

___
<a id="getkey"></a>

###  getKey

▸ **getKey**():  `undefined` &#124; `Uint8Array`

*Defined in [trie-db/src/Node.ts:110](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L110)*

**Returns:**  `undefined` &#124; `Uint8Array`

___
<a id="getvalue"></a>

###  getValue

▸ **getValue**(key?: * `undefined` &#124; `number`*): `any`

*Defined in [trie-db/src/Node.ts:80](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L80)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` key |  `undefined` &#124; `number`|

**Returns:** `any`

___
<a id="hash"></a>

###  hash

▸ **hash**(): `Uint8Array`

*Defined in [trie-db/src/Node.ts:123](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L123)*

**Returns:** `Uint8Array`

___
<a id="serialize"></a>

###  serialize

▸ **serialize**(): `Uint8Array`

*Defined in [trie-db/src/Node.ts:119](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L119)*

**Returns:** `Uint8Array`

___
<a id="setkey"></a>

###  setKey

▸ **setKey**(key: * `Array`<`number`> &#124; `Uint8Array`*): `void`

*Defined in [trie-db/src/Node.ts:97](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L97)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key |  `Array`<`number`> &#124; `Uint8Array`|

**Returns:** `void`

___
<a id="setvalue"></a>

###  setValue

▸ **setValue**(key: * `number` &#124; `Uint8Array`*, value?: *`Uint8Array`*): `void`

*Defined in [trie-db/src/Node.ts:66](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L66)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key |  `number` &#124; `Uint8Array`|
| `Optional` value | `Uint8Array` |

**Returns:** `void`

___
<a id="tostring"></a>

###  toString

▸ **toString**(): `string`

*Defined in [trie-db/src/Node.ts:127](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/Node.ts#L127)*

**Returns:** `string`

___

