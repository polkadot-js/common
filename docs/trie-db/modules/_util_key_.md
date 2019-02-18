

# Functions

<a id="computeextensionkey"></a>

##  computeExtensionKey

▸ **computeExtensionKey**(nibbles: *`Uint8Array`*): [EncodedPath](_types_.md#encodedpath)

*Defined in [util/key.ts:36](https://github.com/polkadot-js/common/blob/830c98d/packages/trie-db/src/util/key.ts#L36)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| nibbles | `Uint8Array` |

**Returns:** [EncodedPath](_types_.md#encodedpath)

___
<a id="computeleafkey"></a>

##  computeLeafKey

▸ **computeLeafKey**(nibbles: *`Uint8Array`*): [EncodedPath](_types_.md#encodedpath)

*Defined in [util/key.ts:40](https://github.com/polkadot-js/common/blob/830c98d/packages/trie-db/src/util/key.ts#L40)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| nibbles | `Uint8Array` |

**Returns:** [EncodedPath](_types_.md#encodedpath)

___
<a id="consumecommonprefix"></a>

##  consumeCommonPrefix

▸ **consumeCommonPrefix**(left: *`Uint8Array`*, right: *`Uint8Array`*): [`Uint8Array`, `Uint8Array`, `Uint8Array`]

*Defined in [util/key.ts:56](https://github.com/polkadot-js/common/blob/830c98d/packages/trie-db/src/util/key.ts#L56)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| left | `Uint8Array` |
| right | `Uint8Array` |

**Returns:** [`Uint8Array`, `Uint8Array`, `Uint8Array`]

___
<a id="getcommonprefixlength"></a>

##  getCommonPrefixLength

▸ **getCommonPrefixLength**(left: *`Uint8Array`*, right: *`Uint8Array`*): `number`

*Defined in [util/key.ts:46](https://github.com/polkadot-js/common/blob/830c98d/packages/trie-db/src/util/key.ts#L46)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| left | `Uint8Array` |
| right | `Uint8Array` |

**Returns:** `number`

___
<a id="keyequals"></a>

##  keyEquals

▸ **keyEquals**(key: *`Uint8Array` \| `null`*, test: *`Uint8Array` \| `null`*): `boolean`

*Defined in [util/key.ts:10](https://github.com/polkadot-js/common/blob/830c98d/packages/trie-db/src/util/key.ts#L10)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` \| `null` |
| test | `Uint8Array` \| `null` |

**Returns:** `boolean`

___
<a id="keystartswith"></a>

##  keyStartsWith

▸ **keyStartsWith**(key: *`Uint8Array` \| `null`*, partial: *`Uint8Array` \| `null`*): `boolean`

*Defined in [util/key.ts:20](https://github.com/polkadot-js/common/blob/830c98d/packages/trie-db/src/util/key.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` \| `null` |
| partial | `Uint8Array` \| `null` |

**Returns:** `boolean`

___

