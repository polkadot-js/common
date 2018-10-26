

# Functions

<a id="naclkeypairfromstring"></a>

##  naclKeypairFromString

▸ **naclKeypairFromString**(value: *`string`*): `KeypairType`

*Defined in [nacl/keypair/fromString.ts:27](https://github.com/polkadot-js/common/blob/d0291db/packages/util-crypto/src/nacl/keypair/fromString.ts#L27)*

*__name__*: naclKeypairFromString

*__signature__*: naclKeypairFromString (value: string): { secretKey: Uint8Array, publicKey: Uint8Array }

*__summary__*: Creates a new public/secret keypair from a string.

*__description__*: Returns a object containing a `publicKey` & `secretKey` generated from the supplied string. The string is hashed and the value used as the input seed.

*__example__*:   

```javascript
import { naclKeypairFromString } from '@polkadot/util-crypto';

naclKeypairFromString('test'); // => { secretKey: [...], publicKey: [...] }
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `string` |

**Returns:** `KeypairType`

___

