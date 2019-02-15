

# Functions

<a id="naclkeypairfromstring"></a>

##  naclKeypairFromString

▸ **naclKeypairFromString**(value: *`string`*): [KeypairType](_types_.md#keypairtype)

*Defined in [nacl/keypair/fromString.ts:26](https://github.com/polkadot-js/common/blob/50721f2/packages/util-crypto/src/nacl/keypair/fromString.ts#L26)*

*__name__*: naclKeypairFromString

*__summary__*: Creates a new public/secret keypair from a string.

*__description__*: Returns a object containing a `publicKey` & `secretKey` generated from the supplied string. The string is hashed and the value used as the input seed.

*__example__*:   

```javascript
import { naclKeypairFromString } from '@polkadot/util-crypto';

naclKeypairFromString('test'); // => { secretKey: [...], publicKey: [...] }
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` |

**Returns:** [KeypairType](_types_.md#keypairtype)

___

