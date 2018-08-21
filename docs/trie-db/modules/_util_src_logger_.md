[@polkadot/util](../README.md) > ["util/src/logger"](../modules/_util_src_logger_.md)

# External module: "util/src/logger"

## Index

### Type aliases

* [ConsoleType](_util_src_logger_.md#consoletype)
* [LogType](_util_src_logger_.md#logtype)

### Functions

* [apply](_util_src_logger_.md#apply)
* [logger](_util_src_logger_.md#logger)

### Object literals

* [chalked](_util_src_logger_.md#chalked)
* [logTo](_util_src_logger_.md#logto)

---

## Type aliases

<a id="consoletype"></a>

###  ConsoleType

**ΤConsoleType**: * "error" &#124; "log" &#124; "warn"
*

*Defined in [util/src/logger.ts:12](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/logger.ts#L12)*

___
<a id="logtype"></a>

###  LogType

**ΤLogType**: * [ConsoleType](_util_src_logger_.md#consoletype) &#124; "debug"
*

*Defined in [util/src/logger.ts:13](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/logger.ts#L13)*

___

## Functions

<a id="apply"></a>

###  apply

▸ **apply**(log: *[LogType](_util_src_logger_.md#logtype)*, type: *`string`*, values: *`Logger$Data`*): `void`

*Defined in [util/src/logger.ts:29](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/logger.ts#L29)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| log | [LogType](_util_src_logger_.md#logtype) |
| type | `string` |
| values | `Logger$Data` |

**Returns:** `void`

___
<a id="logger"></a>

###  logger

▸ **logger**(_type: *`string`*): `Logger`

*Defined in [util/src/logger.ts:58](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/logger.ts#L58)*

*__name__*: Logger

*__signature__*: logger (type: string): Logger

*__summary__*: Creates a consistent log interface for messages

*__description__*: Returns a `Logger` that has `.log`, `.error`, `.warn` and `.debug` (constrolled with environment `DEBUG=typeA,typeB`) methods. Logging is done with a consistent prefix (type of logger, date) followed by the actual message using the underlying console.

*__example__*: const l from '@polkadot/util/logger')('test');

l.log('blah'); // TEST: blah

**Parameters:**

| Param | Type |
| ------ | ------ |
| _type | `string` |

**Returns:** `Logger`

___

## Object literals

<a id="chalked"></a>

### `<Const>` chalked

**chalked**: *`object`*

*Defined in [util/src/logger.ts:22](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/logger.ts#L22)*

<a id="chalked.debug"></a>

####  debug

**● debug**: * `Chalk` & `object`
* =  chalk.gray

*Defined in [util/src/logger.ts:23](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/logger.ts#L23)*

___
<a id="chalked.error"></a>

####  error

**● error**: * `Chalk` & `object`
* =  chalk.red

*Defined in [util/src/logger.ts:24](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/logger.ts#L24)*

___
<a id="chalked.log"></a>

####  log

**● log**: * `Chalk` & `object`
* =  chalk.reset

*Defined in [util/src/logger.ts:25](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/logger.ts#L25)*

___
<a id="chalked.warn"></a>

####  warn

**● warn**: * `Chalk` & `object`
* =  chalk.yellow

*Defined in [util/src/logger.ts:26](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/logger.ts#L26)*

___

___
<a id="logto"></a>

### `<Const>` logTo

**logTo**: *`object`*

*Defined in [util/src/logger.ts:15](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/logger.ts#L15)*

<a id="logto.debug-1"></a>

####  debug

**● debug**: *`string`* = "log"

*Defined in [util/src/logger.ts:16](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/logger.ts#L16)*

___
<a id="logto.error-1"></a>

####  error

**● error**: *`string`* = "error"

*Defined in [util/src/logger.ts:17](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/logger.ts#L17)*

___
<a id="logto.log-1"></a>

####  log

**● log**: *`string`* = "log"

*Defined in [util/src/logger.ts:18](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/logger.ts#L18)*

___
<a id="logto.warn-1"></a>

####  warn

**● warn**: *`string`* = "warn"

*Defined in [util/src/logger.ts:19](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/logger.ts#L19)*

___

___

