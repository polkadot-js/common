[@polkadot/util](../README.md) > ["is/error"](../modules/_is_error_.md)

# External module: "is/error"

## Index

### Functions

* [isError](_is_error_.md#iserror)

---

## Functions

<a id="iserror"></a>

###  isError

▸ **isError**(value: *`any`*): `boolean`

*Defined in [is/error.ts:18](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/is/error.ts#L18)*

*__name__*: isError

*__signature__*: isError (value: any): boolean

*__summary__*: Tests for a `Error` object instance.

*__description__*: Checks to see if the input object is an instance of `Error`.

*__example__*: import { isError } from '@polkadot/util';

console.log('isError', isError(new Error('message'))); // => true

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `boolean`

___

