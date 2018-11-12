

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

⊕ **new Trie**(db?: *`TxDb`*, rootHash?: *`Uint8Array`*): [Trie](_index_.trie.md)

*Defined in [index.ts:33](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L33)*

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Optional` db | `TxDb` | - |
| `Default value` rootHash | `Uint8Array` |  EMPTY_HASH |

**Returns:** [Trie](_index_.trie.md)

___

# Properties

<a id="db"></a>

##  db

**● db**: *`TxDb`*

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[db](../interfaces/_types_.triedb.md#db)*

*Defined in [index.ts:31](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L31)*

___

# Methods

<a id="close"></a>

##  close

▸ **close**(): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[close](../interfaces/_types_.triedb.md#close)*

*Defined in [index.ts:81](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L81)*

**Returns:** `void`

___
<a id="del"></a>

##  del

▸ **del**(key: *`Uint8Array`*): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[del](../interfaces/_types_.triedb.md#del)*

*Defined in [index.ts:105](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L105)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `void`

___
<a id="drop"></a>

##  drop

▸ **drop**(): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[drop](../interfaces/_types_.triedb.md#drop)*

*Defined in [index.ts:89](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L89)*

**Returns:** `void`

___
<a id="empty"></a>

##  empty

▸ **empty**(): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[empty](../interfaces/_types_.triedb.md#empty)*

*Defined in [index.ts:85](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L85)*

**Returns:** `void`

___
<a id="get"></a>

##  get

▸ **get**(key: *`Uint8Array`*):  `Uint8Array` &#124; `null`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[get](../interfaces/_types_.triedb.md#get)*

*Defined in [index.ts:116](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L116)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:**  `Uint8Array` &#124; `null`

___
<a id="getnode"></a>

##  getNode

▸ **getNode**(hash?: *`Uint8Array`*): [Node](../modules/_types_.md#node)

*Defined in [index.ts:147](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L147)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` hash | `Uint8Array` |

**Returns:** [Node](../modules/_types_.md#node)

___
<a id="getroot"></a>

##  getRoot

▸ **getRoot**(): `Uint8Array`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[getRoot](../interfaces/_types_.triedb.md#getroot)*

*Defined in [index.ts:137](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L137)*

**Returns:** `Uint8Array`

___
<a id="maintain"></a>

##  maintain

▸ **maintain**(fn: *`ProgressCb`*): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[maintain](../interfaces/_types_.triedb.md#maintain)*

*Defined in [index.ts:93](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L93)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| fn | `ProgressCb` |

**Returns:** `void`

___
<a id="open"></a>

##  open

▸ **open**(): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[open](../interfaces/_types_.triedb.md#open)*

*Defined in [index.ts:77](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L77)*

**Returns:** `void`

___
<a id="put"></a>

##  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[put](../interfaces/_types_.triedb.md#put)*

*Defined in [index.ts:125](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L125)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |
| value | `Uint8Array` |

**Returns:** `void`

___
<a id="rename"></a>

##  rename

▸ **rename**(base: *`string`*, file: *`string`*): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[rename](../interfaces/_types_.triedb.md#rename)*

*Defined in [index.ts:97](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L97)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| base | `string` |
| file | `string` |

**Returns:** `void`

___
<a id="setroot"></a>

##  setRoot

▸ **setRoot**(rootHash: *`Uint8Array`*): `void`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[setRoot](../interfaces/_types_.triedb.md#setroot)*

*Defined in [index.ts:151](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L151)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| rootHash | `Uint8Array` |

**Returns:** `void`

___
<a id="size"></a>

##  size

▸ **size**(): `number`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[size](../interfaces/_types_.triedb.md#size)*

*Defined in [index.ts:101](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L101)*

**Returns:** `number`

___
<a id="snapshot"></a>

##  snapshot

▸ **snapshot**(dest: *[TrieDb](../interfaces/_types_.triedb.md)*, fn: *`ProgressCb`*): `number`

*Implementation of [TrieDb](../interfaces/_types_.triedb.md).[snapshot](../interfaces/_types_.triedb.md#snapshot)*

*Defined in [index.ts:156](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L156)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| dest | [TrieDb](../interfaces/_types_.triedb.md) |
| fn | `ProgressCb` |

**Returns:** `number`

___
<a id="transaction"></a>

##  transaction

▸ **transaction**(fn: *`function`*): `boolean`

*Defined in [index.ts:57](https://github.com/polkadot-js/common/blob/22f8df1/packages/trie-db/src/index.ts#L57)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** `boolean`

___

