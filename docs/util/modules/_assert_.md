

# Functions

<a id="assert"></a>

##  assert

▸ **assert**<`T`>(test: *`Falsy` \| `T`*, message: *`string` \| `MessageFn`*, code?: *`number`*, data?: *`any`*): `boolean`

*Defined in [assert.ts:28](https://github.com/polkadot-js/common/blob/63daf66/packages/util/src/assert.ts#L28)*

*__name__*: assert

*__summary__*: Checks for a valid test, if not ExtError is thrown.

*__description__*: Checks that `test` is a truthy value. If value is falsy (`null`, `undefined`, `false`, ...), it throws an ExtError with the supplied `message` and an optional `code` and `data`. When `test` passes, `true` is returned.

*__example__*:   

```javascript
const { assert } from '@polkadot/util';

assert(true, 'True should be true'); // true returned
assert(false, 'False should not be true'); // ExtError thrown
assert(false, () => 'message'); // ExtError with 'message'
```

**Type parameters:**

#### T 
**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| test | `Falsy` \| `T` | - |
| message | `string` \| `MessageFn` | - |
| `Default value` code | `number` |  ExtError.CODES.ASSERT |
| `Optional` data | `any` | - |

**Returns:** `boolean`

___

