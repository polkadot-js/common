

# Functions

<a id="testkeyring"></a>

##  testKeyring

▸ **testKeyring**(): [KeyringInstance](../interfaces/_types_.keyringinstance.md)

*Defined in [testing.ts:57](https://github.com/polkadot-js/common/blob/f011334/packages/keyring/src/testing.ts#L57)*

*__name__*: testKeyring

*__signature__*: testKeyring (): KeyringInstance

*__summary__*: Create an instance of Keyring pre-populated with locked test accounts

*__description__*: The test accounts (i.e. alice, bob, dave, eve, ferdie) are available on the dev chain and each test account is initialised with DOT funds.

*__example__*:   

```javascript
import testKeyring from '@polkadot/keyring/testing';

// Create an instance of Keyring that includes test accounts
const keyring = testingPairs();

// Retrieve the address of one of the test accounts
const addressAlice = keyring.alice.address();

// Retrieve the public key of one of the test accounts
const publicKeyAlice = keyring.alice.publicKey();
```

**Returns:** [KeyringInstance](../interfaces/_types_.keyringinstance.md)

___

