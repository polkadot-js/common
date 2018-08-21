[@polkadot/util](../README.md) > ["array/filter"](../modules/_array_filter_.md)

# External module: "array/filter"

## Index

### Functions

* [arrayFilter](_array_filter_.md#arrayfilter)

---

## Functions

<a id="arrayfilter"></a>

###  arrayFilter

▸ **arrayFilter**(array: *`Array`<`any`>*, allowNulls?: *`boolean`*): `Array`<`any`>

*Defined in [array/filter.ts:20](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/array/filter.ts#L20)*

*__name__*: arrayFilter

*__signature__*: arrayFilter (array: Array, allowNulls: boolean = true): Array

*__summary__*: Filters undefined and (optionally) null values from an array

*__description__*: Returns a new array with all `undefined` values removed. Optionally, when `allowNulls = false`, it removes the `null` values as well

*__example__*: import { arrayFilter } from '@polkadot/util';

arrayFilter(\[0, void 0, true, null, false, ''\]); // \[0, true, null, false, ''\] arrayFilter(\[0, void 0, true, null, false, ''\], false); // \[0, true, false, ''\]

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| array | `Array`<`any`> | - |
| `Default value` allowNulls | `boolean` | true |

**Returns:** `Array`<`any`>

___

