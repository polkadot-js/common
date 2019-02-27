

# Functions

<a id="iserror"></a>

##  isError

▸ **isError**(value: *`any`*): `boolean`

*Defined in [is/error.ts:21](https://github.com/polkadot-js/common/blob/b9ac918/packages/util/src/is/error.ts#L21)*

*__name__*: isError

*__summary__*: Tests for a `Error` object instance.

*__description__*: Checks to see if the input object is an instance of `Error`.

*__example__*:   

```javascript
import { isError } from '@polkadot/util';

console.log('isError', isError(new Error('message'))); // => true
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___

