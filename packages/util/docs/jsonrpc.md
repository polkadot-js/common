# jsonrpc

Convenience functions for values from @polkadot/api-jsonrpc 

- [jsonrpcParam](#jsonrpcparam) Returns a string representation of the parameter name (optional) & type.
- [jsonrpcSignature](#jsonrpcsignature) Returns a string representation of the method with inputs and outputs.

## jsonrpcParam

Returns a string representation of the parameter name (optional) & type. 

```js
jsonrpcParam (param: { name?: string, type: string }): string
```


Formats the name and type into a human-readable string.

```js
import { jsonrpcParam } from '@polkadot/util';

console.log(jsonrpcParam({ name: 'dest', type: 'Address' }); // => dest: Address
```

## jsonrpcSignature

Returns a string representation of the method with inputs and outputs. 

```js
jsonrpcSignature (name: string, _inputs: Array<InterfaceInputType>, _output: InterfaceOutputType): string
```


Formats the name, inputs and outputs into a human-readable string. This contains the input parameter names, input types and output type.

```js
import { jsonrpcSignature } from '@polkadot/util';

console.log(jsonrpcSignature(
'test_method', [{ name: 'dest', type: 'Address' }], { type: 'Address' }
)); // => test_method (dest: Address): Address
```