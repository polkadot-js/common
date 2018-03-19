// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { InterfaceInputType, InterfaceOutputType } from '@polkadot/api-jsonrpc/types';

const formatParam = require('./param');

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
    )); // => test_method (dest: Address): Address
*/
module.exports = function jsonrpcSignature (name: string, _inputs: Array<InterfaceInputType>, _output: InterfaceOutputType): string {
  const inputs = _inputs.map(formatParam).join(', ');
  const output = formatParam(_output);

  return `${name} (${inputs}): ${output}`;
};
