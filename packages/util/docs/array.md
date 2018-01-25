# array

Utility methods that operates on arrays 

- [arrayFilter](#arrayfilter) Filters undefined and (optionally) null values from an array

## arrayFilter

Filters undefined and (optionally) null values from an array 

```js
arrayFilter (array: Array<mixed>, allowNulls: boolean = true): Array<mixed>
```


Returns a new array with all `undefined` values removed. Optionally, when `allowNulls = false`, it removes the `null` values as well

```js
import { arrayFilter } from '@polkadot/util';

arrayFilter([0, void 0, true, null, false, '']); // [0, true, null, false, '']
arrayFilter([0, void 0, true, null, false, ''], false); // [0, true, false, '']
```