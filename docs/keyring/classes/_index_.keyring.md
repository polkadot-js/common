

@polkadot/common/keyring
========================

Overview
--------
*__name__*: Keyring

*__summary__*: Keyring management of user accounts

*__description__*: Allows generation of keyring pairs from a variety of input combinations, such as json object containing account address or public key, account metadata, and account encoded using `addFromJson`, or by providing those values as arguments separately to `addFromAddress`, or by providing the mnemonic (seed phrase) and account metadata as arguments to `addFromMnemonic`. Stores the keyring pairs in a keyring pair dictionary. Removal of the keyring pairs from the keyring pair dictionary is achieved using `removePair`. Retrieval of all the stored pairs via `getPairs` or perform lookup of a pair for a given account address or public key using `getPair`. JSON metadata associated with an account may be obtained using `toJson` accompanied by the account passphrase.

*__example__*: See [Polkadot-JS Common Keyring Examples](https://polkadot.js.org/api/common/examples/keyring/) and the [Polkadot-JS Apps ui-keyring package](https://github.com/polkadot-js/apps/tree/master/packages/ui-keyring) where it is implemented.

# Hierarchy

**Keyring**

# Implements

* [KeyringInstance](../interfaces/_types_.keyringinstance.md)

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new Keyring**(): [Keyring](_index_.keyring.md)

*Defined in [index.ts:33](https://github.com/polkadot-js/common/blob/cd7f644/packages/keyring/src/index.ts#L33)*

**Returns:** [Keyring](_index_.keyring.md)

___

# Properties

<a id="decodeaddress"></a>

##  decodeAddress

**● decodeAddress**: *[decode](../modules/_address_decode_.md#decode)* =  decodeAddress

*Implementation of [KeyringInstance](../interfaces/_types_.keyringinstance.md).[decodeAddress](../interfaces/_types_.keyringinstance.md#decodeaddress)*

*Defined in [index.ts:39](https://github.com/polkadot-js/common/blob/cd7f644/packages/keyring/src/index.ts#L39)*

___
<a id="encodeaddress"></a>

##  encodeAddress

**● encodeAddress**: *[encode](../modules/_address_encode_.md#encode)* =  encodeAddress

*Implementation of [KeyringInstance](../interfaces/_types_.keyringinstance.md).[encodeAddress](../interfaces/_types_.keyringinstance.md#encodeaddress)*

*Defined in [index.ts:40](https://github.com/polkadot-js/common/blob/cd7f644/packages/keyring/src/index.ts#L40)*

___
<a id="setaddressprefix"></a>

##  setAddressPrefix

**● setAddressPrefix**: *[setPrefix](../modules/_address_setprefix_.md#setprefix)* =  setAddressPrefix

*Implementation of [KeyringInstance](../interfaces/_types_.keyringinstance.md).[setAddressPrefix](../interfaces/_types_.keyringinstance.md#setaddressprefix)*

*Defined in [index.ts:41](https://github.com/polkadot-js/common/blob/cd7f644/packages/keyring/src/index.ts#L41)*

___

# Methods

<a id="addfromaddress"></a>

##  addFromAddress

▸ **addFromAddress**(address: * `string` &#124; `Uint8Array`*, meta?: *[KeyringPair$Meta](../modules/_types_.md#keyringpair_meta)*, defaultEncoded?: *`Uint8Array`*): [KeyringPair](../modules/_types_.md#keyringpair)

*Defined in [index.ts:61](https://github.com/polkadot-js/common/blob/cd7f644/packages/keyring/src/index.ts#L61)*

*__name__*: addFromAddress

*__signature__*: addFromAddress (address: string | Uint8Array, meta?: KeyringPair$Meta, defaultEncoded?: Uint8Array): KeyringPair

*__summary__*: Stores an account, given an account address, as a Key/Value (public key, pair) in Keyring Pair Dictionary

*__description__*: Allows user to explicitely provide separate inputs including account address or public key, and optionally the associated account metadata, and the default encoded value as arguments (that may be obtained from the json file of an account backup), and then generates a keyring pair from them that it passes to `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.

**Parameters:**

| Name | Type |
| ------ | ------ |
| address |  `string` &#124; `Uint8Array`|
| `Optional` meta | [KeyringPair$Meta](../modules/_types_.md#keyringpair_meta) |
| `Optional` defaultEncoded | `Uint8Array` |

**Returns:** [KeyringPair](../modules/_types_.md#keyringpair)

___
<a id="addfromjson"></a>

##  addFromJson

▸ **addFromJson**(__namedParameters: *`object`*): [KeyringPair](../modules/_types_.md#keyringpair)

*Defined in [index.ts:76](https://github.com/polkadot-js/common/blob/cd7f644/packages/keyring/src/index.ts#L76)*

*__name__*: addFromJson

*__signature__*: addFromJson ({ address, encoded, meta }: KeyringPair$Json): KeyringPair

*__summary__*: Stores an account, given JSON data, as a Key/Value (public key, pair) in Keyring Pair Dictionary

*__description__*: Allows user to provide a json object argument that contains account information (that may be obtained from the json file of an account backup), and then generates a keyring pair from it that it passes to `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.

*__example__*: Refer to an actual implementation in [Polkadot-JS ui-keyring > account > save](https://github.com/polkadot-js/apps/blob/master/packages/ui-keyring/src/account/save.ts#L15)

**Parameters:**

| Name | Type |
| ------ | ------ |
| __namedParameters | `object` |

**Returns:** [KeyringPair](../modules/_types_.md#keyringpair)

___
<a id="addfrommnemonic"></a>

##  addFromMnemonic

▸ **addFromMnemonic**(mnemonic: *`string`*, meta?: *[KeyringPair$Meta](../modules/_types_.md#keyringpair_meta)*): [KeyringPair](../modules/_types_.md#keyringpair)

*Implementation of [KeyringInstance](../interfaces/_types_.keyringinstance.md).[addFromMnemonic](../interfaces/_types_.keyringinstance.md#addfrommnemonic)*

*Defined in [index.ts:89](https://github.com/polkadot-js/common/blob/cd7f644/packages/keyring/src/index.ts#L89)*

*__name__*: addFromMnemonic

*__signature__*: addFromMnemonic (mnemonic: string, meta?: KeyringPair$Meta): KeyringPair

*__summary__*: Stores an account, given a mnemonic, as a Key/Value (public key, pair) in Keyring Pair Dictionary

*__description__*: Allows user to provide a mnemonic (seed phrase that is provided when account is originally created) argument and a metadata argument that contains account information (that may be obtained from the json file of an account backup), and then generates a keyring pair from it that it passes to `addPair` to stores in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.

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

*Implementation of [KeyringInstance](../interfaces/_types_.keyringinstance.md).[addFromSeed](../interfaces/_types_.keyringinstance.md#addfromseed)*

*Defined in [index.ts:118](https://github.com/polkadot-js/common/blob/cd7f644/packages/keyring/src/index.ts#L118)*

*__name__*: addFromSeed

*__signature__*: addFromSeed (seed: Uint8Array, meta?: KeyringPair$Meta): KeyringPair

*__summary__*: Stores an account, given seed data, as a Key/Value (public key, pair) in Keyring Pair Dictionary

*__description__*: Stores in a keyring pair dictionary the public key of the pair as a key and the pair as the associated value. Allows user to provide the account seed as an argument, and then generates a keyring pair from it that it passes to `addPair` to store in a keyring pair dictionary the public key of the generated pair as a key and the pair as the associated value.

*__example__*:   

```javascript
import Keyring from '@polkadot/keyring';
import stringToU8a from '@polkadot/util/string/toU8a';

const ALICE_SEED = 'Alice'.padEnd(32, ' ');

// Create an instance of the Keyring
const keyring = new Keyring();

// Add Alice to our keyring pair dictionary (with the known seed for the account)
const pairAlice = keyring.addFromSeed(stringToU8a(ALICE_SEED));
```

Refer to an actual implementation in [Polkadot-JS ui-keyring > account > create](https://github.com/polkadot-js/apps/blob/master/packages/ui-keyring/src/account/create.ts#L11)

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

*Implementation of [KeyringInstance](../interfaces/_types_.keyringinstance.md).[addPair](../interfaces/_types_.keyringinstance.md#addpair)*

*Defined in [index.ts:48](https://github.com/polkadot-js/common/blob/cd7f644/packages/keyring/src/index.ts#L48)*

*__name__*: addPair

*__signature__*: addPair (pair: KeyringPair): KeyringPair

*__summary__*: Stores an account, given a keyring pair, as a Key/Value (public key, pair) in Keyring Pair Dictionary

**Parameters:**

| Name | Type |
| ------ | ------ |
| pair | [KeyringPair](../modules/_types_.md#keyringpair) |

**Returns:** [KeyringPair](../modules/_types_.md#keyringpair)

___
<a id="getpair"></a>

##  getPair

▸ **getPair**(address: * `string` &#124; `Uint8Array`*): [KeyringPair](../modules/_types_.md#keyringpair)

*Implementation of [KeyringInstance](../interfaces/_types_.keyringinstance.md).[getPair](../interfaces/_types_.keyringinstance.md#getpair)*

*Defined in [index.ts:154](https://github.com/polkadot-js/common/blob/cd7f644/packages/keyring/src/index.ts#L154)*

*__name__*: getPair

*__signature__*: getPair (address: string | Uint8Array): KeyringPair

*__summary__*: Retrieves an account keyring pair from the Keyring Pair Dictionary, given an account address

*__description__*: Returns a keyring pair value from the keyring pair dictionary by performing a key lookup using the provided account address or public key (after decoding it).

*__example__*:   

```javascript
import Keyring from '@polkadot/keyring';
import stringToU8a from '@polkadot/util/string/toU8a';

const ALICE_SEED = 'Alice'.padEnd(32, ' ');

// Create an instance of the Keyring
const keyring = new Keyring();

// Add Alice to our keyring pair dictionary (with the known seed for the account)
const pairAlice = keyring.addFromSeed(stringToU8a(ALICE_SEED));

// Retrieve the same pair that is stored in the keyring pair dictionary by
// providing the account address as an argument, and also the public key as an argument.
// The pairs that are returned should both be the same value as `pairAlice` above
const pairAliceRetrievedWithAddress = keyring.getPair(pairAlice.address());
const pairAliceRetrievedWithPublicKey = keyring.getPair(pairAlice.publicKey());

// Check if all returned pairs are the same
console.log(`Are all pairs the same? : ` +
  `${pairAlice === pairAliceRetrievedWithAddress === pairAliceRetrievedWithPublicKey}`);
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| address |  `string` &#124; `Uint8Array`|

**Returns:** [KeyringPair](../modules/_types_.md#keyringpair)

___
<a id="getpairs"></a>

##  getPairs

▸ **getPairs**(): `Array`<[KeyringPair](../modules/_types_.md#keyringpair)>

*Implementation of [KeyringInstance](../interfaces/_types_.keyringinstance.md).[getPairs](../interfaces/_types_.keyringinstance.md#getpairs)*

*Defined in [index.ts:186](https://github.com/polkadot-js/common/blob/cd7f644/packages/keyring/src/index.ts#L186)*

*__name__*: getPairs

*__signature__*: getPairs (): Array

*__summary__*: Retrieves all account keyring pairs from the Keyring Pair Dictionary

*__description__*: Returns an array list of all the keyring pair values that are stored in the keyring pair dictionary.

*__example__*:   

```javascript
import testKeyring from '@polkadot/keyring/testing';

// Create an instance of Keyring that includes test accounts
const keyring = testingPairs();

keyring
  .getPairs()
  .forEach((pair) => {
    const address = pair.address();

    keyring.addPair(address, {
      address,
      meta: pair.getMeta()
    });
  });
```

Refer to an actual implementation in [Polkadot-JS ui-keyring > loadAll](https://github.com/polkadot-js/apps/blob/master/packages/ui-keyring/src/loadAll.ts)

**Returns:** `Array`<[KeyringPair](../modules/_types_.md#keyringpair)>

___
<a id="getpublickeys"></a>

##  getPublicKeys

▸ **getPublicKeys**(): `Array`<`Uint8Array`>

*Implementation of [KeyringInstance](../interfaces/_types_.keyringinstance.md).[getPublicKeys](../interfaces/_types_.keyringinstance.md#getpublickeys)*

*Defined in [index.ts:196](https://github.com/polkadot-js/common/blob/cd7f644/packages/keyring/src/index.ts#L196)*

*__name__*: getPublicKeys

*__signature__*: getPublicKeys (): Array

*__summary__*: Retrieves Public Keys of all Keyring Pairs stored in the Keyring Pair Dictionary

*__description__*: Returns an array list of all the public keys associated with each of the keyring pair values that are stored in the keyring pair dictionary.

**Returns:** `Array`<`Uint8Array`>

___
<a id="removepair"></a>

##  removePair

▸ **removePair**(address: * `string` &#124; `Uint8Array`*): `void`

*Implementation of [KeyringInstance](../interfaces/_types_.keyringinstance.md).[removePair](../interfaces/_types_.keyringinstance.md#removepair)*

*Defined in [index.ts:211](https://github.com/polkadot-js/common/blob/cd7f644/packages/keyring/src/index.ts#L211)*

*__name__*: removePair

*__signature__*: removePair (address: string | Uint8Array): void

*__description__*: Deletes the provided input address or public key from the stored Keyring Pair Dictionary.

*__example__*: Refer to an actual implementation in [Polkadot-JS ui-keyring > account > forget](https://github.com/polkadot-js/apps/blob/master/packages/ui-keyring/src/account/forget.ts)

**Parameters:**

| Name | Type |
| ------ | ------ |
| address |  `string` &#124; `Uint8Array`|

**Returns:** `void`

___
<a id="tojson"></a>

##  toJson

▸ **toJson**(address: * `string` &#124; `Uint8Array`*, passphrase?: * `undefined` &#124; `string`*): [KeyringPair$Json](../modules/_types_.md#keyringpair_json)

*Implementation of [KeyringInstance](../interfaces/_types_.keyringinstance.md).[toJson](../interfaces/_types_.keyringinstance.md#tojson)*

*Defined in [index.ts:226](https://github.com/polkadot-js/common/blob/cd7f644/packages/keyring/src/index.ts#L226)*

*__name__*: toJson

*__signature__*: toJson (address: string | Uint8Array, passphrase?: string): KeyringPair$Json

*__summary__*: Returns a JSON object associated with the input argument that contains metadata assocated with an account

*__description__*: Returns a JSON object containing the metadata associated with an account when valid address or public key and when the account passphrase is provided if the account secret is not already unlocked and available in memory. Note that in [Polkadot-JS Apps](https://github.com/polkadot-js/apps) the user may backup their account to a JSON file that contains this information.

*__example__*: Refer to an actual implementation in [Polkadot-JS ui-keyring > account > save](https://github.com/polkadot-js/apps/blob/master/packages/ui-keyring/src/account/save.ts#L9)

**Parameters:**

| Name | Type |
| ------ | ------ |
| address |  `string` &#124; `Uint8Array`|
| `Optional` passphrase |  `undefined` &#124; `string`|

**Returns:** [KeyringPair$Json](../modules/_types_.md#keyringpair_json)

___

