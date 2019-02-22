

# Functions

<a id="naclencrypt"></a>

##  naclEncrypt

▸ **naclEncrypt**(message: *`Uint8Array`*, secret: *`Uint8Array`*, nonce?: *`Uint8Array`*): `Encrypted`

*Defined in [nacl/encrypt.ts:28](https://github.com/polkadot-js/common/blob/0f57902/packages/util-crypto/src/nacl/encrypt.ts#L28)*

*__name__*: naclEncrypt

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

