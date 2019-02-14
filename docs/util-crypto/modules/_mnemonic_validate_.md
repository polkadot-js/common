

# Functions

<a id="mnemonicvalidate"></a>

##  mnemonicValidate

▸ **mnemonicValidate**(mnemonic: *`string`*): `boolean`

*Defined in [mnemonic/validate.ts:20](https://github.com/polkadot-js/common/blob/1e6eb2c/packages/util-crypto/src/mnemonic/validate.ts#L20)*

*__name__*: mnemonicValidate

*__summary__*: Validates a mnemonic input using [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).

*__example__*:   

```javascript
import { mnemonicGenerate, mnemonicValidate } from '@polkadot/util-crypto';

const mnemonic = mnemonicGenerate(); // => string
const isValidMnemonic = mnemonicValidate(mnemonic); // => boolean
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| mnemonic | `string` |

**Returns:** `boolean`

___

