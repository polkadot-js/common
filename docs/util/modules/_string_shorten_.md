

# Functions

<a id="stringshorten"></a>

##  stringShorten

▸ **stringShorten**(_value?: *`any`*, prefixLength?: *`number`*): `string`

*Defined in [string/shorten.ts:19](https://github.com/polkadot-js/common/blob/6506c10/packages/util/src/string/shorten.ts#L19)*

*__name__*: stringShorten

*__summary__*: Returns a string with maximum length

*__description__*: Checks the string against the `prefixLength`, if longer than dopuble this, shortens it by placing `..` in the middle of it

*__example__*:   

```javascript
import { stringShorten } from '@polkadot/util';

stringShorten('1234567890', 2); // => 12..90
```

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Optional` _value | `any` | - |
| `Default value` prefixLength | `number` | 6 |

**Returns:** `string`

___

