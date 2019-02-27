

# Functions

<a id="format"></a>

##  format

▸ **format**(value: *`any`*): `any`

*Defined in [logger.ts:42](https://github.com/polkadot-js/common/blob/b9ac918/packages/util/src/logger.ts#L42)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `any`

___
<a id="logger"></a>

##  logger

▸ **logger**(_type: *`string`*): [Logger](_types_.md#logger)

*Defined in [logger.ts:104](https://github.com/polkadot-js/common/blob/b9ac918/packages/util/src/logger.ts#L104)*

*__name__*: Logger

*__summary__*: Creates a consistent log interface for messages

*__description__*: Returns a `Logger` that has `.log`, `.error`, `.warn` and `.debug` (controlled with environment `DEBUG=typeA,typeB`) methods. Logging is done with a consistent prefix (type of logger, date) followed by the actual message using the underlying console.

*__example__*:   

```javascript
const l from '@polkadot/util/logger')('test');

l.log('blah'); // <date>     TEST: blah
```

**Parameters:**

| Name | Type |
| ------ | ------ |
| _type | `string` |

**Returns:** [Logger](_types_.md#logger)

___

