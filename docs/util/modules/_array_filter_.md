

# Functions

<a id="arrayfilter"></a>

##  arrayFilter

▸ **arrayFilter**(array: *`Array`<`any`>*, allowNulls?: *`boolean`*): `Array`<`any`>

*Defined in [array/filter.ts:24](https://github.com/polkadot-js/common/blob/016a7b8/packages/util/src/array/filter.ts#L24)*

*__name__*: arrayFilter

*__signature__*: arrayFilter (array: Array, allowNulls: boolean = true): Array

*__summary__*: Filters undefined and (optionally) null values from an array

*__description__*: Returns a new array with all `undefined` values removed. Optionally, when `allowNulls = false`, it removes the `null` values as well

*__example__*:   

```javascript
import { arrayFilter } from '@polkadot/util';

arrayFilter([0, void 0, true, null, false, '']); // [0, true, null, false, '']
arrayFilter([0, void 0, true, null, false, ''], false); // [0, true, false, '']
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| array | `Array`<`any`> | - |
| `Default value` allowNulls | `boolean` | true |

**Returns:** `Array`<`any`>

___

