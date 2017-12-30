# ext

Extensions to basic classes 

- [ExtError](#exterror) Extension to the basic JS Error.

## ExtError

Extension to the basic JS Error. 

```js
ExtError (message: string = '', code: number = UNKNOWN_ERROR, value: any)
```


The built-in JavaScript Error class is extended by adding a code to allow for Error categorization. In addition to the normal `stack`, `message`, the numeric `code` and `data` (mixed types) parameters are available on the object.

```js
const { ExtError } = require('@polkadot/util');

throw new ExtError('some message', ExtError.CODES.METHOD_NOT_FOUND); // => error.code = -32601
```