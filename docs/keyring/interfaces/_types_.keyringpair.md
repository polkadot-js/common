

# Hierarchy

**KeyringPair**

# Properties

<a id="address"></a>

##  address

**● address**: *`function`*

*Defined in [types.ts:36](https://github.com/polkadot-js/common/blob/6610403/packages/keyring/src/types.ts#L36)*

#### Type declaration
▸(): `string`

**Returns:** `string`

___
<a id="decodepkcs8"></a>

##  decodePkcs8

**● decodePkcs8**: *`function`*

*Defined in [types.ts:37](https://github.com/polkadot-js/common/blob/6610403/packages/keyring/src/types.ts#L37)*

#### Type declaration
▸(passphrase?: *`undefined` \| `string`*, encoded?: *`Uint8Array`*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` passphrase | `undefined` \| `string` |
| `Optional` encoded | `Uint8Array` |

**Returns:** `void`

___
<a id="encodepkcs8"></a>

##  encodePkcs8

**● encodePkcs8**: *`function`*

*Defined in [types.ts:38](https://github.com/polkadot-js/common/blob/6610403/packages/keyring/src/types.ts#L38)*

#### Type declaration
▸(passphrase?: *`undefined` \| `string`*): `Uint8Array`

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` passphrase | `undefined` \| `string` |

**Returns:** `Uint8Array`

___
<a id="getmeta"></a>

##  getMeta

**● getMeta**: *`function`*

*Defined in [types.ts:39](https://github.com/polkadot-js/common/blob/6610403/packages/keyring/src/types.ts#L39)*

#### Type declaration
▸(): [KeyringPair$Meta](../modules/_types_.md#keyringpair_meta)

**Returns:** [KeyringPair$Meta](../modules/_types_.md#keyringpair_meta)

___
<a id="islocked"></a>

##  isLocked

**● isLocked**: *`function`*

*Defined in [types.ts:40](https://github.com/polkadot-js/common/blob/6610403/packages/keyring/src/types.ts#L40)*

#### Type declaration
▸(): `boolean`

**Returns:** `boolean`

___
<a id="lock"></a>

##  lock

**● lock**: *`function`*

*Defined in [types.ts:41](https://github.com/polkadot-js/common/blob/6610403/packages/keyring/src/types.ts#L41)*

#### Type declaration
▸(): `void`

**Returns:** `void`

___
<a id="publickey"></a>

##  publicKey

**● publicKey**: *`function`*

*Defined in [types.ts:42](https://github.com/polkadot-js/common/blob/6610403/packages/keyring/src/types.ts#L42)*

#### Type declaration
▸(): `Uint8Array`

**Returns:** `Uint8Array`

___
<a id="setmeta"></a>

##  setMeta

**● setMeta**: *`function`*

*Defined in [types.ts:43](https://github.com/polkadot-js/common/blob/6610403/packages/keyring/src/types.ts#L43)*

#### Type declaration
▸(meta: *[KeyringPair$Meta](../modules/_types_.md#keyringpair_meta)*): `void`

**Parameters:**

| Name | Type |
| ------ | ------ |
| meta | [KeyringPair$Meta](../modules/_types_.md#keyringpair_meta) |

**Returns:** `void`

___
<a id="type"></a>

##  type

**● type**: *[KeyringPairType](../modules/_types_.md#keyringpairtype)*

*Defined in [types.ts:34](https://github.com/polkadot-js/common/blob/6610403/packages/keyring/src/types.ts#L34)*

___

# Methods

<a id="sign"></a>

##  sign

▸ **sign**(message: *`Uint8Array`*): `Uint8Array`

*Defined in [types.ts:44](https://github.com/polkadot-js/common/blob/6610403/packages/keyring/src/types.ts#L44)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `Uint8Array` |

**Returns:** `Uint8Array`

___
<a id="tojson"></a>

##  toJson

▸ **toJson**(passphrase?: *`undefined` \| `string`*): [KeyringPair$Json](../modules/_types_.md#keyringpair_json)

*Defined in [types.ts:45](https://github.com/polkadot-js/common/blob/6610403/packages/keyring/src/types.ts#L45)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` passphrase | `undefined` \| `string` |

**Returns:** [KeyringPair$Json](../modules/_types_.md#keyringpair_json)

___
<a id="totype"></a>

##  toType

▸ **toType**(type: *[KeyringPairType](../modules/_types_.md#keyringpairtype)*): [KeyringPair](_types_.keyringpair.md)

*Defined in [types.ts:46](https://github.com/polkadot-js/common/blob/6610403/packages/keyring/src/types.ts#L46)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| type | [KeyringPairType](../modules/_types_.md#keyringpairtype) |

**Returns:** [KeyringPair](_types_.keyringpair.md)

___
<a id="verify"></a>

##  verify

▸ **verify**(message: *`Uint8Array`*, signature: *`Uint8Array`*): `boolean`

*Defined in [types.ts:47](https://github.com/polkadot-js/common/blob/6610403/packages/keyring/src/types.ts#L47)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `Uint8Array` |
| signature | `Uint8Array` |

**Returns:** `boolean`

___

