// Copyright 2017-2019 @polkadot/keyring authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { assertSingletonPackage } from '@polkadot/util';
import { decodeAddress, encodeAddress, setAddressPrefix, setSS58Format } from '@polkadot/util-crypto';

import Keyring from './keyring';

assertSingletonPackage('@polkadot/keyring');

export default Keyring;

export {
  Keyring,
  decodeAddress,
  encodeAddress,
  // @deprecated use setSS58Format
  setAddressPrefix,
  setSS58Format
};
