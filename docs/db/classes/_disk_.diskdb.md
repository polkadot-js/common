

*__name__*: DiskDb

*__summary__*: Creates DiskDb database using LruDb for caching with FileFlatDb and extending TransactionDb.

*__description__*: Create an instance of a Disk database using LruDb (for caching with FileFlatDb) and extending TransactionDb. Note that LruDB uses the [Least Recently Used (LRU) cache algorithm](https://www.npmjs.com/package/lru_map)

*__example__*:   
```javascript
import stringToU8a from '@polkadot/util/string/toU8a';
import DiskDb from '@polkadot/db/Disk';
import TransactionDb from '@polkadot/db/engines/TransactionDb';

// Creat diskDb instance that wraps LruDb with backing and Lru cache
const diskDb = new DiskDb();

// Creat txDb instance that uses diskDb
const txDb = new TransactionDb(diskDb);

// Open the disk db backing database. Clears the Lru cache
diskDb.open();

// Declare key/value pair to allocate to store under a the key
const key = stringToU8a('key');
const value = stringToU8a('some value');

// Store key/value pair in disk db backing and also in Lru cache
diskDb.put(key, value);

// Retrieve value for key from disk db. Returns cached value if key
// in cache, otherwise returns backing value for key and stores
// this latest retrieved key/value pair in Lru cache
valueRetrieved = diskDb.get(key);

// Delete key/value pair from disk db backing and set the key to null in Lru cache
diskDb.del(key);

// Transaction to Store key/value pair in transaction db
const isTxSuccess = txDb.transaction(() => {
  txDb.put(key, value);

  // Boolean to indicate whether transaction was successful or not
  return true;
});

console.log(`Transaction successful?: ${isTxSuccess}`);

// Retrieve transaction value from diskDb db
console.log(`Transfered value: ${diskDb.get(key)}`);

// Close the diskDb database and clear Lru cache
diskDb.close();
```

# Hierarchy

 [TransactionDb](_engines_transactiondb_.transactiondb.md)

**↳ DiskDb**

# Implements

* `TxDb`

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new DiskDb**(base: *`string`*, name: *`string`*, options?: *`BaseDbOptions`*): [DiskDb](_disk_.diskdb.md)

*Overrides [TransactionDb](_engines_transactiondb_.transactiondb.md).[constructor](_engines_transactiondb_.transactiondb.md#constructor)*

*Defined in [Disk.ts:66](https://github.com/polkadot-js/common/blob/5ce8f91/packages/db/src/Disk.ts#L66)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| base | `string` |
| name | `string` |
| `Optional` options | `BaseDbOptions` |

**Returns:** [DiskDb](_disk_.diskdb.md)

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

