// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { secp256k1Verify } from '.';

describe('secp256k1Verify', (): void => {
  it('validates known ETH against address', (): void => {
    const message = 'Pay KSMs to the Kusama account:88dc3417d5058ec4b4503e0c12ea1a0a89be200fe98922423d4334014fa6b0ee';

    expect(
      secp256k1Verify(
        `\x19Ethereum Signed Message:\n${message.length.toString()}${message}`,
        '0x55bd020bdbbdc02de34e915effc9b18a99002f4c29f64e22e8dcbb69e722ea6c28e1bb53b9484063fbbfd205e49dcc1f620929f520c9c4c3695150f05a28f52a01',
        '0x002309df96687e44280bb72c3818358faeeb699c',
        'keccak'
      )
    ).toBe(true);
  });
});
