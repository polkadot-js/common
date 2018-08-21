[@polkadot/util](../README.md) > ["trie-db/src/BaseTrie"](../modules/_trie_db_src_basetrie_.md) > [BaseTrie](../classes/_trie_db_src_basetrie_.basetrie.md)

# Class: BaseTrie

## Hierarchy

**BaseTrie**

↳  [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md)

## Index

### Constructors

* [constructor](_trie_db_src_basetrie_.basetrie.md#constructor)

### Properties

* [_getDBs](_trie_db_src_basetrie_.basetrie.md#_getdbs)
* [_putDBs](_trie_db_src_basetrie_.basetrie.md#_putdbs)
* [_root](_trie_db_src_basetrie_.basetrie.md#_root)
* [db](_trie_db_src_basetrie_.basetrie.md#db)
* [dbDown](_trie_db_src_basetrie_.basetrie.md#dbdown)
* [hashing](_trie_db_src_basetrie_.basetrie.md#hashing)
* [nodeFactory](_trie_db_src_basetrie_.basetrie.md#nodefactory)
* [putRaw](_trie_db_src_basetrie_.basetrie.md#putraw)
* [semaphore](_trie_db_src_basetrie_.basetrie.md#semaphore)

### Accessors

* [root](_trie_db_src_basetrie_.basetrie.md#root)

### Methods

* [_batchNodes](_trie_db_src_basetrie_.basetrie.md#_batchnodes)
* [_createInitialNode](_trie_db_src_basetrie_.basetrie.md#_createinitialnode)
* [_deleteNode](_trie_db_src_basetrie_.basetrie.md#_deletenode)
* [_findDbNodes](_trie_db_src_basetrie_.basetrie.md#_finddbnodes)
* [_findValueNodes](_trie_db_src_basetrie_.basetrie.md#_findvaluenodes)
* [_formatNode](_trie_db_src_basetrie_.basetrie.md#_formatnode)
* [_lookupNode](_trie_db_src_basetrie_.basetrie.md#_lookupnode)
* [_putNode](_trie_db_src_basetrie_.basetrie.md#_putnode)
* [_putRaw](_trie_db_src_basetrie_.basetrie.md#_putraw)
* [_saveStack](_trie_db_src_basetrie_.basetrie.md#_savestack)
* [_updateNode](_trie_db_src_basetrie_.basetrie.md#_updatenode)
* [_walkTrie](_trie_db_src_basetrie_.basetrie.md#_walktrie)
* [batch](_trie_db_src_basetrie_.basetrie.md#batch)
* [checkRoot](_trie_db_src_basetrie_.basetrie.md#checkroot)
* [copy](_trie_db_src_basetrie_.basetrie.md#copy)
* [createReadStream](_trie_db_src_basetrie_.basetrie.md#createreadstream)
* [del](_trie_db_src_basetrie_.basetrie.md#del)
* [delRaw](_trie_db_src_basetrie_.basetrie.md#delraw)
* [findPath](_trie_db_src_basetrie_.basetrie.md#findpath)
* [get](_trie_db_src_basetrie_.basetrie.md#get)
* [getRaw](_trie_db_src_basetrie_.basetrie.md#getraw)
* [put](_trie_db_src_basetrie_.basetrie.md#put)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new BaseTrie**(db: *`any`*, root?: *`Uint8Array`*, hashing?: *`HashFn`*): [BaseTrie](_trie_db_src_basetrie_.basetrie.md)

*Defined in [trie-db/src/BaseTrie.ts:43](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L43)*

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| db | `any` | - |
| `Default value` root | `Uint8Array` |  EMPTY_ROOT_U8A |
| `Default value` hashing | `HashFn` |  keccakAsU8a |

**Returns:** [BaseTrie](_trie_db_src_basetrie_.basetrie.md)

___

## Properties

<a id="_getdbs"></a>

###  _getDBs

**● _getDBs**: *`any`[]*

*Defined in [trie-db/src/BaseTrie.ts:36](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L36)*

___
<a id="_putdbs"></a>

###  _putDBs

**● _putDBs**: *`any`[]*

*Defined in [trie-db/src/BaseTrie.ts:37](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L37)*

___
<a id="_root"></a>

###  _root

**● _root**: *`Uint8Array`*

*Defined in [trie-db/src/BaseTrie.ts:35](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L35)*

___
<a id="db"></a>

###  db

**● db**: *`any`*

*Defined in [trie-db/src/BaseTrie.ts:39](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L39)*

___
<a id="dbdown"></a>

###  dbDown

**● dbDown**: *`any`*

*Defined in [trie-db/src/BaseTrie.ts:38](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L38)*

___
<a id="hashing"></a>

###  hashing

**● hashing**: *`HashFn`*

*Defined in [trie-db/src/BaseTrie.ts:40](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L40)*

___
<a id="nodefactory"></a>

###  nodeFactory

**● nodeFactory**: *`NodeFactory`*

*Defined in [trie-db/src/BaseTrie.ts:41](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L41)*

___
<a id="putraw"></a>

###  putRaw

**● putRaw**: *[RawPutFn](../modules/_trie_db_src_basetrie_.md#rawputfn)*

*Defined in [trie-db/src/BaseTrie.ts:42](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L42)*

___
<a id="semaphore"></a>

###  semaphore

**● semaphore**: *`SemaphorePromise`*

*Defined in [trie-db/src/BaseTrie.ts:43](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L43)*

___

## Accessors

<a id="root"></a>

###  root

getroot(): `Uint8Array`setroot(value: *`Uint8Array`*): `void`

*Defined in [trie-db/src/BaseTrie.ts:60](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L60)*

**Returns:** `Uint8Array`

*Defined in [trie-db/src/BaseTrie.ts:64](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L64)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `Uint8Array` |

**Returns:** `void`

___

## Methods

<a id="_batchnodes"></a>

###  _batchNodes

▸ **_batchNodes**(opStack: *`any`*): `Promise`<`any`[]>

*Defined in [trie-db/src/BaseTrie.ts:222](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L222)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| opStack | `any` |

**Returns:** `Promise`<`any`[]>

___
<a id="_createinitialnode"></a>

###  _createInitialNode

▸ **_createInitialNode**(key: *`Uint8Array`*, value: *`Uint8Array`*): `Promise`<`any`[]>

*Defined in [trie-db/src/BaseTrie.ts:737](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L737)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |
| value | `Uint8Array` |

**Returns:** `Promise`<`any`[]>

___
<a id="_deletenode"></a>

###  _deleteNode

▸ **_deleteNode**(key: *`Uint8Array`*, stack: *`any`*): `Promise`< `undefined` &#124; `any`[]>

*Defined in [trie-db/src/BaseTrie.ts:608](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L608)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |
| stack | `any` |

**Returns:** `Promise`< `undefined` &#124; `any`[]>

___
<a id="_finddbnodes"></a>

###  _findDbNodes

▸ **_findDbNodes**(onFound: *`any`*, cb: *`any`*): `void`

*Defined in [trie-db/src/BaseTrie.ts:336](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L336)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| onFound | `any` |
| cb | `any` |

**Returns:** `void`

___
<a id="_findvaluenodes"></a>

###  _findValueNodes

▸ **_findValueNodes**(onFound: *`any`*, cb: *`any`*): `void`

*Defined in [trie-db/src/BaseTrie.ts:309](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L309)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| onFound | `any` |
| cb | `any` |

**Returns:** `void`

___
<a id="_formatnode"></a>

###  _formatNode

▸ **_formatNode**(node: *`any`*, topLevel: *`any`*, remove: *`any`*, opStack: *`any`*): `any`

*Defined in [trie-db/src/BaseTrie.ts:748](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L748)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| node | `any` |
| topLevel | `any` |
| remove | `any` |
| opStack | `any` |

**Returns:** `any`

___
<a id="_lookupnode"></a>

###  _lookupNode

▸ **_lookupNode**(node: *`any`*): `Promise`< `Uint8Array` &#124; `Trie$Node`>

*Defined in [trie-db/src/BaseTrie.ts:168](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L168)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| node | `any` |

**Returns:** `Promise`< `Uint8Array` &#124; `Trie$Node`>

___
<a id="_putnode"></a>

###  _putNode

▸ **_putNode**(node: *`any`*): `Promise`<`any`[]>

*Defined in [trie-db/src/BaseTrie.ts:213](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L213)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| node | `any` |

**Returns:** `Promise`<`any`[]>

___
<a id="_putraw"></a>

###  _putRaw

▸ **_putRaw**(key: *`Uint8Array`*, value: *`Uint8Array`*): `Promise`<`any`[]>

*Defined in [trie-db/src/BaseTrie.ts:189](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L189)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |
| value | `Uint8Array` |

**Returns:** `Promise`<`any`[]>

___
<a id="_savestack"></a>

###  _saveStack

▸ **_saveStack**(key: *`any`*, stack: *`any`*, opStack: *`any`[]*): `Promise`<`any`[]>

*Defined in [trie-db/src/BaseTrie.ts:574](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L574)*

saves a stack
*__method__*: _saveStack

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `any` |  the key. Should follow the stack |
| stack | `any` |  a stack of nodes to the value given by the key |
| opStack | `any`[] |  a stack of levelup operations to commit at the end of this funciton |

**Returns:** `Promise`<`any`[]>

___
<a id="_updatenode"></a>

###  _updateNode

▸ **_updateNode**(key: *`any`*, value: *`any`*, keyRemainder: *`any`*, stack: *`any`*): `Promise`<`any`[]>

*Defined in [trie-db/src/BaseTrie.ts:357](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L357)*

Updates a node
*__method__*: _updateNode

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `any` |  - |
| value | `any` |  - |
| keyRemainder | `any` |  - |
| stack | `any` |  - |

**Returns:** `Promise`<`any`[]>

___
<a id="_walktrie"></a>

###  _walkTrie

▸ **_walkTrie**(root: *`any`*, onNode: *`any`*, onDone: *`any`*): `Promise`<`void`>

*Defined in [trie-db/src/BaseTrie.ts:464](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L464)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| root | `any` |
| onNode | `any` |
| onDone | `any` |

**Returns:** `Promise`<`void`>

___
<a id="batch"></a>

###  batch

▸ **batch**(ops: *`any`[]*): `Promise`<`any`[]>

*Defined in [trie-db/src/BaseTrie.ts:813](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L813)*

The given hash of operations (key additions or deletions) are executed on the DB
*__method__*: batch

*__example__*: const ops = \[ { type: 'del', key: 'father' } , { type: 'put', key: 'name', value: 'Yuri Irsenovich Kim' } , { type: 'put', key: 'dob', value: '16 February 1941' } , { type: 'put', key: 'spouse', value: 'Kim Young-sook' } , { type: 'put', key: 'occupation', value: 'Clown' } \] trie.batch(ops)

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| ops | `any`[] |  - |

**Returns:** `Promise`<`any`[]>

___
<a id="checkroot"></a>

###  checkRoot

▸ **checkRoot**(root: *`Uint8Array`*): `Promise`<`boolean`>

*Defined in [trie-db/src/BaseTrie.ts:832](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L832)*

Checks if a given root exists
*__method__*: checkRoot

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| root | `Uint8Array` |  - |

**Returns:** `Promise`<`boolean`>

___
<a id="copy"></a>

###  copy

▸ **copy**(): [BaseTrie](_trie_db_src_basetrie_.basetrie.md)

*Defined in [trie-db/src/BaseTrie.ts:791](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L791)*

**Returns:** [BaseTrie](_trie_db_src_basetrie_.basetrie.md)

___
<a id="createreadstream"></a>

###  createReadStream

▸ **createReadStream**(): [TrieReadStream](_trie_db_src_streams_trieread_.triereadstream.md)

*Defined in [trie-db/src/BaseTrie.ts:785](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L785)*

The `data` event is given an `Object` hat has two properties; the `key` and the `value`. Both should be Buffers.
*__method__*: createReadStream

**Returns:** [TrieReadStream](_trie_db_src_streams_trieread_.triereadstream.md)
Returns a [stream](https://nodejs.org/dist/latest-v5.x/docs/api/stream.html#stream_class_stream_readable) of the contents of the `trie`

___
<a id="del"></a>

###  del

▸ **del**(key: *`Uint8Array`*): `Promise`<`any`>

*Defined in [trie-db/src/BaseTrie.ts:126](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L126)*

deletes a value given a `key`
*__method__*: del

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `Uint8Array` |  - |

**Returns:** `Promise`<`any`>

___
<a id="delraw"></a>

###  delRaw

▸ **delRaw**(key: *`Uint8Array`*): `Promise`<`any`[]>

*Defined in [trie-db/src/BaseTrie.ts:203](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L203)*

Removes a raw value in the underlying db
*__method__*: delRaw

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `Uint8Array` |  - |

**Returns:** `Promise`<`any`[]>

___
<a id="findpath"></a>

###  findPath

▸ **findPath**(_targetKey: *`any`*): `Promise`<`any`>

*Defined in [trie-db/src/BaseTrie.ts:243](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L243)*

Trys to find a path to the node for the given key It returns a `stack` of nodes to the closet node
*__method__*: findPath

**Parameters:**

| Param | Type |
| ------ | ------ |
| _targetKey | `any` |

**Returns:** `Promise`<`any`>

___
<a id="get"></a>

###  get

▸ **get**(key: *`Uint8Array`*): `Promise`< `Uint8Array` &#124; `null`>

*Defined in [trie-db/src/BaseTrie.ts:80](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L80)*

Gets a value given a `key`
*__method__*: get

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `Uint8Array` |  the key to search for |

**Returns:** `Promise`< `Uint8Array` &#124; `null`>

___
<a id="getraw"></a>

###  getRaw

▸ **getRaw**(key: *`Uint8Array`*): `Promise`<`Uint8Array`>

*Defined in [trie-db/src/BaseTrie.ts:144](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L144)*

Retrieves a raw value in the underlying db
*__method__*: getRaw

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `Uint8Array` |  - |

**Returns:** `Promise`<`Uint8Array`>

___
<a id="put"></a>

###  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `Promise`<`any`>

*Defined in [trie-db/src/BaseTrie.ts:101](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L101)*

Stores a given `value` at the given `key`
*__method__*: put

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| key | `Uint8Array` |  - |
| value | `Uint8Array` |

**Returns:** `Promise`<`any`>
Promise<void>

___

