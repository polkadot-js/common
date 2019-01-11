

# Functions

<a id="sha512asu8a"></a>

##  sha512AsU8a

▸ **sha512AsU8a**(data: *`Uint8Array`*): `Uint8Array`

*Defined in [sha512/asU8a.ts:22](https://github.com/polkadot-js/common/blob/5d6dd86/packages/util-crypto/src/sha512/asU8a.ts#L22)*

*__name__*: sha512AsU8a

*__signature__*: sha512AsU8a (data: Uint8Array): Uint8Array

*__summary__*: Creates sha-512 hash of the input.

*__description__*: Returns a sha-512 `Uint8Array` from the supplied data.

*__example__*:   

```javascript
import { sha512AsU8a } from '@polkadot/util-crypto';

sha512AsU8a(Uint8Array.from([...])); // => Uint8Array([...])
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `Uint8Array` |

**Returns:** `Uint8Array`

___

