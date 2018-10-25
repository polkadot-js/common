

# Functions

<a id="naclkeypairfromrandom"></a>

##  naclKeypairFromRandom

▸ **naclKeypairFromRandom**(): `KeypairType`

*Defined in [nacl/keypair/fromRandom.ts:24](https://github.com/polkadot-js/common/blob/d0291db/packages/util-crypto/src/nacl/keypair/fromRandom.ts#L24)*

*__name__*: naclKeypairFromRandom

*__signature__*: naclKeypairFromRandom (): { secretKey: Uint8Array, publicKey: Uint8Array }

*__summary__*: Creates a new public/secret keypair.

*__description__*: Returns a new generate object containing a `publicKey` & `secretKey`.

*__example__*:   

```javascript
import { naclKeypairFromRandom } from '@polkadot/util-crypto';

naclKeypairFromRandom(); // => { secretKey: [...], publicKey: [...] }
```

**Returns:** `KeypairType`

___

