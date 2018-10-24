

# Hierarchy

**FileTreeDb**

# Implements

* `BaseDb`

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new FileTreeDb**(location: *`string`*): [FileTreeDb](_engines_filetreedb_.filetreedb.md)

*Defined in [engines/FileTreeDb.ts:21](https://github.com/polkadot-js/common/blob/0cb6e6c/packages/db/src/engines/FileTreeDb.ts#L21)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| location | `string` |

**Returns:** [FileTreeDb](_engines_filetreedb_.filetreedb.md)

___

# Properties

<a id="_location"></a>

##  _location

**● _location**: *`string`*

*Defined in [engines/FileTreeDb.ts:21](https://github.com/polkadot-js/common/blob/0cb6e6c/packages/db/src/engines/FileTreeDb.ts#L21)*

___

# Methods

<a id="close"></a>

##  close

▸ **close**(): `void`

*Defined in [engines/FileTreeDb.ts:46](https://github.com/polkadot-js/common/blob/0cb6e6c/packages/db/src/engines/FileTreeDb.ts#L46)*

**Returns:** `void`

___
<a id="del"></a>

##  del

▸ **del**(key: *`Uint8Array`*): `void`

*Defined in [engines/FileTreeDb.ts:76](https://github.com/polkadot-js/common/blob/0cb6e6c/packages/db/src/engines/FileTreeDb.ts#L76)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `void`

___
<a id="drop"></a>

##  drop

▸ **drop**(): `void`

*Defined in [engines/FileTreeDb.ts:50](https://github.com/polkadot-js/common/blob/0cb6e6c/packages/db/src/engines/FileTreeDb.ts#L50)*

**Returns:** `void`

___
<a id="empty"></a>

##  empty

▸ **empty**(): `void`

*Defined in [engines/FileTreeDb.ts:54](https://github.com/polkadot-js/common/blob/0cb6e6c/packages/db/src/engines/FileTreeDb.ts#L54)*

**Returns:** `void`

___
<a id="get"></a>

##  get

▸ **get**(key: *`Uint8Array`*):  `Uint8Array` &#124; `null`

*Defined in [engines/FileTreeDb.ts:86](https://github.com/polkadot-js/common/blob/0cb6e6c/packages/db/src/engines/FileTreeDb.ts#L86)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:**  `Uint8Array` &#124; `null`

___
<a id="maintain"></a>

##  maintain

▸ **maintain**(fn: *`ProgressCb`*): `void`

*Defined in [engines/FileTreeDb.ts:68](https://github.com/polkadot-js/common/blob/0cb6e6c/packages/db/src/engines/FileTreeDb.ts#L68)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| fn | `ProgressCb` |

**Returns:** `void`

___
<a id="open"></a>

##  open

▸ **open**(): `void`

*Defined in [engines/FileTreeDb.ts:42](https://github.com/polkadot-js/common/blob/0cb6e6c/packages/db/src/engines/FileTreeDb.ts#L42)*

**Returns:** `void`

___
<a id="put"></a>

##  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `void`

*Defined in [engines/FileTreeDb.ts:100](https://github.com/polkadot-js/common/blob/0cb6e6c/packages/db/src/engines/FileTreeDb.ts#L100)*

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

*Defined in [engines/FileTreeDb.ts:58](https://github.com/polkadot-js/common/blob/0cb6e6c/packages/db/src/engines/FileTreeDb.ts#L58)*

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

*Defined in [engines/FileTreeDb.ts:62](https://github.com/polkadot-js/common/blob/0cb6e6c/packages/db/src/engines/FileTreeDb.ts#L62)*

**Returns:** `number`

___

