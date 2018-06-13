// Copyright 2017-2018 @polkadot/util authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

if (typeof TextDecoder === 'undefined') {
  // $FlowFixMe trust me flow, it is there
  global.TextDecoder = require('util').TextDecoder;
}
