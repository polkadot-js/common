

# Functions

<a id="randomashex"></a>

##  randomAsHex

▸ **randomAsHex**(length?: *`number`*): `string`

*Defined in [random/asHex.ts:24](https://github.com/polkadot-js/common/blob/cd7f644/packages/util-crypto/src/random/asHex.ts#L24)*

*__name__*: randomAsHex

*__signature__*: randomAsHex (length?: number = 32): string

*__summary__*: Creates a hex string filled with random bytes.

*__description__*: Returns a hex string with the specified (optional) length filled with random bytes.

*__example__*:   

```javascript
import { randomAsHex } from '@polkadot/util-crypto';

randomAsHex(); // => 0x...
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` length | `number` | 32 |

**Returns:** `string`

___

