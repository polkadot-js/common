// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { InterfaceInputType, InterfaceOutputType } from '@polkadot/api-jsonrpc/types';

/**
  @name jsonrpcParam
  @signature jsonrpcParam (param: { name?: string, type: string }): string
  @summary Returns a string representation of the parameter name (optional) & type.
  @description
    Formats the name and type into a human-readable string.
  @example
    import { jsonrpcParam } from '@polkadot/util';

    console.log(jsonrpcParam({ name: 'dest', type: 'Address' }); // => dest: Address
*/
module.exports = function jsonrpcParam (param: InterfaceInputType | InterfaceOutputType): string {
  // flowlint-next-line sketchy-null-mixed:off,sketchy-null-string:off
  return param.name
    // $FlowFixMe InterfaceInputType found, has name
    ? `${param.name}: ${param.type}`
    : param.type;
};
