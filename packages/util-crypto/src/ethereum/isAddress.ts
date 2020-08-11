// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { isHex } from '@polkadot/util';

import isEthereumChecksum from './isChecksum';

export default function isEthereumAddress (address?: string): boolean {
  if (!address || address.length !== 42 || !isHex(address)) {
    return false;
  }

  if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
    return true;
  }

  return isEthereumChecksum(address);
}
