

# Functions

<a id="nacldecrypt"></a>

##  naclDecrypt

▸ **naclDecrypt**(encrypted: *`Uint8Array`*, nonce: *`Uint8Array`*, secret: *`Uint8Array`*): `Uint8Array` \| `null`

*Defined in [nacl/decrypt.ts:21](https://github.com/polkadot-js/common/blob/bc2b134/packages/util-crypto/src/nacl/decrypt.ts#L21)*

*__name__*: naclDecrypt

*__summary__*: Decrypts a message using the supplied secretKey and nonce

*__description__*: Returns an decrypted message, using the `secret` and `nonce`.

*__example__*:   

```javascript
import { naclDecrypt } from '@polkadot/util-crypto';

naclDecrypt([...], [...], [...]); // => [...]
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| encrypted | `Uint8Array` |
| nonce | `Uint8Array` |
| secret | `Uint8Array` |

**Returns:** `Uint8Array` \| `null`

___

