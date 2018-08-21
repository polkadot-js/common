[@polkadot/util](../README.md) > ["util/src/assert"](../modules/_util_src_assert_.md)

# External module: "util/src/assert"

## Index

### Type aliases

* [MessageFn](_util_src_assert_.md#messagefn)

### Functions

* [assert](_util_src_assert_.md#assert)

---

## Type aliases

<a id="messagefn"></a>

###  MessageFn

**ΤMessageFn**: *`function`*

*Defined in [util/src/assert.ts:8](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/assert.ts#L8)*

#### Type declaration
▸(): `string`

**Returns:** `string`

___

## Functions

<a id="assert"></a>

###  assert

▸ **assert**(test: *`any`*, message: * `string` &#124; [MessageFn](_util_src_assert_.md#messagefn)*, code?: *`number`*, data?: *`any`*): `boolean`

*Defined in [util/src/assert.ts:23](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/assert.ts#L23)*

*__name__*: assert

*__signature__*: assert (test: any, message: string | () => string, code: number = ExtError.CODES.ASSERT, data: any): void

*__summary__*: Checks for a valid test, if not ExtError is thrown.

*__description__*: Checks that `test` is a truthy value. If value is falsy (`null`, `undefined`, `false`, ...), it throws an ExtError with the supplied `message` and an optional `code` and `data`. When `test` passes, `true` is returned.

*__example__*: const assert from '@polkadot/util/assert');

assert(true, 'True should be true'); // true returned assert(false, 'False should not be true'); // ExtError thrown assert(false, () => 'message'); // ExtError with 'message'

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| test | `any` | - |
| message |  `string` &#124; [MessageFn](_util_src_assert_.md#messagefn)| - |
| `Default value` code | `number` |  ExtError.CODES.ASSERT |
| `Optional` data | `any` | - |

**Returns:** `boolean`

___

