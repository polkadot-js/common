

# Functions

<a id="toseed"></a>

##  toSeed

▸ **toSeed**(mnemonic: *`string`*): `Uint8Array`

*Defined in [mnemonic/toSeed.ts:25](https://github.com/polkadot-js/common/blob/4c658e8/packages/util-crypto/src/mnemonic/toSeed.ts#L25)*

*__name__*: toSeed

*__signature__*: toSeed (mnemonic: string): Uint8Array

*__summary__*: Creates a valid seed from a mnemonic input

*__example__*:   

```javascript
import { mnemonicGenerate, mnemonicToSeed, mnemonicValidate } from '@polkadot/util-crypto';

const mnemonic = mnemonicGenerate(); // => string
const isValidMnemonic = mnemonicValidate(mnemonic); // => boolean

if (isValidMnemonic) {
  console.log(`Seed generated from mnemonic: ${mnemonicToSeed(mnemonic)}`); => u8a
}
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| mnemonic | `string` |

**Returns:** `Uint8Array`

___

