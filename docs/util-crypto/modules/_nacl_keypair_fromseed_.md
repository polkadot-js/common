

# Functions

<a id="naclkeypairfromseed"></a>

##  naclKeypairFromSeed

▸ **naclKeypairFromSeed**(seed: *`Uint8Array`*): `KeypairType`

*Defined in [nacl/keypair/fromSeed.ts:24](https://github.com/polkadot-js/common/blob/e5cab29/packages/util-crypto/src/nacl/keypair/fromSeed.ts#L24)*

*__name__*: naclKeypairFromSeed

*__signature__*: naclKeypairFromSeed (seed: Uint8Array): { secretKey: Uint8Array, publicKey: Uint8Array }

*__summary__*: Creates a new public/secret keypair from a seed.

*__description__*: Returns a object containing a `publicKey` & `secretKey` generated from the supplied seed.

*__example__*:   

```javascript
import { naclKeypairFromSeed } from '@polkadot/util-crypto';

naclKeypairFromSeed(...); // => { secretKey: [...], publicKey: [...] }
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| seed | `Uint8Array` |

**Returns:** `KeypairType`

___

