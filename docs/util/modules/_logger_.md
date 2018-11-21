

# Functions

<a id="format"></a>

##  format

▸ **format**(value: *`any`*): `any`

*Defined in [logger.ts:36](https://github.com/polkadot-js/common/blob/477be90/packages/util/src/logger.ts#L36)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| value | `any` |

**Returns:** `any`

___
<a id="logger"></a>

##  logger

▸ **logger**(_type: *`string`*): `Logger`

*Defined in [logger.ts:109](https://github.com/polkadot-js/common/blob/477be90/packages/util/src/logger.ts#L109)*

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

| Name | Type |
| ------ | ------ |
| _type | `string` |

**Returns:** `Logger`

___

