

# Hierarchy

**LruDb**

# Implements

* [BaseDb](../interfaces/_types_.basedb.md)

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new LruDb**(backing: *[BaseDb](../interfaces/_types_.basedb.md)*, itemCount?: *`number`*): [LruDb](_engines_lrudb_.lrudb.md)

*Defined in [engines/LruDb.ts:20](https://github.com/polkadot-js/common/blob/815fdc7/packages/db/src/engines/LruDb.ts#L20)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| backing | [BaseDb](../interfaces/_types_.basedb.md) | - |
| `Default value` itemCount | `number` |  DEFAULT_ITEM_COUNT |

**Returns:** [LruDb](_engines_lrudb_.lrudb.md)

___

# Methods

<a id="_getlru"></a>

##  _getLru

▸ **_getLru**(key: *`Uint8Array`*): `CachedValue` \| `undefined`

*Defined in [engines/LruDb.ts:87](https://github.com/polkadot-js/common/blob/815fdc7/packages/db/src/engines/LruDb.ts#L87)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `CachedValue` \| `undefined`

___
<a id="close"></a>

##  close

▸ **close**(): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[close](../interfaces/_types_.basedb.md#close)*

*Defined in [engines/LruDb.ts:27](https://github.com/polkadot-js/common/blob/815fdc7/packages/db/src/engines/LruDb.ts#L27)*

**Returns:** `void`

___
<a id="del"></a>

##  del

▸ **del**(key: *`Uint8Array`*): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[del](../interfaces/_types_.basedb.md#del)*

*Defined in [engines/LruDb.ts:64](https://github.com/polkadot-js/common/blob/815fdc7/packages/db/src/engines/LruDb.ts#L64)*

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

*Defined in [engines/LruDb.ts:41](https://github.com/polkadot-js/common/blob/815fdc7/packages/db/src/engines/LruDb.ts#L41)*

**Returns:** `void`

___
<a id="empty"></a>

##  empty

▸ **empty**(): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[empty](../interfaces/_types_.basedb.md#empty)*

*Defined in [engines/LruDb.ts:45](https://github.com/polkadot-js/common/blob/815fdc7/packages/db/src/engines/LruDb.ts#L45)*

**Returns:** `void`

___
<a id="get"></a>

##  get

▸ **get**(key: *`Uint8Array`*): `Uint8Array` \| `null`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[get](../interfaces/_types_.basedb.md#get)*

*Defined in [engines/LruDb.ts:71](https://github.com/polkadot-js/common/blob/815fdc7/packages/db/src/engines/LruDb.ts#L71)*

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

*Defined in [engines/LruDb.ts:56](https://github.com/polkadot-js/common/blob/815fdc7/packages/db/src/engines/LruDb.ts#L56)*

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

*Defined in [engines/LruDb.ts:34](https://github.com/polkadot-js/common/blob/815fdc7/packages/db/src/engines/LruDb.ts#L34)*

**Returns:** `void`

___
<a id="put"></a>

##  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `void`

*Implementation of [BaseDb](../interfaces/_types_.basedb.md).[put](../interfaces/_types_.basedb.md#put)*

*Defined in [engines/LruDb.ts:91](https://github.com/polkadot-js/common/blob/815fdc7/packages/db/src/engines/LruDb.ts#L91)*

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

*Defined in [engines/LruDb.ts:52](https://github.com/polkadot-js/common/blob/815fdc7/packages/db/src/engines/LruDb.ts#L52)*

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

*Defined in [engines/LruDb.ts:60](https://github.com/polkadot-js/common/blob/815fdc7/packages/db/src/engines/LruDb.ts#L60)*

**Returns:** `number`

___

