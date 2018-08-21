[@polkadot/util](../README.md) > ["ext/error"](../modules/_ext_error_.md) > [ExtError](../classes/_ext_error_.exterror.md)

# Class: ExtError

*__name__*: ExtError

*__signature__*: ExtError (message: string = '', code: number = UNKNOWN_ERROR, value: any)

*__summary__*: Extension to the basic JS Error.

*__description__*: The built-in JavaScript Error class is extended by adding a code to allow for Error categorization. In addition to the normal `stack`, `message`, the numeric `code` and `data` (any types) parameters are available on the object.

*__example__*: const { ExtError } from '@polkadot/util');

throw new ExtError('some message', ExtError.CODES.METHOD\_NOT\_FOUND); // => error.code = -32601

## Hierarchy

 `Error`

**↳ ExtError**

## Implements

* `ExtErrorInterface`

## Index

### Constructors

* [constructor](_ext_error_.exterror.md#constructor)

### Properties

* [code](_ext_error_.exterror.md#code)
* [data](_ext_error_.exterror.md#data)
* [message](_ext_error_.exterror.md#message)
* [name](_ext_error_.exterror.md#name)
* [stack](_ext_error_.exterror.md#stack)
* [Error](_ext_error_.exterror.md#error)

### Object literals

* [CODES](_ext_error_.exterror.md#codes)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new ExtError**(message?: *`string`*, code?: *`number`*, data?: *`any`*): [ExtError](_ext_error_.exterror.md)

*Defined in [ext/error.ts:40](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/ext/error.ts#L40)*

**Parameters:**

| Param | Type | Default value |
| ------ | ------ | ------ |
| `Default value` message | `string` | &quot;&quot; |
| `Default value` code | `number` |  UNKNOWN |
| `Optional` data | `any` | - |

**Returns:** [ExtError](_ext_error_.exterror.md)

___

## Properties

<a id="code"></a>

###  code

**● code**: *`number`*

*Defined in [ext/error.ts:32](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/ext/error.ts#L32)*

___
<a id="data"></a>

###  data

**● data**: *`any`*

*Defined in [ext/error.ts:34](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/ext/error.ts#L34)*

___
<a id="message"></a>

###  message

**● message**: *`string`*

*Overrides Error.message*

*Defined in [ext/error.ts:36](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/ext/error.ts#L36)*

___
<a id="name"></a>

###  name

**● name**: *`string`*

*Overrides Error.name*

*Defined in [ext/error.ts:38](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/ext/error.ts#L38)*

___
<a id="stack"></a>

###  stack

**● stack**: *`string`*

*Overrides Error.stack*

*Defined in [ext/error.ts:40](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/ext/error.ts#L40)*

___
<a id="error"></a>

### `<Static>` Error

**● Error**: *`ErrorConstructor`*

*Defined in /Users/jacogreeff/Projects/polkadot/common/node_modules/typescript/lib/lib.es5.d.ts:914*

___

## Object literals

<a id="codes"></a>

### `<Static>` CODES

**CODES**: *`object`*

*Defined in [ext/error.ts:57](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/ext/error.ts#L57)*

<a id="codes.assert"></a>

####  ASSERT

**● ASSERT**: *`number`* =  -90009

*Defined in [ext/error.ts:58](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/ext/error.ts#L58)*

___
<a id="codes.invalid_jsonrpc"></a>

####  INVALID_JSONRPC

**● INVALID_JSONRPC**: *`number`* =  -99998

*Defined in [ext/error.ts:60](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/ext/error.ts#L60)*

___
<a id="codes.method_not_found"></a>

####  METHOD_NOT_FOUND

**● METHOD_NOT_FOUND**: *`number`* =  -32601

*Defined in [ext/error.ts:61](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/ext/error.ts#L61)*

___
<a id="codes.unknown"></a>

####  UNKNOWN

**● UNKNOWN**: *`number`*

*Defined in [ext/error.ts:59](https://github.com/polkadot-js/util/blob/7550b44/packages/util/src/ext/error.ts#L59)*

___

___

