

# Functions

<a id="naclkeypairfromsecret"></a>

##  naclKeypairFromSecret

▸ **naclKeypairFromSecret**(secret: *`Uint8Array`*): [KeypairType](_types_.md#keypairtype)

*Defined in [nacl/keypair/fromSecret.ts:23](https://github.com/polkadot-js/common/blob/38e1c5e/packages/util-crypto/src/nacl/keypair/fromSecret.ts#L23)*

*__name__*: naclKeypairFromSecret

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

**Returns:** [KeypairType](_types_.md#keypairtype)

___

