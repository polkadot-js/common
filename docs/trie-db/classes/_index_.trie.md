

@polkadot/common/trie-db
========================

Overview
--------
*__name__*: Trie

*__summary__*: Re-implementation of a Patricia Trie

*__example__*: See [Polkadot-JS Common Trie-DB Examples](https://polkadot.js.org/api/common/examples/trie-db/)

# Hierarchy

↳  [Impl](_impl_.impl.md)

**↳ Trie**

# Implements

* [TrieDb](../interfaces/_types_.triedb.md)

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new Trie**(db?: *`TxDb`*, rootHash?: *`Uint8Array`*, codec?: *`Codec`*): [Trie](_index_.trie.md)

*Overrides [Impl](_impl_.impl.md).[constructor](_impl_.impl.md#constructor)*

*Defined in [index.ts:27](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L27)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` db | `TxDb` |  new MemoryDb() |
| `Optional` rootHash | `Uint8Array` | - |
| `Optional` codec | `Codec` | - |

**Returns:** [Trie](_index_.trie.md)

___

# Properties

<a id="db"></a>

##  db

**● db**: *`TxDb`*

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[db](../interfaces/_types_.triedb.md#db)*

*Inherited from [Impl](_impl_.impl.md).[db](_impl_.impl.md#db)*

*Defined in [Impl.ts:36](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/Impl.ts#L36)*

___

# Methods

<a id="close"></a>

##  close

▸ **close**(): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[close](../interfaces/_types_.triedb.md#close)*

*Defined in [index.ts:58](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L58)*

**Returns:** `void`

___
<a id="del"></a>

##  del

▸ **del**(key: *`Uint8Array`*): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[del](../interfaces/_types_.triedb.md#del)*

*Defined in [index.ts:82](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L82)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `void`

___
<a id="drop"></a>

##  drop

▸ **drop**(): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[drop](../interfaces/_types_.triedb.md#drop)*

*Defined in [index.ts:66](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L66)*

**Returns:** `void`

___
<a id="empty"></a>

##  empty

▸ **empty**(): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[empty](../interfaces/_types_.triedb.md#empty)*

*Defined in [index.ts:62](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L62)*

**Returns:** `void`

___
<a id="get"></a>

##  get

▸ **get**(key: *`Uint8Array`*): `Uint8Array` | `null`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[get](../interfaces/_types_.triedb.md#get)*

*Defined in [index.ts:93](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L93)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `Uint8Array` | `null`

___
<a id="getnode"></a>

##  getNode

▸ **getNode**(hash?: *`Uint8Array`*): [Node](../modules/_types_.md#node)

*Defined in [index.ts:124](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L124)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` hash | `Uint8Array` |

**Returns:** [Node](../modules/_types_.md#node)

___
<a id="getroot"></a>

##  getRoot

▸ **getRoot**(): `Uint8Array`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[getRoot](../interfaces/_types_.triedb.md#getroot)*

*Defined in [index.ts:114](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L114)*

**Returns:** `Uint8Array`

___
<a id="maintain"></a>

##  maintain

▸ **maintain**(fn: *`ProgressCb`*): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[maintain](../interfaces/_types_.triedb.md#maintain)*

*Defined in [index.ts:70](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L70)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `ProgressCb` |

**Returns:** `void`

___
<a id="open"></a>

##  open

▸ **open**(): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[open](../interfaces/_types_.triedb.md#open)*

*Defined in [index.ts:54](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L54)*

**Returns:** `void`

___
<a id="put"></a>

##  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[put](../interfaces/_types_.triedb.md#put)*

*Defined in [index.ts:102](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L102)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |
| value | `Uint8Array` |

**Returns:** `void`

___
<a id="rename"></a>

##  rename

▸ **rename**(base: *`string`*, file: *`string`*): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[rename](../interfaces/_types_.triedb.md#rename)*

*Defined in [index.ts:74](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L74)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| base | `string` |
| file | `string` |

**Returns:** `void`

___
<a id="setroot"></a>

##  setRoot

▸ **setRoot**(rootHash: *`Uint8Array`*): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[setRoot](../interfaces/_types_.triedb.md#setroot)*

*Defined in [index.ts:128](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L128)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| rootHash | `Uint8Array` |

**Returns:** `void`

___
<a id="size"></a>

##  size

▸ **size**(): `number`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[size](../interfaces/_types_.triedb.md#size)*

*Defined in [index.ts:78](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L78)*

**Returns:** `number`

___
<a id="snapshot"></a>

##  snapshot

▸ **snapshot**(dest: *[TrieDb](../interfaces/_types_.triedb.md)*, fn: *`ProgressCb`*): `number`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[snapshot](../interfaces/_types_.triedb.md#snapshot)*

*Defined in [index.ts:133](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L133)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| dest | [TrieDb](../interfaces/_types_.triedb.md) |
| fn | `ProgressCb` |

**Returns:** `number`

___
<a id="transaction"></a>

##  transaction

▸ **transaction**(fn: *`function`*): `boolean`

*Defined in [index.ts:34](https://github.com/polkadot-js/common/blob/74b37cf/packages/trie-db/src/index.ts#L34)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** `boolean`

___

