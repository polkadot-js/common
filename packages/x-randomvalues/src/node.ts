// Copyright 2017-2021 @polkadot/x-randomvalues authors & contributors
// SPDX-License-Identifier: Apache-2.0

import crypto from 'crypto';

export { packageInfo } from './packageInfo';

export function getRandomValues <T extends Uint8Array> (output: T): T {
  const bytes = crypto.randomBytes(output.length);

  for (let i = 0; i < bytes.length; i++) {
    output[i] = bytes[i];
  }

  return output;
}
