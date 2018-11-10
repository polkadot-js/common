

# Functions

<a id="nacldecrypt"></a>

##  naclDecrypt

▸ **naclDecrypt**(encrypted: *`Uint8Array`*, nonce: *`Uint8Array`*, secret: *`Uint8Array`*):  `Uint8Array` &#124; `null`

*Defined in [nacl/decrypt.ts:22](https://github.com/polkadot-js/common/blob/a9878a2/packages/util-crypto/src/nacl/decrypt.ts#L22)*

*__name__*: naclDecrypt

*__signature__*: naclDecrypt (message: Uint8Array, nonce: Uint8Array, secret: Uint8Array): Uint8Array

*__summary__*: Decrypts a message using the supplied secretKey and nonce

*__description__*: Returns an decrypted message, using the `secret` and `nonce`.

*__example__*:   

```javascript
import { naclDecrypt } from '@polkadot/util-crypto';

naclDecrypt([...], [...], [...]); // => [...]
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| encrypted | `Uint8Array` |
| nonce | `Uint8Array` |
| secret | `Uint8Array` |

**Returns:**  `Uint8Array` &#124; `null`

___

