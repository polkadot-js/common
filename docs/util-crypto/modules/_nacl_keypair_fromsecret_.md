

# Functions

<a id="naclkeypairfromsecret"></a>

##  naclKeypairFromSecret

▸ **naclKeypairFromSecret**(secret: *`Uint8Array`*): `KeypairType`

*Defined in [nacl/keypair/fromSecret.ts:24](https://github.com/polkadot-js/common/blob/dc996ef/packages/util-crypto/src/nacl/keypair/fromSecret.ts#L24)*

*__name__*: naclKeypairFromSecret

*__signature__*: naclKeypairFromSecret (secret: Uint8Array): { secretKey: Uint8Array, publicKey: Uint8Array }

*__summary__*: Creates a new public/secret keypair from a secret.

*__description__*: Returns a object containing a `publicKey` & `secretKey` generated from the supplied secret.

*__example__*:   

```javascript
import { naclKeypairFromSecret } from '@polkadot/util-crypto';

naclKeypairFromSecret(...); // => { secretKey: [...], publicKey: [...] }
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| secret | `Uint8Array` |

**Returns:** `KeypairType`

___

