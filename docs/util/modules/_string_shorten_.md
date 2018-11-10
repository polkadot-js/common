

# Functions

<a id="stringshorten"></a>

##  stringShorten

▸ **stringShorten**(_value: *`any`*, prefixLength?: *`number`*): `string`

*Defined in [string/shorten.ts:20](https://github.com/polkadot-js/common/blob/a9878a2/packages/util/src/string/shorten.ts#L20)*

*__name__*: stringShorten

*__signature__*: stringShorten (value: any, prefixLength: number = 8): string

*__summary__*: Returns a string with maximum length

*__description__*: Checks the string against the `prefixLength`, if longer than dopuble this, shortens it by placing `..` in the middle of it

*__example__*:   

```javascript
import { stringShorten } from '@polkadot/util';

stringShorten('1234567890', 2); // => 12..90
```

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| _value | `any` | - |
| `Default value` prefixLength | `number` | 6 |

**Returns:** `string`

___

