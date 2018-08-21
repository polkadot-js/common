[@polkadot/util](../README.md) > ["is/instanceOf"](../modules/_is_instanceof_.md)

# External module: "is/instanceOf"

## Index

### Functions

* [isInstanceOf](_is_instanceof_.md#isinstanceof)

---

## Functions

<a id="isinstanceof"></a>

###  isInstanceOf

▸ **isInstanceOf**(value: *`any`*, clazz: *`any`*): `boolean`

*Defined in [is/instanceOf.ts:16](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/is/instanceOf.ts#L16)*

*__name__*: isInstanceOf

*__signature__*: isInstanceOf (value: any, clazz: Class): boolean

*__summary__*: Tests for a instance of a class.

*__description__*: Checks to see if the input value is an instance of the test class.

*__example__*: import { isInstanceOf } from '@polkadot/util';

console.log('isInstanceOf', isInstanceOf(new Array(0), Array)); // => true

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |
| clazz | `any` |

**Returns:** `boolean`

___

