

# Functions

<a id="hexstripprefix"></a>

##  hexStripPrefix

▸ **hexStripPrefix**(value: *`string` | `null` | `undefined`*): `string`

*Defined in [hex/stripPrefix.ts:24](https://github.com/polkadot-js/common/blob/5cb5390/packages/util/src/hex/stripPrefix.ts#L24)*

*__name__*: hexStripPrefix

*__signature__*: hexStripPrefix (value: ?string): string

*__summary__*: Strips any leading `0x` prefix.

*__description__*: Tests for the existence of a `0x` prefix, and returns the value without the prefix. Un-prefixed values are returned as-is.

*__example__*:   

```javascript
import { hexStripPrefix } from '@polkadot/util';

console.log('stripped', hexStripPrefix('0x1234')); // => 1234
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `string` | `null` | `undefined` |

**Returns:** `string`

___

