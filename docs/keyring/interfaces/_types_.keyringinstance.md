

# Hierarchy

**KeyringInstance**

# Implemented by

* [Keyring](../classes/_index_.keyring.md)

# Methods

<a id="addfromaddress"></a>

##  addFromAddress

▸ **addFromAddress**(address: * `string` &#124; `Uint8Array`*, meta?: *[KeyringPair$Meta](../modules/_types_.md#keyringpair_meta)*): [KeyringPair](../modules/_types_.md#keyringpair)

*Defined in [types.ts:49](https://github.com/polkadot-js/common/blob/0c8547d/packages/keyring/src/types.ts#L49)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| address |  `string` &#124; `Uint8Array`|
| `Optional` meta | [KeyringPair$Meta](../modules/_types_.md#keyringpair_meta) |

**Returns:** [KeyringPair](../modules/_types_.md#keyringpair)

___
<a id="addfromjson"></a>

##  addFromJson

▸ **addFromJson**(pair: *[KeyringPair$Json](../modules/_types_.md#keyringpair_json)*): [KeyringPair](../modules/_types_.md#keyringpair)

*Defined in [types.ts:52](https://github.com/polkadot-js/common/blob/0c8547d/packages/keyring/src/types.ts#L52)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| pair | [KeyringPair$Json](../modules/_types_.md#keyringpair_json) |

**Returns:** [KeyringPair](../modules/_types_.md#keyringpair)

___
<a id="addfrommnemonic"></a>

##  addFromMnemonic

▸ **addFromMnemonic**(mnemonic: *`string`*, meta?: *[KeyringPair$Meta](../modules/_types_.md#keyringpair_meta)*): [KeyringPair](../modules/_types_.md#keyringpair)

*Defined in [types.ts:50](https://github.com/polkadot-js/common/blob/0c8547d/packages/keyring/src/types.ts#L50)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mnemonic | `string` |
| `Optional` meta | [KeyringPair$Meta](../modules/_types_.md#keyringpair_meta) |

**Returns:** [KeyringPair](../modules/_types_.md#keyringpair)

___
<a id="addfromseed"></a>

##  addFromSeed

▸ **addFromSeed**(seed: *`Uint8Array`*, meta?: *[KeyringPair$Meta](../modules/_types_.md#keyringpair_meta)*): [KeyringPair](../modules/_types_.md#keyringpair)

*Defined in [types.ts:51](https://github.com/polkadot-js/common/blob/0c8547d/packages/keyring/src/types.ts#L51)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| seed | `Uint8Array` |
| `Optional` meta | [KeyringPair$Meta](../modules/_types_.md#keyringpair_meta) |

**Returns:** [KeyringPair](../modules/_types_.md#keyringpair)

___
<a id="addpair"></a>

##  addPair

▸ **addPair**(pair: *[KeyringPair](../modules/_types_.md#keyringpair)*): [KeyringPair](../modules/_types_.md#keyringpair)

*Defined in [types.ts:48](https://github.com/polkadot-js/common/blob/0c8547d/packages/keyring/src/types.ts#L48)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| pair | [KeyringPair](../modules/_types_.md#keyringpair) |

**Returns:** [KeyringPair](../modules/_types_.md#keyringpair)

___
<a id="decodeaddress"></a>

##  decodeAddress

▸ **decodeAddress**(encoded: * `string` &#124; `Uint8Array`*): `Uint8Array`

*Defined in [types.ts:44](https://github.com/polkadot-js/common/blob/0c8547d/packages/keyring/src/types.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| encoded |  `string` &#124; `Uint8Array`|

**Returns:** `Uint8Array`

___
<a id="encodeaddress"></a>

##  encodeAddress

▸ **encodeAddress**(key: * `Uint8Array` &#124; `string`*): `string`

*Defined in [types.ts:45](https://github.com/polkadot-js/common/blob/0c8547d/packages/keyring/src/types.ts#L45)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key |  `Uint8Array` &#124; `string`|

**Returns:** `string`

___
<a id="getpair"></a>

##  getPair

▸ **getPair**(address: * `string` &#124; `Uint8Array`*): [KeyringPair](../modules/_types_.md#keyringpair)

*Defined in [types.ts:53](https://github.com/polkadot-js/common/blob/0c8547d/packages/keyring/src/types.ts#L53)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| address |  `string` &#124; `Uint8Array`|

**Returns:** [KeyringPair](../modules/_types_.md#keyringpair)

___
<a id="getpairs"></a>

##  getPairs

▸ **getPairs**(): `Array`<[KeyringPair](../modules/_types_.md#keyringpair)>

*Defined in [types.ts:54](https://github.com/polkadot-js/common/blob/0c8547d/packages/keyring/src/types.ts#L54)*

**Returns:** `Array`<[KeyringPair](../modules/_types_.md#keyringpair)>

___
<a id="getpublickeys"></a>

##  getPublicKeys

▸ **getPublicKeys**(): `Array`<`Uint8Array`>

*Defined in [types.ts:55](https://github.com/polkadot-js/common/blob/0c8547d/packages/keyring/src/types.ts#L55)*

**Returns:** `Array`<`Uint8Array`>

___
<a id="removepair"></a>

##  removePair

▸ **removePair**(address: * `string` &#124; `Uint8Array`*): `void`

*Defined in [types.ts:56](https://github.com/polkadot-js/common/blob/0c8547d/packages/keyring/src/types.ts#L56)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| address |  `string` &#124; `Uint8Array`|

**Returns:** `void`

___
<a id="setaddressprefix"></a>

##  setAddressPrefix

▸ **setAddressPrefix**(prefix: *[Prefix](../modules/_address_types_.md#prefix)*): `void`

*Defined in [types.ts:46](https://github.com/polkadot-js/common/blob/0c8547d/packages/keyring/src/types.ts#L46)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| prefix | [Prefix](../modules/_address_types_.md#prefix) |

**Returns:** `void`

___
<a id="tojson"></a>

##  toJson

▸ **toJson**(address: * `string` &#124; `Uint8Array`*, passphrase?: * `undefined` &#124; `string`*): [KeyringPair$Json](../modules/_types_.md#keyringpair_json)

*Defined in [types.ts:57](https://github.com/polkadot-js/common/blob/0c8547d/packages/keyring/src/types.ts#L57)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| address |  `string` &#124; `Uint8Array`|
| `Optional` passphrase |  `undefined` &#124; `string`|

**Returns:** [KeyringPair$Json](../modules/_types_.md#keyringpair_json)

___

