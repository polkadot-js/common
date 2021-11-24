// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ed25519PairFromString } from '../ed25519';
import { naclBoxPairFromSecret, naclSeal } from '.';

describe('naclSeal', (): void => {
  it('seals a message', (): void => {
    const message = new Uint8Array([1, 2, 3, 4, 5, 4, 3, 2, 1]);
    const sender = ed25519PairFromString('sender');
    const receiver = ed25519PairFromString('receiver');
    const senderBox = naclBoxPairFromSecret(sender.secretKey);
    const receiverBox = naclBoxPairFromSecret(receiver.secretKey);
    const senderBoxSecret = senderBox.secretKey;
    const receiverBoxPublic = receiverBox.publicKey;

    expect(
      naclSeal(message, senderBoxSecret, receiverBoxPublic, new Uint8Array(24))
    ).toEqual({
      nonce: new Uint8Array(24),
      sealed: new Uint8Array([137, 195, 104, 255, 67, 199, 40, 235, 148, 177, 180, 73, 239, 131, 215, 80, 61, 191, 167, 213, 152, 138, 5, 47, 135])
    });
  });
});
