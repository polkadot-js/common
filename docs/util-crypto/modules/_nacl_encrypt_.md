

# Functions

<a id="naclencrypt"></a>

##  naclEncrypt

▸ **naclEncrypt**(message: *`Uint8Array`*, secret: *`Uint8Array`*, nonce?: *`Uint8Array`*): `Encrypted`

*Defined in [nacl/encrypt.ts:29](https://github.com/polkadot-js/common/blob/33f3ed5/packages/util-crypto/src/nacl/encrypt.ts#L29)*

*__name__*: naclEncrypt

*__signature__*: naclEncrypt (message: Uint8Array, secret: Uint8Array, nonce?: Uint8Array): { encrypted: Uint8Array, nonce: Uint8Array }

*__summary__*: Encrypts a message using the supplied secretKey and nonce

*__description__*: Returns an encrypted message, using the `secretKey` and `nonce`. If the `nonce` was not supplied, a random value is generated.

*__example__*:   

```javascript
import { naclEncrypt } from '@polkadot/util-crypto';

naclEncrypt([...], [...]); // => [...]
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| message | `Uint8Array` | - |
| secret | `Uint8Array` | - |
| `Default value` nonce | `Uint8Array` |  randomAsU8a(24) |

**Returns:** `Encrypted`

___

