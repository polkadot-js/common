// Copyright 2017-2020 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ec as EC } from 'elliptic';

declare module 'elliptic/lib/elliptic/ec' {
  const ec: typeof EC;

  export = ec;
}
