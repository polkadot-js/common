

# Hierarchy

**TransactionDb**

↳  [DiskDb](_disk_.diskdb.md)

↳  [Memory](_memory_.memory.md)

# Implements

* `TxDb`

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new TransactionDb**(backing: *`BaseDb`*): [TransactionDb](_engines_transactiondb_.transactiondb.md)

*Defined in [engines/TransactionDb.ts:21](https://github.com/polkadot-js/common/blob/dc996ef/packages/db/src/engines/TransactionDb.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| backing | `BaseDb` |

**Returns:** [TransactionDb](_engines_transactiondb_.transactiondb.md)

___

# Methods

<a id="close"></a>

##  close

▸ **close**(): `void`

*Defined in [engines/TransactionDb.ts:51](https://github.com/polkadot-js/common/blob/dc996ef/packages/db/src/engines/TransactionDb.ts#L51)*

**Returns:** `void`

___
<a id="del"></a>

##  del

▸ **del**(key: *`Uint8Array`*): `void`

*Defined in [engines/TransactionDb.ts:81](https://github.com/polkadot-js/common/blob/dc996ef/packages/db/src/engines/TransactionDb.ts#L81)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `void`

___
<a id="drop"></a>

##  drop

▸ **drop**(): `void`

*Defined in [engines/TransactionDb.ts:59](https://github.com/polkadot-js/common/blob/dc996ef/packages/db/src/engines/TransactionDb.ts#L59)*

**Returns:** `void`

___
<a id="empty"></a>

##  empty

▸ **empty**(): `void`

*Defined in [engines/TransactionDb.ts:63](https://github.com/polkadot-js/common/blob/dc996ef/packages/db/src/engines/TransactionDb.ts#L63)*

**Returns:** `void`

___
<a id="get"></a>

##  get

▸ **get**(key: *`Uint8Array`*):  `Uint8Array` &#124; `null`

*Defined in [engines/TransactionDb.ts:93](https://github.com/polkadot-js/common/blob/dc996ef/packages/db/src/engines/TransactionDb.ts#L93)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:**  `Uint8Array` &#124; `null`

___
<a id="maintain"></a>

##  maintain

▸ **maintain**(fn: *`ProgressCb`*): `void`

*Defined in [engines/TransactionDb.ts:71](https://github.com/polkadot-js/common/blob/dc996ef/packages/db/src/engines/TransactionDb.ts#L71)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `ProgressCb` |

**Returns:** `void`

___
<a id="open"></a>

##  open

▸ **open**(): `void`

*Defined in [engines/TransactionDb.ts:55](https://github.com/polkadot-js/common/blob/dc996ef/packages/db/src/engines/TransactionDb.ts#L55)*

**Returns:** `void`

___
<a id="put"></a>

##  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `void`

*Defined in [engines/TransactionDb.ts:107](https://github.com/polkadot-js/common/blob/dc996ef/packages/db/src/engines/TransactionDb.ts#L107)*

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

*Defined in [engines/TransactionDb.ts:67](https://github.com/polkadot-js/common/blob/dc996ef/packages/db/src/engines/TransactionDb.ts#L67)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| base | `string` |
| file | `string` |

**Returns:** `void`

___
<a id="size"></a>

##  size

▸ **size**(): `number`

*Defined in [engines/TransactionDb.ts:77](https://github.com/polkadot-js/common/blob/dc996ef/packages/db/src/engines/TransactionDb.ts#L77)*

**Returns:** `number`

___
<a id="transaction"></a>

##  transaction

▸ **transaction**(fn: *`function`*): `boolean`

*Defined in [engines/TransactionDb.ts:29](https://github.com/polkadot-js/common/blob/dc996ef/packages/db/src/engines/TransactionDb.ts#L29)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** `boolean`

___

