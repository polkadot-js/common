[@polkadot/util](../README.md) > ["trie-db/src/index"](../modules/_trie_db_src_index_.md) > [Trie](../classes/_trie_db_src_index_.trie.md)

# Class: Trie

## Hierarchy

↳  [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md)

**↳ Trie**

## Index

### Constructors

* [constructor](_trie_db_src_index_.trie.md#constructor)

### Properties

* [__putDBs](_trie_db_src_index_.trie.md#__putdbs)
* [_checkpoints](_trie_db_src_index_.trie.md#_checkpoints)
* [_getDBs](_trie_db_src_index_.trie.md#_getdbs)
* [_putDBs](_trie_db_src_index_.trie.md#_putdbs)
* [_root](_trie_db_src_index_.trie.md#_root)
* [_scratch](_trie_db_src_index_.trie.md#_scratch)
* [db](_trie_db_src_index_.trie.md#db)
* [dbDown](_trie_db_src_index_.trie.md#dbdown)
* [hashing](_trie_db_src_index_.trie.md#hashing)
* [nodeFactory](_trie_db_src_index_.trie.md#nodefactory)
* [putRaw](_trie_db_src_index_.trie.md#putraw)
* [semaphore](_trie_db_src_index_.trie.md#semaphore)
* [prove](_trie_db_src_index_.trie.md#prove)
* [verifyProof](_trie_db_src_index_.trie.md#verifyproof)

### Accessors

* [isCheckpoint](_trie_db_src_index_.trie.md#ischeckpoint)
* [root](_trie_db_src_index_.trie.md#root)

### Methods

* [_batchNodes](_trie_db_src_index_.trie.md#_batchnodes)
* [_createInitialNode](_trie_db_src_index_.trie.md#_createinitialnode)
* [_deleteNode](_trie_db_src_index_.trie.md#_deletenode)
* [_enterCpMode](_trie_db_src_index_.trie.md#_entercpmode)
* [_exitCpMode](_trie_db_src_index_.trie.md#_exitcpmode)
* [_findDbNodes](_trie_db_src_index_.trie.md#_finddbnodes)
* [_findValueNodes](_trie_db_src_index_.trie.md#_findvaluenodes)
* [_formatNode](_trie_db_src_index_.trie.md#_formatnode)
* [_lookupNode](_trie_db_src_index_.trie.md#_lookupnode)
* [_putNode](_trie_db_src_index_.trie.md#_putnode)
* [_putRaw](_trie_db_src_index_.trie.md#_putraw)
* [_saveStack](_trie_db_src_index_.trie.md#_savestack)
* [_updateNode](_trie_db_src_index_.trie.md#_updatenode)
* [_walkTrie](_trie_db_src_index_.trie.md#_walktrie)
* [batch](_trie_db_src_index_.trie.md#batch)
* [checkRoot](_trie_db_src_index_.trie.md#checkroot)
* [checkpoint](_trie_db_src_index_.trie.md#checkpoint)
* [commit](_trie_db_src_index_.trie.md#commit)
* [copy](_trie_db_src_index_.trie.md#copy)
* [createReadStream](_trie_db_src_index_.trie.md#createreadstream)
* [createScratchReadStream](_trie_db_src_index_.trie.md#createscratchreadstream)
* [del](_trie_db_src_index_.trie.md#del)
* [delRaw](_trie_db_src_index_.trie.md#delraw)
* [findPath](_trie_db_src_index_.trie.md#findpath)
* [get](_trie_db_src_index_.trie.md#get)
* [getRaw](_trie_db_src_index_.trie.md#getraw)
* [put](_trie_db_src_index_.trie.md#put)
* [revert](_trie_db_src_index_.trie.md#revert)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Trie**(db: *`any`*, root?: *`Uint8Array`*, hashing?: *`HashFn`*): [Trie](_trie_db_src_index_.trie.md)

*Overrides [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md).[constructor](_trie_db_src_checkpointtrie_.checkpointtrie.md#constructor)*

*Defined in [trie-db/src/index.ts:16](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/index.ts#L16)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| db | `any` |
| `Optional` root | `Uint8Array` |
| `Optional` hashing | `HashFn` |

**Returns:** [Trie](_trie_db_src_index_.trie.md)

___

## Properties

<a id="__putdbs"></a>

###  __putDBs

**● __putDBs**: *`any`[]*

*Inherited from [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md).[__putDBs](_trie_db_src_checkpointtrie_.checkpointtrie.md#__putdbs)*

*Defined in [trie-db/src/CheckpointTrie.ts:36](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/CheckpointTrie.ts#L36)*

___
<a id="_checkpoints"></a>

###  _checkpoints

**● _checkpoints**: *`Array`<`Uint8Array`>*

*Inherited from [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md).[_checkpoints](_trie_db_src_checkpointtrie_.checkpointtrie.md#_checkpoints)*

*Defined in [trie-db/src/CheckpointTrie.ts:33](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/CheckpointTrie.ts#L33)*

___
<a id="_getdbs"></a>

###  _getDBs

**● _getDBs**: *`any`[]*

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_getDBs](_trie_db_src_basetrie_.basetrie.md#_getdbs)*

*Defined in [trie-db/src/BaseTrie.ts:36](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L36)*

___
<a id="_putdbs"></a>

###  _putDBs

**● _putDBs**: *`any`[]*

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_putDBs](_trie_db_src_basetrie_.basetrie.md#_putdbs)*

*Defined in [trie-db/src/BaseTrie.ts:37](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L37)*

___
<a id="_root"></a>

###  _root

**● _root**: *`Uint8Array`*

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_root](_trie_db_src_basetrie_.basetrie.md#_root)*

*Defined in [trie-db/src/BaseTrie.ts:35](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L35)*

___
<a id="_scratch"></a>

###  _scratch

**● _scratch**: *`any`*

*Inherited from [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md).[_scratch](_trie_db_src_checkpointtrie_.checkpointtrie.md#_scratch)*

*Defined in [trie-db/src/CheckpointTrie.ts:34](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/CheckpointTrie.ts#L34)*

___
<a id="db"></a>

###  db

**● db**: *`any`*

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[db](_trie_db_src_basetrie_.basetrie.md#db)*

*Defined in [trie-db/src/BaseTrie.ts:39](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L39)*

___
<a id="dbdown"></a>

###  dbDown

**● dbDown**: *`any`*

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[dbDown](_trie_db_src_basetrie_.basetrie.md#dbdown)*

*Defined in [trie-db/src/BaseTrie.ts:38](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L38)*

___
<a id="hashing"></a>

###  hashing

**● hashing**: *`HashFn`*

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[hashing](_trie_db_src_basetrie_.basetrie.md#hashing)*

*Defined in [trie-db/src/BaseTrie.ts:40](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L40)*

___
<a id="nodefactory"></a>

###  nodeFactory

**● nodeFactory**: *`NodeFactory`*

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[nodeFactory](_trie_db_src_basetrie_.basetrie.md#nodefactory)*

*Defined in [trie-db/src/BaseTrie.ts:41](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L41)*

___
<a id="putraw"></a>

###  putRaw

**● putRaw**: *[RawPutFn](../modules/_trie_db_src_basetrie_.md#rawputfn)*

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[putRaw](_trie_db_src_basetrie_.basetrie.md#putraw)*

*Defined in [trie-db/src/BaseTrie.ts:42](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L42)*

___
<a id="semaphore"></a>

###  semaphore

**● semaphore**: *`SemaphorePromise`*

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[semaphore](_trie_db_src_basetrie_.basetrie.md#semaphore)*

*Defined in [trie-db/src/BaseTrie.ts:43](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L43)*

___
<a id="prove"></a>

### `<Static>` prove

**● prove**: *[prove](../modules/_trie_db_src_proof_prove_.md#prove)* =  prove

*Defined in [trie-db/src/index.ts:15](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/index.ts#L15)*

___
<a id="verifyproof"></a>

### `<Static>` verifyProof

**● verifyProof**: *[verifyProof](../modules/_trie_db_src_proof_verifyproof_.md#verifyproof)* =  verifyProof

*Defined in [trie-db/src/index.ts:16](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/index.ts#L16)*

___

## Accessors

<a id="ischeckpoint"></a>

###  isCheckpoint

getisCheckpoint(): `boolean`

*Inherited from [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md).[isCheckpoint](_trie_db_src_checkpointtrie_.checkpointtrie.md#ischeckpoint)*

*Defined in [trie-db/src/CheckpointTrie.ts:48](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/CheckpointTrie.ts#L48)*

**Returns:** `boolean`

___
<a id="root"></a>

###  root

getroot(): `Uint8Array`setroot(value: *`Uint8Array`*): `void`

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[root](_trie_db_src_basetrie_.basetrie.md#root)*

*Defined in [trie-db/src/BaseTrie.ts:60](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L60)*

**Returns:** `Uint8Array`

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[root](_trie_db_src_basetrie_.basetrie.md#root)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_batchNodes](_trie_db_src_basetrie_.basetrie.md#_batchnodes)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_createInitialNode](_trie_db_src_basetrie_.basetrie.md#_createinitialnode)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_deleteNode](_trie_db_src_basetrie_.basetrie.md#_deletenode)*

*Defined in [trie-db/src/BaseTrie.ts:608](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L608)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |
| stack | `any` |

**Returns:** `Promise`< `undefined` &#124; `any`[]>

___
<a id="_entercpmode"></a>

###  _enterCpMode

▸ **_enterCpMode**(): `void`

*Inherited from [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md).[_enterCpMode](_trie_db_src_checkpointtrie_.checkpointtrie.md#_entercpmode)*

*Defined in [trie-db/src/CheckpointTrie.ts:117](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/CheckpointTrie.ts#L117)*

**Returns:** `void`

___
<a id="_exitcpmode"></a>

###  _exitCpMode

▸ **_exitCpMode**(commitState: *`any`*):  `undefined` &#124; `Promise`<`Object`[]>

*Inherited from [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md).[_exitCpMode](_trie_db_src_checkpointtrie_.checkpointtrie.md#_exitcpmode)*

*Defined in [trie-db/src/CheckpointTrie.ts:130](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/CheckpointTrie.ts#L130)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| commitState | `any` |

**Returns:**  `undefined` &#124; `Promise`<`Object`[]>

___
<a id="_finddbnodes"></a>

###  _findDbNodes

▸ **_findDbNodes**(onFound: *`any`*, cb: *`any`*): `void`

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_findDbNodes](_trie_db_src_basetrie_.basetrie.md#_finddbnodes)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_findValueNodes](_trie_db_src_basetrie_.basetrie.md#_findvaluenodes)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_formatNode](_trie_db_src_basetrie_.basetrie.md#_formatnode)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_lookupNode](_trie_db_src_basetrie_.basetrie.md#_lookupnode)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_putNode](_trie_db_src_basetrie_.basetrie.md#_putnode)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_putRaw](_trie_db_src_basetrie_.basetrie.md#_putraw)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_saveStack](_trie_db_src_basetrie_.basetrie.md#_savestack)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_updateNode](_trie_db_src_basetrie_.basetrie.md#_updatenode)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[_walkTrie](_trie_db_src_basetrie_.basetrie.md#_walktrie)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[batch](_trie_db_src_basetrie_.basetrie.md#batch)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[checkRoot](_trie_db_src_basetrie_.basetrie.md#checkroot)*

*Defined in [trie-db/src/BaseTrie.ts:832](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L832)*

Checks if a given root exists
*__method__*: checkRoot

**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| root | `Uint8Array` |  - |

**Returns:** `Promise`<`boolean`>

___
<a id="checkpoint"></a>

###  checkpoint

▸ **checkpoint**(): `Promise`<`void`>

*Inherited from [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md).[checkpoint](_trie_db_src_checkpointtrie_.checkpointtrie.md#checkpoint)*

*Defined in [trie-db/src/CheckpointTrie.ts:58](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/CheckpointTrie.ts#L58)*

**Returns:** `Promise`<`void`>

___
<a id="commit"></a>

###  commit

▸ **commit**(): `Promise`<`any`>

*Inherited from [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md).[commit](_trie_db_src_checkpointtrie_.checkpointtrie.md#commit)*

*Defined in [trie-db/src/CheckpointTrie.ts:70](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/CheckpointTrie.ts#L70)*

**Returns:** `Promise`<`any`>

___
<a id="copy"></a>

###  copy

▸ **copy**(): [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md)

*Inherited from [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md).[copy](_trie_db_src_checkpointtrie_.checkpointtrie.md#copy)*

*Overrides [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[copy](_trie_db_src_basetrie_.basetrie.md#copy)*

*Defined in [trie-db/src/CheckpointTrie.ts:52](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/CheckpointTrie.ts#L52)*

**Returns:** [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md)

___
<a id="createreadstream"></a>

###  createReadStream

▸ **createReadStream**(): [TrieReadStream](_trie_db_src_streams_trieread_.triereadstream.md)

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[createReadStream](_trie_db_src_basetrie_.basetrie.md#createreadstream)*

*Defined in [trie-db/src/BaseTrie.ts:785](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/BaseTrie.ts#L785)*

The `data` event is given an `Object` hat has two properties; the `key` and the `value`. Both should be Buffers.
*__method__*: createReadStream

**Returns:** [TrieReadStream](_trie_db_src_streams_trieread_.triereadstream.md)
Returns a [stream](https://nodejs.org/dist/latest-v5.x/docs/api/stream.html#stream_class_stream_readable) of the contents of the `trie`

___
<a id="createscratchreadstream"></a>

###  createScratchReadStream

▸ **createScratchReadStream**(scratch: *`any`*): [ScratchReadStream](_trie_db_src_streams_scratchread_.scratchreadstream.md)

*Inherited from [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md).[createScratchReadStream](_trie_db_src_checkpointtrie_.checkpointtrie.md#createscratchreadstream)*

*Defined in [trie-db/src/CheckpointTrie.ts:105](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/CheckpointTrie.ts#L105)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| scratch | `any` |

**Returns:** [ScratchReadStream](_trie_db_src_streams_scratchread_.scratchreadstream.md)

___
<a id="del"></a>

###  del

▸ **del**(key: *`Uint8Array`*): `Promise`<`any`>

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[del](_trie_db_src_basetrie_.basetrie.md#del)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[delRaw](_trie_db_src_basetrie_.basetrie.md#delraw)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[findPath](_trie_db_src_basetrie_.basetrie.md#findpath)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[get](_trie_db_src_basetrie_.basetrie.md#get)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[getRaw](_trie_db_src_basetrie_.basetrie.md#getraw)*

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

*Inherited from [BaseTrie](_trie_db_src_basetrie_.basetrie.md).[put](_trie_db_src_basetrie_.basetrie.md#put)*

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
<a id="revert"></a>

###  revert

▸ **revert**(): `Promise`<`any`>

*Inherited from [CheckpointTrie](_trie_db_src_checkpointtrie_.checkpointtrie.md).[revert](_trie_db_src_checkpointtrie_.checkpointtrie.md#revert)*

*Defined in [trie-db/src/CheckpointTrie.ts:86](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/CheckpointTrie.ts#L86)*

**Returns:** `Promise`<`any`>

___

