

# Hierarchy

**TransactionDb**

↳  [DiskDb](_disk_.diskdb.md)

↳  [Memory](_memory_.memory.md)

# Implements

* [TxDb](../interfaces/_types_.txdb.md)

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new TransactionDb**(backing: *[BaseDb](../interfaces/_types_.basedb.md)*): [TransactionDb](_engines_transactiondb_.transactiondb.md)

*Defined in [engines/TransactionDb.ts:21](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/TransactionDb.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| backing | [BaseDb](../interfaces/_types_.basedb.md) |

**Returns:** [TransactionDb](_engines_transactiondb_.transactiondb.md)

___

# Methods

<a id="close"></a>

##  close

▸ **close**(): `void`

*Implementation of [TxDb](../interfaces/_types_.txdb.md).[close](../interfaces/_types_.txdb.md#close)*

*Defined in [engines/TransactionDb.ts:51](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/TransactionDb.ts#L51)*

**Returns:** `void`

___
<a id="del"></a>

##  del

▸ **del**(key: *`Uint8Array`*): `void`

*Implementation of [TxDb](../interfaces/_types_.txdb.md).[del](../interfaces/_types_.txdb.md#del)*

*Defined in [engines/TransactionDb.ts:81](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/TransactionDb.ts#L81)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `void`

___
<a id="drop"></a>

##  drop

▸ **drop**(): `void`

*Implementation of [TxDb](../interfaces/_types_.txdb.md).[drop](../interfaces/_types_.txdb.md#drop)*

*Defined in [engines/TransactionDb.ts:59](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/TransactionDb.ts#L59)*

**Returns:** `void`

___
<a id="empty"></a>

##  empty

▸ **empty**(): `void`

*Implementation of [TxDb](../interfaces/_types_.txdb.md).[empty](../interfaces/_types_.txdb.md#empty)*

*Defined in [engines/TransactionDb.ts:63](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/TransactionDb.ts#L63)*

**Returns:** `void`

___
<a id="get"></a>

##  get

▸ **get**(key: *`Uint8Array`*): `Uint8Array` \| `null`

*Implementation of [TxDb](../interfaces/_types_.txdb.md).[get](../interfaces/_types_.txdb.md#get)*

*Defined in [engines/TransactionDb.ts:93](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/TransactionDb.ts#L93)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `Uint8Array` \| `null`

___
<a id="maintain"></a>

##  maintain

▸ **maintain**(fn: *[ProgressCb](../modules/_types_.md#progresscb)*): `void`

*Implementation of [TxDb](../interfaces/_types_.txdb.md).[maintain](../interfaces/_types_.txdb.md#maintain)*

*Defined in [engines/TransactionDb.ts:71](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/TransactionDb.ts#L71)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | [ProgressCb](../modules/_types_.md#progresscb) |

**Returns:** `void`

___
<a id="open"></a>

##  open

▸ **open**(): `void`

*Implementation of [TxDb](../interfaces/_types_.txdb.md).[open](../interfaces/_types_.txdb.md#open)*

*Defined in [engines/TransactionDb.ts:55](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/TransactionDb.ts#L55)*

**Returns:** `void`

___
<a id="put"></a>

##  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `void`

*Implementation of [TxDb](../interfaces/_types_.txdb.md).[put](../interfaces/_types_.txdb.md#put)*

*Defined in [engines/TransactionDb.ts:107](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/TransactionDb.ts#L107)*

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

*Implementation of [TxDb](../interfaces/_types_.txdb.md).[rename](../interfaces/_types_.txdb.md#rename)*

*Defined in [engines/TransactionDb.ts:67](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/TransactionDb.ts#L67)*

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

*Implementation of [TxDb](../interfaces/_types_.txdb.md).[size](../interfaces/_types_.txdb.md#size)*

*Defined in [engines/TransactionDb.ts:77](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/TransactionDb.ts#L77)*

**Returns:** `number`

___
<a id="transaction"></a>

##  transaction

▸ **transaction**(fn: *`function`*): `boolean`

*Defined in [engines/TransactionDb.ts:29](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/TransactionDb.ts#L29)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `function` |

**Returns:** `boolean`

___

