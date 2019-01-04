

# Hierarchy

↳  [Impl](_fileflatdb_impl_.impl.md)

**↳ FileFlatDb**

# Implements

* [BaseDb](../interfaces/_types_.basedb.md)

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new FileFlatDb**(base: *`string`*, file?: *`string`*, options?: *[BaseDbOptions](../modules/_types_.md#basedboptions)*): [FileFlatDb](_fileflatdb_index_.fileflatdb.md)

*Overrides [Cache](_fileflatdb_cache_.cache.md).[constructor](_fileflatdb_cache_.cache.md#constructor)*

*Defined in [FileFlatDb/index.ts:18](https://github.com/polkadot-js/common/blob/4c658e8/packages/db/src/FileFlatDb/index.ts#L18)*

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

*Defined in [FileFlatDb/index.ts:31](https://github.com/polkadot-js/common/blob/4c658e8/packages/db/src/FileFlatDb/index.ts#L31)*

**Returns:** `void`

___
<a id="del"></a>

##  del

▸ **del**(key: *`Uint8Array`*): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[del](../interfaces/_types_.basedb.md#del)*

*Defined in [FileFlatDb/index.ts:74](https://github.com/polkadot-js/common/blob/4c658e8/packages/db/src/FileFlatDb/index.ts#L74)*

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

*Defined in [FileFlatDb/index.ts:39](https://github.com/polkadot-js/common/blob/4c658e8/packages/db/src/FileFlatDb/index.ts#L39)*

**Returns:** `void`

___
<a id="empty"></a>

##  empty

▸ **empty**(): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[empty](../interfaces/_types_.basedb.md#empty)*

*Defined in [FileFlatDb/index.ts:45](https://github.com/polkadot-js/common/blob/4c658e8/packages/db/src/FileFlatDb/index.ts#L45)*

**Returns:** `void`

___
<a id="get"></a>

##  get

▸ **get**(key: *`Uint8Array`*): `Uint8Array` | `null`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[get](../interfaces/_types_.basedb.md#get)*

*Defined in [FileFlatDb/index.ts:78](https://github.com/polkadot-js/common/blob/4c658e8/packages/db/src/FileFlatDb/index.ts#L78)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `Uint8Array` | `null`

___
<a id="maintain"></a>

##  maintain

▸ **maintain**(fn: *[ProgressCb](../modules/_types_.md#progresscb)*): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[maintain](../interfaces/_types_.basedb.md#maintain)*

*Defined in [FileFlatDb/index.ts:66](https://github.com/polkadot-js/common/blob/4c658e8/packages/db/src/FileFlatDb/index.ts#L66)*

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

*Defined in [FileFlatDb/index.ts:23](https://github.com/polkadot-js/common/blob/4c658e8/packages/db/src/FileFlatDb/index.ts#L23)*

**Returns:** `void`

___
<a id="put"></a>

##  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[put](../interfaces/_types_.basedb.md#put)*

*Defined in [FileFlatDb/index.ts:96](https://github.com/polkadot-js/common/blob/4c658e8/packages/db/src/FileFlatDb/index.ts#L96)*

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

*Defined in [FileFlatDb/index.ts:55](https://github.com/polkadot-js/common/blob/4c658e8/packages/db/src/FileFlatDb/index.ts#L55)*

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

*Defined in [FileFlatDb/index.ts:51](https://github.com/polkadot-js/common/blob/4c658e8/packages/db/src/FileFlatDb/index.ts#L51)*

**Returns:** `number`

___

