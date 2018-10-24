

*__name__*: MemoryDb

*__summary__*: Creates a MemoryDb database extending TransactionDb

*__description__*: Create an instance of a Memory database using MemoryDb and extending TransactionDb. `options` argument (optional) used to specifies whether to use compression.

*   Enable compression when storing "blocks" since they compress well.
*   Disable compression when storing "state" Transactions Trie using @polkadot/trie-db or @polkadot/db/src/engines/TransactionDb.ts (potentially LevelDb or RocksDb implementation of a Merkle Patricia Trie) data structure serialised with Recursive Length Prefix (RLP) encoding

*__example__*:   
```javascript
import stringToU8a from '@polkadot/util/string/toU8a';
import MemoryDb from '@polkadot/db/Memory';
import TransactionDb from '@polkadot/db/engines/TransactionDb';

const memoryDb = new MemoryDb();
const txDb = new TransactionDb(memoryDb);

// Open the memory database
memoryDb.open();

// Declare key/value pair to allocate to store under a the key
const key = stringToU8a('key');
const value = stringToU8a('some value');

// Store key/value pair in memory db
memoryDb.put(key, value);

// Retrieve value for key from memory db
valueRetrieved = memoryDb.get(key);

// Delete key/value pair from memory db
memoryDb.del(key);

// Transaction to Store key/value pair in transaction db
const isTxSuccess = txDb.transaction(() => {
  txDb.put(key, value);

  // Boolean to indicate whether transaction was successful or not
  return true;
});

console.log(`Transaction successful?: ${isTxSuccess}`);

// Retrieve transaction value from memory db
console.log(`Transfered value: ${memoryDb.get(key)}`);

// Close the memory database
memoryDb.close();
```

# Hierarchy

 [TransactionDb](_engines_transactiondb_.transactiondb.md)

**↳ Memory**

# Implements

* `TxDb`

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new Memory**(options?: *`BaseDbOptions`*): [Memory](_memory_.memory.md)

*Overrides [TransactionDb](_engines_transactiondb_.transactiondb.md).[constructor](_engines_transactiondb_.transactiondb.md#constructor)*

*Defined in [Memory.ts:66](https://github.com/polkadot-js/common/blob/5ce8f91/packages/db/src/Memory.ts#L66)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` options | `BaseDbOptions` |

**Returns:** [Memory](_memory_.memory.md)

___

# Methods

<a id="close"></a>

##  close

▸ **close**(): `void`

*Inherited from [TransactionDb](_engines_transactiondb_.transactiondb.md).[close](_engines_transactiondb_.transactiondb.md#close)*

*Defined in [engines/TransactionDb.ts:51](https://github.com/polkadot-js/common/blob/5ce8f91/packages/db/src/engines/TransactionDb.ts#L51)*

**Returns:** `void`

___
<a id="del"></a>

##  del

▸ **del**(key: *`Uint8Array`*): `void`

*Inherited from [TransactionDb](_engines_transactiondb_.transactiondb.md).[del](_engines_transactiondb_.transactiondb.md#del)*

*Defined in [engines/TransactionDb.ts:81](https://github.com/polkadot-js/common/blob/5ce8f91/packages/db/src/engines/TransactionDb.ts#L81)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `void`

___
<a id="drop"></a>

##  drop

▸ **drop**(): `void`

*Inherited from [TransactionDb](_engines_transactiondb_.transactiondb.md).[drop](_engines_transactiondb_.transactiondb.md#drop)*

*Defined in [engines/TransactionDb.ts:59](https://github.com/polkadot-js/common/blob/5ce8f91/packages/db/src/engines/TransactionDb.ts#L59)*

**Returns:** `void`

___
<a id="empty"></a>

##  empty

▸ **empty**(): `void`

*Inherited from [TransactionDb](_engines_transactiondb_.transactiondb.md).[empty](_engines_transactiondb_.transactiondb.md#empty)*

*Defined in [engines/TransactionDb.ts:63](https://github.com/polkadot-js/common/blob/5ce8f91/packages/db/src/engines/TransactionDb.ts#L63)*

**Returns:** `void`

___
<a id="get"></a>

##  get

▸ **get**(key: *`Uint8Array`*):  `Uint8Array` &#124; `null`

*Inherited from [TransactionDb](_engines_transactiondb_.transactiondb.md).[get](_engines_transactiondb_.transactiondb.md#get)*

*Defined in [engines/TransactionDb.ts:93](https://github.com/polkadot-js/common/blob/5ce8f91/packages/db/src/engines/TransactionDb.ts#L93)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:**  `Uint8Array` &#124; `null`

___
<a id="maintain"></a>

##  maintain

▸ **maintain**(fn: *`ProgressCb`*): `void`

*Inherited from [TransactionDb](_engines_transactiondb_.transactiondb.md).[maintain](_engines_transactiondb_.transactiondb.md#maintain)*

*Defined in [engines/TransactionDb.ts:71](https://github.com/polkadot-js/common/blob/5ce8f91/packages/db/src/engines/TransactionDb.ts#L71)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| fn | `ProgressCb` |

**Returns:** `void`

___
<a id="open"></a>

##  open

▸ **open**(): `void`

*Inherited from [TransactionDb](_engines_transactiondb_.transactiondb.md).[open](_engines_transactiondb_.transactiondb.md#open)*

*Defined in [engines/TransactionDb.ts:55](https://github.com/polkadot-js/common/blob/5ce8f91/packages/db/src/engines/TransactionDb.ts#L55)*

**Returns:** `void`

___
<a id="put"></a>

##  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `void`

*Inherited from [TransactionDb](_engines_transactiondb_.transactiondb.md).[put](_engines_transactiondb_.transactiondb.md#put)*

*Defined in [engines/TransactionDb.ts:107](https://github.com/polkadot-js/common/blob/5ce8f91/packages/db/src/engines/TransactionDb.ts#L107)*

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

*Inherited from [TransactionDb](_engines_transactiondb_.transactiondb.md).[rename](_engines_transactiondb_.transactiondb.md#rename)*

*Defined in [engines/TransactionDb.ts:67](https://github.com/polkadot-js/common/blob/5ce8f91/packages/db/src/engines/TransactionDb.ts#L67)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| base | `string` |
| file | `string` |

**Returns:** `void`

___
<a id="size"></a>

##  size

▸ **size**(): `number`

*Inherited from [TransactionDb](_engines_transactiondb_.transactiondb.md).[size](_engines_transactiondb_.transactiondb.md#size)*

*Defined in [engines/TransactionDb.ts:77](https://github.com/polkadot-js/common/blob/5ce8f91/packages/db/src/engines/TransactionDb.ts#L77)*

**Returns:** `number`

___
<a id="transaction"></a>

##  transaction

▸ **transaction**(fn: *`function`*): `boolean`

*Inherited from [TransactionDb](_engines_transactiondb_.transactiondb.md).[transaction](_engines_transactiondb_.transactiondb.md#transaction)*

*Defined in [engines/TransactionDb.ts:29](https://github.com/polkadot-js/common/blob/5ce8f91/packages/db/src/engines/TransactionDb.ts#L29)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** `boolean`

___

