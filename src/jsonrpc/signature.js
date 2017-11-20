// ISC, Copyright 2017 Jaco Greeff
// @flow

import type { InterfaceInputType, InterfaceOutputType } from '@polkadot/jsonrpc/types';

/**
  @name jsonrpcSignature
  @signature jsonrpcSignature (name: string, _inputs: Array<InterfaceInputType>, _output: InterfaceOutputType): string
  @summary Returns a string representation of the method with inputs and outputs.
  @description
    Formats the name, inputs and outputs into a human-readable string. This contains the input parameter names, input types and output type.
  @example
    import { jsonrpcSignature } from '@polkadot/util';

    console.log(jsonrpcSignature(
      'test_method', [{ name: 'dest', type: 'Address' }], { type: 'Address' }
    )); // => test_method (destination: Address): Address
*/
module.exports = function jsonrpcSignature (name: string, _inputs: Array<InterfaceInputType>, _output: InterfaceOutputType): string {
  const inputParams: string = _inputs
    .map(({ name, type }) => `${name}: ${type}`)
    .join(', ');

  return `${name} (${inputParams}): ${_output.type}`;
};
