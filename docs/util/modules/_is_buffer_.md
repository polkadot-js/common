

# Functions

<a id="isbuffer"></a>

##  isBuffer

▸ **isBuffer**(value: *`any`*): `boolean`

*Defined in [is/buffer.ts:21](https://github.com/polkadot-js/common/blob/63daf66/packages/util/src/is/buffer.ts#L21)*

*__name__*: isBuffer

*__summary__*: Tests for a `Buffer` object instance.

*__description__*: Checks to see if the input object is an instance of `Buffer`.

*__example__*:   

```javascript
import { isBuffer } from '@polkadot/util';

console.log('isBuffer', isBuffer(Buffer.from([]))); // => true
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___

