

# Functions

<a id="naclkeypairfromseed"></a>

##  naclKeypairFromSeed

▸ **naclKeypairFromSeed**(seed: *`Uint8Array`*): [KeypairType](_types_.md#keypairtype)

*Defined in [nacl/keypair/fromSeed.ts:23](https://github.com/polkadot-js/common/blob/2efc5f7/packages/util-crypto/src/nacl/keypair/fromSeed.ts#L23)*

*__name__*: naclKeypairFromSeed

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

**Returns:** [KeypairType](_types_.md#keypairtype)

___

