// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ed25519PairFromString } from '../ed25519';
import { keyExtractPath } from '../key';
import { keyFromPath } from '../key/fromPath';
import { naclBoxPairFromSecret, naclOpen, naclSeal } from '.';

describe('naclOpen', (): void => {
  it('opens a sealed message by the sender', (): void => {
    const message = new Uint8Array([1, 2, 3, 4, 5, 4, 3, 2, 1]);
    const sender = ed25519PairFromString('sender');
    const receiver = ed25519PairFromString('receiver');
    const senderBox = naclBoxPairFromSecret(sender.secretKey);
    const receiverBox = naclBoxPairFromSecret(receiver.secretKey);
    const { nonce, sealed } = naclSeal(message, senderBox.secretKey, receiverBox.publicKey);

    expect(
      naclOpen(sealed, nonce, senderBox.publicKey, receiverBox.secretKey)
    ).toEqual(
      message
    );
  });

  it('polkadot does double ratchet', () => {
    const sender = ed25519PairFromString('sender');
    const receiver = ed25519PairFromString('receiver');

    // Make id key for identifying each other
    const senderIdKey = keyFromPath(sender, keyExtractPath('//1//1//1//1').path, 'ed25519');
    const receiverIdKey = keyFromPath(receiver, keyExtractPath('//2//2//2//2').path, 'ed25519');

    // Receiver sends encrypting public key to receive message to decrypt with his private key
    const receiverIdBoxKey = naclBoxPairFromSecret(receiverIdKey.secretKey);

    // console.log(`Receiver sends receiver's public key to sender ${receiverIdBoxKey.publicKey.toString()}`);

    // Sender encrypts message to send with the public key the receiver sent and send it to receiver
    const senderIdBoxKey = naclBoxPairFromSecret(senderIdKey.secretKey);
    const message = new Uint8Array([1, 2, 3, 4, 5, 4, 3, 2, 1]);
    const { nonce, sealed } = naclSeal(message, senderIdBoxKey.secretKey, receiverIdBoxKey.publicKey);

    // console.log(`Sender sends encrypted message to receiver ${sealed.toString()}, ${nonce.toString()}`);

    // Receiver opens encrypted message from the sender
    let opened = naclOpen(sealed, nonce, senderIdBoxKey.publicKey, receiverIdBoxKey.secretKey);

    // console.log(`The sealed message is ${opened?.toString() || 'null'}`);

    // Oh no the Id key is hacked, derive Id key again from another index
    const senderIdKey2 = keyFromPath(sender, keyExtractPath('//1//1//1//2').path, 'ed25519');
    const receiverIdKey2 = keyFromPath(receiver, keyExtractPath('//2//2//2//3').path, 'ed25519');

    // Receiver sends encrypting public key to receive message to decrypt with his private key
    const receiverIdBoxKey2 = naclBoxPairFromSecret(receiverIdKey2.secretKey);

    // console.log(`Receiver sends receiver's public key to sender ${receiverIdBoxKey2.publicKey.toString()}`);

    // Sender encrypts message to send with the public key the receiver sent and send it to receiver
    const senderIdBoxKey2 = naclBoxPairFromSecret(senderIdKey2.secretKey);
    const message2 = new Uint8Array([1, 2, 3, 4, 5, 4, 3, 2, 1]);
    let ctx = naclSeal(message2, senderIdBoxKey2.secretKey, receiverIdBoxKey2.publicKey);
    const sealed2 = ctx.sealed;
    const nonce2 = ctx.nonce;

    // console.log(`Sender sends encrypted message to receiver ${sealed.toString()}, ${nonce.toString()}`);

    // Receiver opens encrypted message from the sender
    opened = naclOpen(sealed2, nonce2, senderIdBoxKey2.publicKey, receiverIdBoxKey2.secretKey);
    // console.log(`The sealed message is ${opened?.toString() || 'null'}`);

    // This time derive key for each message to send and receive
    // Receiver sends encrypting public key to receive message to decrypt with his private key
    const receiverIdBoxKey2One = naclBoxPairFromSecret(receiverIdBoxKey2.secretKey);

    // console.log(`Receiver sends receiver's public key to sender ${receiverIdBoxKey2One.publicKey.toString()}`);

    // Sender encrypts message to send with the public key the receiver sent and send it to receiver
    const senderIdBoxKey2One = naclBoxPairFromSecret(senderIdBoxKey2.secretKey);
    const message3 = new Uint8Array([1, 2, 3, 4, 5, 4, 3, 2, 1]);

    ctx = naclSeal(message3, senderIdBoxKey2One.secretKey, receiverIdBoxKey2One.publicKey);

    // const sealed3 = ctx.sealed;
    // const nonce3 = ctx.nonce;

    // console.log(`Sender sends encrypted message to receiver ${sealed3.toString()}, ${nonce3.toString()}`);

    // Receiver opens encrypted message from the sender
    opened = naclOpen(sealed2, nonce2, senderIdBoxKey2One.publicKey, receiverIdBoxKey2One.secretKey);

    expect(opened).toEqual(message3);
    // console.log(`The sealed message is ${opened?.toString() || 'null'}`);
  });

  it('returns null on invalid', (): void => {
    expect(
      naclOpen(new Uint8Array(), new Uint8Array(24), new Uint8Array(32), new Uint8Array(32))
    ).toEqual(null);
  });
});
