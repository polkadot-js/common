// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

type IpTypes = 'v4' | 'v6';

const ipRegex = require('ip-regex');

/**
  @name isIp
  @signature isIp (value: string, type?: 'v4' | 'v6'): boolean
  @summary Tests if the value is a valid IP address
  @description
    Checks to see if the value is a valid IP address. Optionally check for either v4/v6
  @example
    import { isIp } from '@polkadot/util';

    isIp('192.168.0.1')); // => true
    isIp('1:2:3:4:5:6:7:8'); // => true
    isIp('192.168.0.1', 'v6')); // => false
    isIp('1:2:3:4:5:6:7:8', 'v4'); // => false
*/
module.exports = function isIp (value: string, type?: IpTypes): boolean {
  if (type === 'v4') {
    return ipRegex.v4({ exact: true }).test(value);
  } else if (type === 'v6') {
    return ipRegex.v6({ exact: true }).test(value);
  }

  return ipRegex({ exact: true }).test(value);
};
