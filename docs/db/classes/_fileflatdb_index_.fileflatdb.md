

# Hierarchy

**FileFlatDb**

# Implements

* [BaseDb](../interfaces/_types_.basedb.md)

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new FileFlatDb**(base: *`string`*, file?: *`string`*, options?: *[BaseDbOptions](../modules/_types_.md#basedboptions)*): [FileFlatDb](_fileflatdb_index_.fileflatdb.md)

*Defined in [FileFlatDb/index.ts:31](https://github.com/polkadot-js/common/blob/e3b45e7/packages/db/src/FileFlatDb/index.ts#L31)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| base | `string` | - |
| `Default value` file | `string` |  defaults.DEFAULT_FILE |
| `Default value` options | [BaseDbOptions](../modules/_types_.md#basedboptions) |  {} |

**Returns:** [FileFlatDb](_fileflatdb_index_.fileflatdb.md)

___

# Methods

<a id="close"></a>

##  close

▸ **close**(): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[close](../interfaces/_types_.basedb.md#close)*

*Defined in [FileFlatDb/index.ts:56](https://github.com/polkadot-js/common/blob/e3b45e7/packages/db/src/FileFlatDb/index.ts#L56)*

**Returns:** `void`

___
<a id="del"></a>

##  del

▸ **del**(key: *`Uint8Array`*): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[del](../interfaces/_types_.basedb.md#del)*

*Defined in [FileFlatDb/index.ts:102](https://github.com/polkadot-js/common/blob/e3b45e7/packages/db/src/FileFlatDb/index.ts#L102)*

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

*Defined in [FileFlatDb/index.ts:66](https://github.com/polkadot-js/common/blob/e3b45e7/packages/db/src/FileFlatDb/index.ts#L66)*

**Returns:** `void`

___
<a id="empty"></a>

##  empty

▸ **empty**(): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[empty](../interfaces/_types_.basedb.md#empty)*

*Defined in [FileFlatDb/index.ts:72](https://github.com/polkadot-js/common/blob/e3b45e7/packages/db/src/FileFlatDb/index.ts#L72)*

**Returns:** `void`

___
<a id="get"></a>

##  get

▸ **get**(key: *`Uint8Array`*):  `Uint8Array` &#124; `null`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[get](../interfaces/_types_.basedb.md#get)*

*Defined in [FileFlatDb/index.ts:106](https://github.com/polkadot-js/common/blob/e3b45e7/packages/db/src/FileFlatDb/index.ts#L106)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:**  `Uint8Array` &#124; `null`

___
<a id="maintain"></a>

##  maintain

▸ **maintain**(fn: *[ProgressCb](../modules/_types_.md#progresscb)*): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[maintain](../interfaces/_types_.basedb.md#maintain)*

*Defined in [FileFlatDb/index.ts:94](https://github.com/polkadot-js/common/blob/e3b45e7/packages/db/src/FileFlatDb/index.ts#L94)*

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

*Defined in [FileFlatDb/index.ts:46](https://github.com/polkadot-js/common/blob/e3b45e7/packages/db/src/FileFlatDb/index.ts#L46)*

**Returns:** `void`

___
<a id="put"></a>

##  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[put](../interfaces/_types_.basedb.md#put)*

*Defined in [FileFlatDb/index.ts:124](https://github.com/polkadot-js/common/blob/e3b45e7/packages/db/src/FileFlatDb/index.ts#L124)*

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

*Defined in [FileFlatDb/index.ts:83](https://github.com/polkadot-js/common/blob/e3b45e7/packages/db/src/FileFlatDb/index.ts#L83)*

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

*Defined in [FileFlatDb/index.ts:79](https://github.com/polkadot-js/common/blob/e3b45e7/packages/db/src/FileFlatDb/index.ts#L79)*

**Returns:** `number`

___

