

# Functions

<a id="mnemonicvalidate"></a>

##  mnemonicValidate

▸ **mnemonicValidate**(mnemonic: *`string`*): `boolean`

*Defined in [mnemonic/validate.ts:21](https://github.com/polkadot-js/common/blob/4c658e8/packages/util-crypto/src/mnemonic/validate.ts#L21)*

*__name__*: mnemonicValidate

*__signature__*: mnemonicValidate (mnemonic: string): boolean

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

