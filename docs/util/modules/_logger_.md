

# Functions

<a id="format"></a>

##  format

▸ **format**(value: *`any`*): `any`

*Defined in [logger.ts:36](https://github.com/polkadot-js/common/blob/7153110/packages/util/src/logger.ts#L36)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `any`

___
<a id="logger"></a>

##  logger

▸ **logger**(_type: *`string`*): `Logger`

*Defined in [logger.ts:105](https://github.com/polkadot-js/common/blob/7153110/packages/util/src/logger.ts#L105)*

*__name__*: Logger

*__signature__*: logger (type: string): Logger

*__summary__*: Creates a consistent log interface for messages

*__description__*: Returns a `Logger` that has `.log`, `.error`, `.warn` and `.debug` (controlled with environment `DEBUG=typeA,typeB`) methods. Logging is done with a consistent prefix (type of logger, date) followed by the actual message using the underlying console.

*__example__*:   

```javascript
const l from '@polkadot/util/logger')('test');

l.log('blah'); // <date>     TEST: blah
```

**Parameters:**

| Param | Type |
| ------ | ------ |
| _type | `string` |

**Returns:** `Logger`

___

