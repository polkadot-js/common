

# Functions

<a id="mnemonicgenerate"></a>

##  mnemonicGenerate

▸ **mnemonicGenerate**(strength?: *`Strength`*): `string`

*Defined in [mnemonic/generate.ts:21](https://github.com/polkadot-js/common/blob/38e1c5e/packages/util-crypto/src/mnemonic/generate.ts#L21)*

*__name__*: mnemonicGenerate

*__summary__*: Creates a valid mnemonic string using using [BIP39](https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki).

*__example__*:   

```javascript
import { mnemonicGenerate } from '@polkadot/util-crypto';

const mnemonic = mnemonicGenerate(); // => string
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Optional` strength | `Strength` |

**Returns:** `string`

___

