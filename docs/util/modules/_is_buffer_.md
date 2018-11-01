

# Functions

<a id="isbuffer"></a>

##  isBuffer

▸ **isBuffer**(value: *`any`*): `boolean`

*Defined in [is/buffer.ts:22](https://github.com/polkadot-js/common/blob/0ddac0a/packages/util/src/is/buffer.ts#L22)*

*__name__*: isBuffer

*__signature__*: isBuffer (value: any): boolean

*__summary__*: Tests for a `Buffer` object instance.

*__description__*: Checks to see if the input object is an instance of `Buffer`.

*__example__*:   

```javascript
import { isBuffer } from '@polkadot/util';

console.log('isBuffer', isBuffer(Buffer.from([]))); // => true
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___

