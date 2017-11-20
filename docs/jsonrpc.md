# jsonrpc

Convenience functions for values from @polkadot/jsonrpc 

- (jsonrpcSignature)[#jsonrpcSignature] Returns a string representation of the method with inputs and outputs.

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
)); // => test_method (destination: Address): Address
```