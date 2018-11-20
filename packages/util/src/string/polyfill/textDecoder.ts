// Copyright 2017-2018 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// tslint:disable-next-line
if (typeof TextDecoder === 'undefined') {
  // @ts-ignore
  global.TextDecoder = require('util').TextDecoder;
}
