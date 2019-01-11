

*__name__*: ExtError

*__signature__*: ExtError (message: string = '', code: number = UNKNOWN\_ERROR, value: any)

*__summary__*: Extension to the basic JS Error.

*__description__*: The built-in JavaScript Error class is extended by adding a code to allow for Error categorization. In addition to the normal `stack`, `message`, the numeric `code` and `data` (any types) parameters are available on the object.

*__example__*:   

```javascript
const { ExtError } from '@polkadot/util');

throw new ExtError('some message', ExtError.CODES.METHOD_NOT_FOUND); // => error.code = -32601
```

# Hierarchy

 `Error`

**↳ ExtError**

# Implements

* [ExtErrorInterface](../interfaces/_types_.exterrorinterface.md)

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new ExtError**(message?: *`string`*, code?: *`number`*, data?: *`any`*): [ExtError](_ext_error_.exterror.md)

*Defined in [ext/error.ts:44](https://github.com/polkadot-js/common/blob/7297e68/packages/util/src/ext/error.ts#L44)*

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` message | `string` | &quot;&quot; |
| `Default value` code | `number` |  UNKNOWN |
| `Optional` data | `any` | - |

**Returns:** [ExtError](_ext_error_.exterror.md)

___

# Properties

<a id="code"></a>

##  code

**● code**: *`number`*

*Implementation of [ExtErrorInterface](../interfaces/_types_.exterrorinterface.md).[code](../interfaces/_types_.exterrorinterface.md#code)*

*Defined in [ext/error.ts:36](https://github.com/polkadot-js/common/blob/7297e68/packages/util/src/ext/error.ts#L36)*

___
<a id="data"></a>

##  data

**● data**: *`any`*

*Implementation of [ExtErrorInterface](../interfaces/_types_.exterrorinterface.md).[data](../interfaces/_types_.exterrorinterface.md#data)*

*Defined in [ext/error.ts:38](https://github.com/polkadot-js/common/blob/7297e68/packages/util/src/ext/error.ts#L38)*

___
<a id="message"></a>

##  message

**● message**: *`string`*

*Implementation of [ExtErrorInterface](../interfaces/_types_.exterrorinterface.md).[message](../interfaces/_types_.exterrorinterface.md#message)*

*Overrides Error.message*

*Defined in [ext/error.ts:40](https://github.com/polkadot-js/common/blob/7297e68/packages/util/src/ext/error.ts#L40)*

___
<a id="name"></a>

##  name

**● name**: *`string`*

*Overrides Error.name*

*Defined in [ext/error.ts:42](https://github.com/polkadot-js/common/blob/7297e68/packages/util/src/ext/error.ts#L42)*

___
<a id="stack"></a>

##  stack

**● stack**: *`string`*

*Implementation of [ExtErrorInterface](../interfaces/_types_.exterrorinterface.md).[stack](../interfaces/_types_.exterrorinterface.md#stack)*

*Overrides Error.stack*

*Defined in [ext/error.ts:44](https://github.com/polkadot-js/common/blob/7297e68/packages/util/src/ext/error.ts#L44)*

___
<a id="error"></a>

## `<Static>` Error

**● Error**: *`ErrorConstructor`*

*Defined in /home/travis/build/polkadot-js/common/node_modules/typescript/lib/lib.es5.d.ts:974*

___

# Object literals

<a id="codes"></a>

## `<Static>` CODES

**CODES**: *`object`*

*Defined in [ext/error.ts:61](https://github.com/polkadot-js/common/blob/7297e68/packages/util/src/ext/error.ts#L61)*

<a id="codes.assert"></a>

###  ASSERT

**● ASSERT**: *`number`* =  -90009

*Defined in [ext/error.ts:62](https://github.com/polkadot-js/common/blob/7297e68/packages/util/src/ext/error.ts#L62)*

___
<a id="codes.invalid_jsonrpc"></a>

###  INVALID_JSONRPC

**● INVALID_JSONRPC**: *`number`* =  -99998

*Defined in [ext/error.ts:64](https://github.com/polkadot-js/common/blob/7297e68/packages/util/src/ext/error.ts#L64)*

___
<a id="codes.method_not_found"></a>

###  METHOD_NOT_FOUND

**● METHOD_NOT_FOUND**: *`number`* =  -32601

*Defined in [ext/error.ts:65](https://github.com/polkadot-js/common/blob/7297e68/packages/util/src/ext/error.ts#L65)*

___
<a id="codes.unknown"></a>

###  UNKNOWN

**● UNKNOWN**: *`number`*

*Defined in [ext/error.ts:63](https://github.com/polkadot-js/common/blob/7297e68/packages/util/src/ext/error.ts#L63)*

___

___

