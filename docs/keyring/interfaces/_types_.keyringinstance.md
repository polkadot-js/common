

# Hierarchy

**KeyringInstance**

# Implemented by

* [Keyring](../classes/_index_.keyring.md)

# Properties

<a id="pairs"></a>

##  pairs

**● pairs**: *`Array`<[KeyringPair](_types_.keyringpair.md)>*

*Defined in [types.ts:58](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L58)*

___
<a id="publickeys"></a>

##  publicKeys

**● publicKeys**: *`Array`<`Uint8Array`>*

*Defined in [types.ts:59](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L59)*

___
<a id="type"></a>

##  type

**● type**: *[KeyringPairType](../modules/_types_.md#keyringpairtype)*

*Defined in [types.ts:60](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L60)*

___

# Methods

<a id="addfromaddress"></a>

##  addFromAddress

▸ **addFromAddress**(address: *`string` \| `Uint8Array`*, meta?: *[KeyringPair$Meta](../modules/_types_.md#keyringpair_meta)*, encoded?: *`Uint8Array` \| `null`*, type?: *[KeyringPairType](../modules/_types_.md#keyringpairtype)*): [KeyringPair](_types_.keyringpair.md)

*Defined in [types.ts:67](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L67)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| address | `string` \| `Uint8Array` |
| `Optional` meta | [KeyringPair$Meta](../modules/_types_.md#keyringpair_meta) |
| `Optional` encoded | `Uint8Array` \| `null` |
| `Optional` type | [KeyringPairType](../modules/_types_.md#keyringpairtype) |

**Returns:** [KeyringPair](_types_.keyringpair.md)

___
<a id="addfromjson"></a>

##  addFromJson

▸ **addFromJson**(pair: *[KeyringPair$Json](../modules/_types_.md#keyringpair_json)*): [KeyringPair](_types_.keyringpair.md)

*Defined in [types.ts:70](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L70)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| pair | [KeyringPair$Json](../modules/_types_.md#keyringpair_json) |

**Returns:** [KeyringPair](_types_.keyringpair.md)

___
<a id="addfrommnemonic"></a>

##  addFromMnemonic

▸ **addFromMnemonic**(mnemonic: *`string`*, meta?: *[KeyringPair$Meta](../modules/_types_.md#keyringpair_meta)*, type?: *[KeyringPairType](../modules/_types_.md#keyringpairtype)*): [KeyringPair](_types_.keyringpair.md)

*Defined in [types.ts:68](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L68)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| mnemonic | `string` |
| `Optional` meta | [KeyringPair$Meta](../modules/_types_.md#keyringpair_meta) |
| `Optional` type | [KeyringPairType](../modules/_types_.md#keyringpairtype) |

**Returns:** [KeyringPair](_types_.keyringpair.md)

___
<a id="addfromseed"></a>

##  addFromSeed

▸ **addFromSeed**(seed: *`Uint8Array`*, meta?: *[KeyringPair$Meta](../modules/_types_.md#keyringpair_meta)*, type?: *[KeyringPairType](../modules/_types_.md#keyringpairtype)*): [KeyringPair](_types_.keyringpair.md)

*Defined in [types.ts:69](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L69)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| seed | `Uint8Array` |
| `Optional` meta | [KeyringPair$Meta](../modules/_types_.md#keyringpair_meta) |
| `Optional` type | [KeyringPairType](../modules/_types_.md#keyringpairtype) |

**Returns:** [KeyringPair](_types_.keyringpair.md)

___
<a id="addpair"></a>

##  addPair

▸ **addPair**(pair: *[KeyringPair](_types_.keyringpair.md)*): [KeyringPair](_types_.keyringpair.md)

*Defined in [types.ts:66](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L66)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| pair | [KeyringPair](_types_.keyringpair.md) |

**Returns:** [KeyringPair](_types_.keyringpair.md)

___
<a id="decodeaddress"></a>

##  decodeAddress

▸ **decodeAddress**(encoded: *`string` \| `Uint8Array`*): `Uint8Array`

*Defined in [types.ts:62](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L62)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| encoded | `string` \| `Uint8Array` |

**Returns:** `Uint8Array`

___
<a id="encodeaddress"></a>

##  encodeAddress

▸ **encodeAddress**(key: *`Uint8Array` \| `string`*): `string`

*Defined in [types.ts:63](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L63)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| key | `Uint8Array` \| `string` |

**Returns:** `string`

___
<a id="getpair"></a>

##  getPair

▸ **getPair**(address: *`string` \| `Uint8Array`*): [KeyringPair](_types_.keyringpair.md)

*Defined in [types.ts:71](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L71)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| address | `string` \| `Uint8Array` |

**Returns:** [KeyringPair](_types_.keyringpair.md)

___
<a id="getpairs"></a>

##  getPairs

▸ **getPairs**(): `Array`<[KeyringPair](_types_.keyringpair.md)>

*Defined in [types.ts:72](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L72)*

**Returns:** `Array`<[KeyringPair](_types_.keyringpair.md)>

___
<a id="getpublickeys"></a>

##  getPublicKeys

▸ **getPublicKeys**(): `Array`<`Uint8Array`>

*Defined in [types.ts:73](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L73)*

**Returns:** `Array`<`Uint8Array`>

___
<a id="removepair"></a>

##  removePair

▸ **removePair**(address: *`string` \| `Uint8Array`*): `void`

*Defined in [types.ts:74](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L74)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| address | `string` \| `Uint8Array` |

**Returns:** `void`

___
<a id="setaddressprefix"></a>

##  setAddressPrefix

▸ **setAddressPrefix**(prefix: *[Prefix](../modules/_address_types_.md#prefix)*): `void`

*Defined in [types.ts:64](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L64)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| prefix | [Prefix](../modules/_address_types_.md#prefix) |

**Returns:** `void`

___
<a id="tojson"></a>

##  toJson

▸ **toJson**(address: *`string` \| `Uint8Array`*, passphrase?: *`undefined` \| `string`*): [KeyringPair$Json](../modules/_types_.md#keyringpair_json)

*Defined in [types.ts:75](https://github.com/polkadot-js/common/blob/bc2b134/packages/keyring/src/types.ts#L75)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| address | `string` \| `Uint8Array` |
| `Optional` passphrase | `undefined` \| `string` |

**Returns:** [KeyringPair$Json](../modules/_types_.md#keyringpair_json)

___

