[@polkadot/util](../README.md) > ["trie-db/src/util/taskExecutor"](../modules/_trie_db_src_util_taskexecutor_.md)

# External module: "trie-db/src/util/taskExecutor"

## Index

### Type aliases

* [Task](_trie_db_src_util_taskexecutor_.md#task)
* [Task$Fn](_trie_db_src_util_taskexecutor_.md#task_fn)

### Functions

* [taskExecutor](_trie_db_src_util_taskexecutor_.md#taskexecutor)

---

## Type aliases

<a id="task"></a>

###  Task

**ΤTask**: *`object`*

*Defined in [trie-db/src/util/taskExecutor.ts:8](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/util/taskExecutor.ts#L8)*

#### Type declaration

 fn: [Task$Fn](_trie_db_src_util_taskexecutor_.md#task_fn)

 priority: `number`

 reject: `function`

▸(error: *`Error`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| error | `Error` |

**Returns:** `void`

 resolve: `function`

▸(value: *`any`*): `void`

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `void`

___
<a id="task_fn"></a>

###  Task$Fn

**ΤTask$Fn**: *`function`*

*Defined in [trie-db/src/util/taskExecutor.ts:6](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/util/taskExecutor.ts#L6)*

#### Type declaration
▸(taskCb: *`function`*): `any`

**Parameters:**

| Param | Type |
| ------ | ------ |
| taskCb | `function` |

**Returns:** `any`

___

## Functions

<a id="taskexecutor"></a>

###  taskExecutor

▸ **taskExecutor**(maxPoolSize: *`number`*): `(Anonymous function)`

*Defined in [trie-db/src/util/taskExecutor.ts:16](https://github.com/polkadot-js/util/blob/7550b44/packages/trie-db/src/util/taskExecutor.ts#L16)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| maxPoolSize | `number` |

**Returns:** `(Anonymous function)`

___

