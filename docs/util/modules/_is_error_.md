

# Functions

<a id="iserror"></a>

##  isError

▸ **isError**(value: *`any`*): `boolean`

*Defined in [is/error.ts:22](https://github.com/polkadot-js/common/blob/caec22d/packages/util/src/is/error.ts#L22)*

*__name__*: isError

*__signature__*: isError (value: any): boolean

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

