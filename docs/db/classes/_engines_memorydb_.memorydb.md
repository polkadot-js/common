

# Hierarchy

**MemoryDb**

# Implements

* `BaseDb`

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new MemoryDb**(options?: *`BaseDbOptions`*): [MemoryDb](_engines_memorydb_.memorydb.md)

*Defined in [engines/MemoryDb.ts:16](https://github.com/polkadot-js/common/blob/dc07e26/packages/db/src/engines/MemoryDb.ts#L16)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| `Optional` options | `BaseDbOptions` |

**Returns:** [MemoryDb](_engines_memorydb_.memorydb.md)

___

# Methods

<a id="close"></a>

##  close

▸ **close**(): `void`

*Defined in [engines/MemoryDb.ts:22](https://github.com/polkadot-js/common/blob/dc07e26/packages/db/src/engines/MemoryDb.ts#L22)*

**Returns:** `void`

___
<a id="del"></a>

##  del

▸ **del**(key: *`Uint8Array`*): `void`

*Defined in [engines/MemoryDb.ts:56](https://github.com/polkadot-js/common/blob/dc07e26/packages/db/src/engines/MemoryDb.ts#L56)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:** `void`

___
<a id="drop"></a>

##  drop

▸ **drop**(): `void`

*Defined in [engines/MemoryDb.ts:30](https://github.com/polkadot-js/common/blob/dc07e26/packages/db/src/engines/MemoryDb.ts#L30)*

**Returns:** `void`

___
<a id="empty"></a>

##  empty

▸ **empty**(): `void`

*Defined in [engines/MemoryDb.ts:34](https://github.com/polkadot-js/common/blob/dc07e26/packages/db/src/engines/MemoryDb.ts#L34)*

**Returns:** `void`

___
<a id="get"></a>

##  get

▸ **get**(key: *`Uint8Array`*):  `Uint8Array` &#124; `null`

*Defined in [engines/MemoryDb.ts:62](https://github.com/polkadot-js/common/blob/dc07e26/packages/db/src/engines/MemoryDb.ts#L62)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key | `Uint8Array` |

**Returns:**  `Uint8Array` &#124; `null`

___
<a id="maintain"></a>

##  maintain

▸ **maintain**(fn: *`ProgressCb`*): `void`

*Defined in [engines/MemoryDb.ts:42](https://github.com/polkadot-js/common/blob/dc07e26/packages/db/src/engines/MemoryDb.ts#L42)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| fn | `ProgressCb` |

**Returns:** `void`

___
<a id="open"></a>

##  open

▸ **open**(): `void`

*Defined in [engines/MemoryDb.ts:26](https://github.com/polkadot-js/common/blob/dc07e26/packages/db/src/engines/MemoryDb.ts#L26)*

**Returns:** `void`

___
<a id="put"></a>

##  put

▸ **put**(key: *`Uint8Array`*, value: *`Uint8Array`*): `void`

*Defined in [engines/MemoryDb.ts:68](https://github.com/polkadot-js/common/blob/dc07e26/packages/db/src/engines/MemoryDb.ts#L68)*

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

*Defined in [engines/MemoryDb.ts:38](https://github.com/polkadot-js/common/blob/dc07e26/packages/db/src/engines/MemoryDb.ts#L38)*

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

*Defined in [engines/MemoryDb.ts:50](https://github.com/polkadot-js/common/blob/dc07e26/packages/db/src/engines/MemoryDb.ts#L50)*

**Returns:** `number`

___

