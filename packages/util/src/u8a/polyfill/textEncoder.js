// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

if (typeof TextEncoder === 'undefined') {
  // $FlowFixMe trust me flow, it is there
  global.TextEncoder = require('util').TextEncoder;
}
