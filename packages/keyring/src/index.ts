// Copyright 2017-2020 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import './detectPackage';

import { decodeAddress, encodeAddress, setSS58Format } from '@polkadot/util-crypto';

import { Keyring } from './keyring';

export default Keyring;

export {
  Keyring,
  decodeAddress,
  encodeAddress,
  setSS58Format
};
