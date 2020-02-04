// Copyright 2017-2020 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { detectPackage } from '@polkadot/util';
import { decodeAddress, encodeAddress, setSS58Format } from '@polkadot/util-crypto';

import Keyring from './keyring';

let dirname;
let pkgJson;

try {
  dirname = __dirname;
} catch (error) {
  // ignore
}

try {
  pkgJson = require('./package.json');
} catch (error) {
  pkgJson = require('../package.json');
}

detectPackage(pkgJson, dirname);

export default Keyring;

export {
  Keyring,
  decodeAddress,
  encodeAddress,
  setSS58Format
};
