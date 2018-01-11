// ISC, Copyright 2017-2018 Jaco Greeff
// @flow

if (typeof TextDecoder === 'undefined') {
  // $FlowFixMe trust me flow, it is there
  global.TextDecoder = require('util').TextDecoder;
}
