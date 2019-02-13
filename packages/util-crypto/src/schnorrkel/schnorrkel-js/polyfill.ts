// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

if (process.env.NODE_ENV === 'test') {
  const crypto = require('crypto');

  Object.defineProperty((global as any).self, 'crypto', {
    value: {
      getRandomValues: (arr: Array<number>) => crypto.randomBytes(arr.length)
    }
  });
}
