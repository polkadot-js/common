

# Hierarchy

**FileTreeDb**

# Implements

* [BaseDb](../interfaces/_types_.basedb.md)

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new FileTreeDb**(location: *`string`*): [FileTreeDb](_engines_filetreedb_.filetreedb.md)

*Defined in [engines/FileTreeDb.ts:21](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/FileTreeDb.ts#L21)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| location | `string` |

**Returns:** [FileTreeDb](_engines_filetreedb_.filetreedb.md)

___

# Properties

<a id="_location"></a>

##  _location

**● _location**: *`string`*

*Defined in [engines/FileTreeDb.ts:21](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/FileTreeDb.ts#L21)*

___

# Methods

<a id="close"></a>

##  close

▸ **close**(): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[close](../interfaces/_types_.basedb.md#close)*

*Defined in [engines/FileTreeDb.ts:46](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/FileTreeDb.ts#L46)*

**Returns:** `void`

___
<a id="del"></a>

##  del

▸ **del**(key: *`Uint8Array`*): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[del](../interfaces/_types_.basedb.md#del)*

*Defined in [engines/FileTreeDb.ts:76](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/FileTreeDb.ts#L76)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `void`

___
<a id="drop"></a>

##  drop

▸ **drop**(): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[drop](../interfaces/_types_.basedb.md#drop)*

*Defined in [engines/FileTreeDb.ts:50](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/FileTreeDb.ts#L50)*

**Returns:** `void`

___
<a id="empty"></a>

##  empty

▸ **empty**(): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[empty](../interfaces/_types_.basedb.md#empty)*

*Defined in [engines/FileTreeDb.ts:54](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/FileTreeDb.ts#L54)*

**Returns:** `void`

___
<a id="get"></a>

##  get

▸ **get**(key: *`Uint8Array`*): `Uint8Array` \| `null`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[get](../interfaces/_types_.basedb.md#get)*

*Defined in [engines/FileTreeDb.ts:86](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/FileTreeDb.ts#L86)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `Uint8Array` \| `null`

___
<a id="maintain"></a>

##  maintain

▸ **maintain**(fn: *[ProgressCb](../modules/_types_.md#progresscb)*): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[maintain](../interfaces/_types_.basedb.md#maintain)*

*Defined in [engines/FileTreeDb.ts:68](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/FileTreeDb.ts#L68)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | [ProgressCb](../modules/_types_.md#progresscb) |

**Returns:** `void`

___
<a id="open"></a>

##  open

▸ **open**(): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[open](../interfaces/_types_.basedb.md#open)*

*Defined in [engines/FileTreeDb.ts:42](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/FileTreeDb.ts#L42)*

**Returns:** `void`

___
<a id="put"></a>

##  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[put](../interfaces/_types_.basedb.md#put)*

*Defined in [engines/FileTreeDb.ts:100](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/FileTreeDb.ts#L100)*

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

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[rename](../interfaces/_types_.basedb.md#rename)*

*Defined in [engines/FileTreeDb.ts:58](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/FileTreeDb.ts#L58)*

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

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[size](../interfaces/_types_.basedb.md#size)*

*Defined in [engines/FileTreeDb.ts:62](https://github.com/polkadot-js/common/blob/e19d377/packages/db/src/engines/FileTreeDb.ts#L62)*

**Returns:** `number`

___

