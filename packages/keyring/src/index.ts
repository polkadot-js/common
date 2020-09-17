// Copyright 2017-2020 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { detectPackage } from '@polkadot/util';
import { decodeAddress, encodeAddress, setSS58Format } from '@polkadot/util-crypto';

import Keyring from './keyring';

// eslint-disable-next-line @typescript-eslint/no-var-requires
detectPackage(require('./package.json'), typeof __dirname !== 'undefined' && __dirname);

export default Keyring;

export {
  Keyring,
  decodeAddress,
  encodeAddress,
  setSS58Format
};
