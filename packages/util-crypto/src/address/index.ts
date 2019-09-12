// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import checkAddress from './check';
import decodeAddress from './decode';
import encodeAddress from './encode';
import setSS58Format from './setSS58Format';

const setAddressPrefix = setSS58Format;

export {
  checkAddress,
  decodeAddress,
  encodeAddress,
  // @deprecated use setSS58Format instead
  setAddressPrefix,
  setSS58Format
};
