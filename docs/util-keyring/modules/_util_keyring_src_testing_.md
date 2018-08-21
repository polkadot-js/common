[@polkadot/util](../README.md) > ["util-keyring/src/testing"](../modules/_util_keyring_src_testing_.md)

# External module: "util-keyring/src/testing"

## Index

### Functions

* [padSeed](_util_keyring_src_testing_.md#padseed)
* [testKeyring](_util_keyring_src_testing_.md#testkeyring)

### Object literals

* [SEEDS](_util_keyring_src_testing_.md#seeds)

---

## Functions

<a id="padseed"></a>

###  padSeed

▸ **padSeed**(seed: *`string`*): `Uint8Array`

*Defined in [util-keyring/src/testing.ts:12](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/testing.ts#L12)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| seed | `string` |

**Returns:** `Uint8Array`

___
<a id="testkeyring"></a>

###  testKeyring

▸ **testKeyring**(): `KeyringInstance`

*Defined in [util-keyring/src/testing.ts:35](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/testing.ts#L35)*

**Returns:** `KeyringInstance`

___

## Object literals

<a id="seeds"></a>

### `<Const>` SEEDS

**SEEDS**: *`object`*

*Defined in [util-keyring/src/testing.ts:16](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/testing.ts#L16)*

<a id="seeds.alice"></a>

####  alice

**● alice**: *`Uint8Array`* = 
    padSeed('Alice')

*Defined in [util-keyring/src/testing.ts:17](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/testing.ts#L17)*

___
<a id="seeds.bob"></a>

####  bob

**● bob**: *`Uint8Array`* = 
    padSeed('Bob')

*Defined in [util-keyring/src/testing.ts:19](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/testing.ts#L19)*

___
<a id="seeds.charlie"></a>

####  charlie

**● charlie**: *`Uint8Array`* = 
    padSeed('Charlie')

*Defined in [util-keyring/src/testing.ts:21](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/testing.ts#L21)*

___
<a id="seeds.dave"></a>

####  dave

**● dave**: *`Uint8Array`* = 
    padSeed('Dave')

*Defined in [util-keyring/src/testing.ts:23](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/testing.ts#L23)*

___
<a id="seeds.eve"></a>

####  eve

**● eve**: *`Uint8Array`* = 
    padSeed('Eve')

*Defined in [util-keyring/src/testing.ts:25](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/testing.ts#L25)*

___
<a id="seeds.ferdie"></a>

####  ferdie

**● ferdie**: *`Uint8Array`* = 
    padSeed('Ferdie')

*Defined in [util-keyring/src/testing.ts:27](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/testing.ts#L27)*

___
<a id="seeds.one"></a>

####  one

**● one**: *`Uint8Array`* = 
    padSeed('12345678901234567890123456789012')

*Defined in [util-keyring/src/testing.ts:29](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/testing.ts#L29)*

___
<a id="seeds.two"></a>

####  two

**● two**: *`Uint8Array`* = 
    hexToU8a('0x9d61b19deffd5a60ba844af492ec2cc44449c5697b326919703bac031cae7f60')

*Defined in [util-keyring/src/testing.ts:31](https://github.com/polkadot-js/util/blob/7550b44/packages/util-keyring/src/testing.ts#L31)*

___

___

