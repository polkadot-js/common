

# Functions

<a id="u8aconcat"></a>

##  u8aConcat

▸ **u8aConcat**(..._list: *`Array`<`Uint8Array` | `string`>*): `Uint8Array`

*Defined in [u8a/concat.ts:24](https://github.com/polkadot-js/common/blob/c3fafbe/packages/util/src/u8a/concat.ts#L24)*

*__name__*: u8aConcat

*__summary__*: Creates a concatenated Uint8Array from the inputs.

*__description__*: Concatenates the input arrays into a single `UInt8Array`.

*__example__*:   

```javascript
import { u8aConcat } from '@polkadot/util';

u8aConcat(
  new Uint8Array([1, 2, 3]),
  new Uint8Array([4, 5, 6])
); // [1, 2, 3, 4, 5, 6]
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| `Rest` _list | `Array`<`Uint8Array` | `string`> |

**Returns:** `Uint8Array`

___

