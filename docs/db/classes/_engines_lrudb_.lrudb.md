

# Hierarchy

**LruDb**

# Implements

* `BaseDb`

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new LruDb**(backing: *`BaseDb`*, itemCount?: *`number`*): [LruDb](_engines_lrudb_.lrudb.md)

*Defined in [engines/LruDb.ts:20](https://github.com/polkadot-js/common/blob/75c09a9/packages/db/src/engines/LruDb.ts#L20)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| backing | `BaseDb` | - |
| `Default value` itemCount | `number` |  DEFAULT_ITEM_COUNT |

**Returns:** [LruDb](_engines_lrudb_.lrudb.md)

___

# Methods

<a id="_getlru"></a>

##  _getLru

▸ **_getLru**(key: *`Uint8Array`*):  `CachedValue` &#124; `undefined`

*Defined in [engines/LruDb.ts:87](https://github.com/polkadot-js/common/blob/75c09a9/packages/db/src/engines/LruDb.ts#L87)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:**  `CachedValue` &#124; `undefined`

___
<a id="close"></a>

##  close

▸ **close**(): `void`

*Defined in [engines/LruDb.ts:27](https://github.com/polkadot-js/common/blob/75c09a9/packages/db/src/engines/LruDb.ts#L27)*

**Returns:** `void`

___
<a id="del"></a>

##  del

▸ **del**(key: *`Uint8Array`*): `void`

*Defined in [engines/LruDb.ts:64](https://github.com/polkadot-js/common/blob/75c09a9/packages/db/src/engines/LruDb.ts#L64)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `void`

___
<a id="drop"></a>

##  drop

▸ **drop**(): `void`

*Defined in [engines/LruDb.ts:41](https://github.com/polkadot-js/common/blob/75c09a9/packages/db/src/engines/LruDb.ts#L41)*

**Returns:** `void`

___
<a id="empty"></a>

##  empty

▸ **empty**(): `void`

*Defined in [engines/LruDb.ts:45](https://github.com/polkadot-js/common/blob/75c09a9/packages/db/src/engines/LruDb.ts#L45)*

**Returns:** `void`

___
<a id="get"></a>

##  get

▸ **get**(key: *`Uint8Array`*):  `Uint8Array` &#124; `null`

*Defined in [engines/LruDb.ts:71](https://github.com/polkadot-js/common/blob/75c09a9/packages/db/src/engines/LruDb.ts#L71)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:**  `Uint8Array` &#124; `null`

___
<a id="maintain"></a>

##  maintain

▸ **maintain**(fn: *`ProgressCb`*): `void`

*Defined in [engines/LruDb.ts:56](https://github.com/polkadot-js/common/blob/75c09a9/packages/db/src/engines/LruDb.ts#L56)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| fn | `ProgressCb` |

**Returns:** `void`

___
<a id="open"></a>

##  open

▸ **open**(): `void`

*Defined in [engines/LruDb.ts:34](https://github.com/polkadot-js/common/blob/75c09a9/packages/db/src/engines/LruDb.ts#L34)*

**Returns:** `void`

___
<a id="put"></a>

##  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `void`

*Defined in [engines/LruDb.ts:91](https://github.com/polkadot-js/common/blob/75c09a9/packages/db/src/engines/LruDb.ts#L91)*

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

*Defined in [engines/LruDb.ts:52](https://github.com/polkadot-js/common/blob/75c09a9/packages/db/src/engines/LruDb.ts#L52)*

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

*Defined in [engines/LruDb.ts:60](https://github.com/polkadot-js/common/blob/75c09a9/packages/db/src/engines/LruDb.ts#L60)*

**Returns:** `number`

___

