// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

if (typeof TextEncoder === 'undefined') {
  // $FlowFixMe trust me flow, it is there
  global.TextEncoder = require('util').TextEncoder;
}
