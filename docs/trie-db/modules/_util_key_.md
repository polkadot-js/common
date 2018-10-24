

# Functions

<a id="computeextensionkey"></a>

##  computeExtensionKey

▸ **computeExtensionKey**(nibbles: *`Uint8Array`*): [EncodedPath](_types_.md#encodedpath)

*Defined in [util/key.ts:50](https://github.com/polkadot-js/common/blob/5ce8f91/packages/trie-db/src/util/key.ts#L50)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| nibbles | `Uint8Array` |

**Returns:** [EncodedPath](_types_.md#encodedpath)

___
<a id="computeleafkey"></a>

##  computeLeafKey

▸ **computeLeafKey**(nibbles: *`Uint8Array`*): [EncodedPath](_types_.md#encodedpath)

*Defined in [util/key.ts:54](https://github.com/polkadot-js/common/blob/5ce8f91/packages/trie-db/src/util/key.ts#L54)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| nibbles | `Uint8Array` |

**Returns:** [EncodedPath](_types_.md#encodedpath)

___
<a id="consumecommonprefix"></a>

##  consumeCommonPrefix

▸ **consumeCommonPrefix**(left: *`Uint8Array`*, right: *`Uint8Array`*): [`Uint8Array`, `Uint8Array`, `Uint8Array`]

*Defined in [util/key.ts:70](https://github.com/polkadot-js/common/blob/5ce8f91/packages/trie-db/src/util/key.ts#L70)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| left | `Uint8Array` |
| right | `Uint8Array` |

**Returns:** [`Uint8Array`, `Uint8Array`, `Uint8Array`]

___
<a id="extractkey"></a>

##  extractKey

▸ **extractKey**(node: *[Node](_types_.md#node)*): `Uint8Array`

*Defined in [util/key.ts:12](https://github.com/polkadot-js/common/blob/5ce8f91/packages/trie-db/src/util/key.ts#L12)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| node | [Node](_types_.md#node) |

**Returns:** `Uint8Array`

___
<a id="getcommonprefixlength"></a>

##  getCommonPrefixLength

▸ **getCommonPrefixLength**(left: *`Uint8Array`*, right: *`Uint8Array`*): `number`

*Defined in [util/key.ts:60](https://github.com/polkadot-js/common/blob/5ce8f91/packages/trie-db/src/util/key.ts#L60)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| left | `Uint8Array` |
| right | `Uint8Array` |

**Returns:** `number`

___
<a id="keyequals"></a>

##  keyEquals

▸ **keyEquals**(key: * `Uint8Array` &#124; `null`*, test: * `Uint8Array` &#124; `null`*): `boolean`

*Defined in [util/key.ts:24](https://github.com/polkadot-js/common/blob/5ce8f91/packages/trie-db/src/util/key.ts#L24)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key |  `Uint8Array` &#124; `null`|
| test |  `Uint8Array` &#124; `null`|

**Returns:** `boolean`

___
<a id="keystartswith"></a>

##  keyStartsWith

▸ **keyStartsWith**(key: * `Uint8Array` &#124; `null`*, partial: * `Uint8Array` &#124; `null`*): `boolean`

*Defined in [util/key.ts:34](https://github.com/polkadot-js/common/blob/5ce8f91/packages/trie-db/src/util/key.ts#L34)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| key |  `Uint8Array` &#124; `null`|
| partial |  `Uint8Array` &#124; `null`|

**Returns:** `boolean`

___

