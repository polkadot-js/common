

# Functions

<a id="naclverify"></a>

##  naclVerify

▸ **naclVerify**(message: *`Uint8Array`*, signature: *`Uint8Array`*, publicKey: *`Uint8Array`*): `boolean`

*Defined in [nacl/verify.ts:22](https://github.com/polkadot-js/common/blob/4c658e8/packages/util-crypto/src/nacl/verify.ts#L22)*

*__name__*: naclSign

*__signature__*: naclVerify (message: Uint8Array, signature: Uint8Array, publicKey: Uint8Array): boolean

*__summary__*: Verifies the signature on the supplied message.

*__description__*: Verifies the `signature` on `message` with the supplied `plublicKey`. Returns `true` on sucess, `false` otherwise.

*__example__*:   

```javascript
import { naclVerify } from '@polkadot/util-crypto';

naclVerify([...], [...], [...]); // => true/false
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `Uint8Array` |
| signature | `Uint8Array` |
| publicKey | `Uint8Array` |

**Returns:** `boolean`

___

