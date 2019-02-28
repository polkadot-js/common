

# Functions

<a id="mnemonicgenerate"></a>

##  mnemonicGenerate

▸ **mnemonicGenerate**(numWords?: *`WordCount`*): `string`

*Defined in [mnemonic/generate.ts:30](https://github.com/polkadot-js/common/blob/db4b221/packages/util-crypto/src/mnemonic/generate.ts#L30)*

*__name__*: mnemonicGenerate

*__summary__*: Creates a valid mnemonic string using using [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).

*__example__*:   

```javascript
import { mnemonicGenerate } from '@polkadot/util-crypto';

const mnemonic = mnemonicGenerate(); // => string
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` numWords | `WordCount` | 12 |

**Returns:** `string`

___

