

@polkadot/common/trie-db
========================

Overview
--------
*__name__*: Trie

*__summary__*: Re-implementation of a Patricia Trie

*__example__*: See [Polkadot-JS Common Trie-DB Examples](https://polkadot.js.org/api/common/examples/trie-db/)

# Hierarchy

**Trie**

# Implements

* [TrieDb](../interfaces/_types_.triedb.md)

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new Trie**(db?: *`TxDb`*, rootHash?: *`Uint8Array`*, codec?: *`Codec`*): [Trie](_index_.trie.md)

*Defined in [index.ts:36](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L36)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` db | `TxDb` |  new MemoryDb() |
| `Optional` rootHash | `Uint8Array` | - |
| `Default value` codec | `Codec` |  substrateCodec |

**Returns:** [Trie](_index_.trie.md)

___

# Properties

<a id="db"></a>

##  db

**● db**: *`TxDb`*

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[db](../interfaces/_types_.triedb.md#db)*

*Defined in [index.ts:32](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L32)*

___

# Methods

<a id="close"></a>

##  close

▸ **close**(): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[close](../interfaces/_types_.triedb.md#close)*

*Defined in [index.ts:88](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L88)*

**Returns:** `void`

___
<a id="del"></a>

##  del

▸ **del**(key: *`Uint8Array`*): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[del](../interfaces/_types_.triedb.md#del)*

*Defined in [index.ts:112](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L112)*

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

*Defined in [index.ts:96](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L96)*

**Returns:** `void`

___
<a id="empty"></a>

##  empty

▸ **empty**(): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[empty](../interfaces/_types_.triedb.md#empty)*

*Defined in [index.ts:92](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L92)*

**Returns:** `void`

___
<a id="get"></a>

##  get

▸ **get**(key: *`Uint8Array`*):  `Uint8Array` &#124; `null`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[get](../interfaces/_types_.triedb.md#get)*

*Defined in [index.ts:123](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L123)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:**  `Uint8Array` &#124; `null`

___
<a id="getnode"></a>

##  getNode

▸ **getNode**(hash?: *`Uint8Array`*): [Node](../modules/_types_.md#node)

*Defined in [index.ts:154](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L154)*

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

*Defined in [index.ts:144](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L144)*

**Returns:** `Uint8Array`

___
<a id="maintain"></a>

##  maintain

▸ **maintain**(fn: *`ProgressCb`*): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[maintain](../interfaces/_types_.triedb.md#maintain)*

*Defined in [index.ts:100](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L100)*

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

*Defined in [index.ts:84](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L84)*

**Returns:** `void`

___
<a id="put"></a>

##  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[put](../interfaces/_types_.triedb.md#put)*

*Defined in [index.ts:132](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L132)*

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

*Defined in [index.ts:104](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L104)*

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

*Defined in [index.ts:158](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L158)*

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

*Defined in [index.ts:108](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L108)*

**Returns:** `number`

___
<a id="snapshot"></a>

##  snapshot

▸ **snapshot**(dest: *[TrieDb](../interfaces/_types_.triedb.md)*, fn: *`ProgressCb`*): `number`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[snapshot](../interfaces/_types_.triedb.md#snapshot)*

*Defined in [index.ts:163](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L163)*

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

*Defined in [index.ts:64](https://github.com/polkadot-js/common/blob/e3b45e7/packages/trie-db/src/index.ts#L64)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** `boolean`

___

