

# Functions

<a id="naclsign"></a>

##  naclSign

▸ **naclSign**(message: *`Uint8Array`*, secretKey: *`Uint8Array`*): `Uint8Array`

*Defined in [nacl/sign.ts:22](https://github.com/polkadot-js/common/blob/89030f4/packages/util-crypto/src/nacl/sign.ts#L22)*

*__name__*: naclSign

*__signature__*: naclSign (message: Uint8Array, secretKey: Uint8Array): Uint8Array

*__summary__*: Signs a message using the supplied secretKey

*__description__*: Returns message signature of `message`, using the `secretKey`.

*__example__*:   

```javascript
import { naclSign } from '@polkadot/util-crypto';

naclSign([...], [...]); // => [...]
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| message | `Uint8Array` |
| secretKey | `Uint8Array` |

**Returns:** `Uint8Array`

___

