

# Hierarchy

**FileFlatDb**

# Implements

* `BaseDb`

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new FileFlatDb**(base: *`string`*, file?: *`string`*, options?: *`BaseDbOptions`*): [FileFlatDb](_fileflatdb_index_.fileflatdb.md)

*Defined in [FileFlatDb/index.ts:32](https://github.com/polkadot-js/common/blob/48008e2/packages/db/src/FileFlatDb/index.ts#L32)*

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| base | `string` | - |
| `Default value` file | `string` |  defaults.DEFAULT_FILE |
| `Default value` options | `BaseDbOptions` |  {} |

**Returns:** [FileFlatDb](_fileflatdb_index_.fileflatdb.md)

___

# Methods

<a id="close"></a>

##  close

▸ **close**(): `void`

*Defined in [FileFlatDb/index.ts:58](https://github.com/polkadot-js/common/blob/48008e2/packages/db/src/FileFlatDb/index.ts#L58)*

**Returns:** `void`

___
<a id="del"></a>

##  del

▸ **del**(key: *`Uint8Array`*): `void`

*Defined in [FileFlatDb/index.ts:105](https://github.com/polkadot-js/common/blob/48008e2/packages/db/src/FileFlatDb/index.ts#L105)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `void`

___
<a id="drop"></a>

##  drop

▸ **drop**(): `void`

*Defined in [FileFlatDb/index.ts:68](https://github.com/polkadot-js/common/blob/48008e2/packages/db/src/FileFlatDb/index.ts#L68)*

**Returns:** `void`

___
<a id="empty"></a>

##  empty

▸ **empty**(): `void`

*Defined in [FileFlatDb/index.ts:74](https://github.com/polkadot-js/common/blob/48008e2/packages/db/src/FileFlatDb/index.ts#L74)*

**Returns:** `void`

___
<a id="get"></a>

##  get

▸ **get**(key: *`Uint8Array`*):  `Uint8Array` &#124; `null`

*Defined in [FileFlatDb/index.ts:109](https://github.com/polkadot-js/common/blob/48008e2/packages/db/src/FileFlatDb/index.ts#L109)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:**  `Uint8Array` &#124; `null`

___
<a id="maintain"></a>

##  maintain

▸ **maintain**(fn: *`ProgressCb`*): `void`

*Defined in [FileFlatDb/index.ts:97](https://github.com/polkadot-js/common/blob/48008e2/packages/db/src/FileFlatDb/index.ts#L97)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| fn | `ProgressCb` |

**Returns:** `void`

___
<a id="open"></a>

##  open

▸ **open**(): `void`

*Defined in [FileFlatDb/index.ts:48](https://github.com/polkadot-js/common/blob/48008e2/packages/db/src/FileFlatDb/index.ts#L48)*

**Returns:** `void`

___
<a id="put"></a>

##  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `void`

*Defined in [FileFlatDb/index.ts:127](https://github.com/polkadot-js/common/blob/48008e2/packages/db/src/FileFlatDb/index.ts#L127)*

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

*Defined in [FileFlatDb/index.ts:85](https://github.com/polkadot-js/common/blob/48008e2/packages/db/src/FileFlatDb/index.ts#L85)*

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

*Defined in [FileFlatDb/index.ts:81](https://github.com/polkadot-js/common/blob/48008e2/packages/db/src/FileFlatDb/index.ts#L81)*

**Returns:** `number`

___

