// Copyright 2017-2018 @polkadot/util-keyring authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Prefix } from './types';

import defaults from './defaults';

export default function setPrefix (prefix: Prefix): void {
  defaults.prefix = prefix;
}
