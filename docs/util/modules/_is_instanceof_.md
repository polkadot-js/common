

# Functions

<a id="isinstanceof"></a>

##  isInstanceOf

▸ **isInstanceOf**(value: *`any`*, clazz: *`any`*): `boolean`

*Defined in [is/instanceOf.ts:20](https://github.com/polkadot-js/common/blob/cab0713/packages/util/src/is/instanceOf.ts#L20)*

*__name__*: isInstanceOf

*__signature__*: isInstanceOf (value: any, clazz: Class): boolean

*__summary__*: Tests for a instance of a class.

*__description__*: Checks to see if the input value is an instance of the test class.

*__example__*:   

```javascript
import { isInstanceOf } from '@polkadot/util';

console.log('isInstanceOf', isInstanceOf(new Array(0), Array)); // => true
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `any` |
| clazz | `any` |

**Returns:** `boolean`

___

