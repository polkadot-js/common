// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { NibbleBuffer } from './types';

import snappy from 'snappy';
import { toNibbles } from '@polkadot/trie-codec/util';
import { assert, bufferToU8a, u8aToBuffer, u8aToHex } from '@polkadot/util/index';

import defaults from './defaults';

export default class Serialize {
  protected _isCompressed: boolean = false;

  protected _deserializeValue (value: Buffer): Uint8Array | null {
    return bufferToU8a(
      this._isCompressed
        ? snappy.uncompressSync(value)
        : value
    );
  }

  protected _serializeValue (value: Uint8Array): Buffer {
    return this._isCompressed
      ? snappy.compressSync(
        u8aToBuffer(value)
      )
      : u8aToBuffer(value);
  }

  protected _serializeKey (u8a: Uint8Array): NibbleBuffer {
    assert(u8a.length <= defaults.KEY_SIZE, `${u8aToHex(u8a)} too large, expected <= 32 bytes`);

    let buffer;

    if (u8a.length === defaults.KEY_SIZE) {
      buffer = u8aToBuffer(u8a);
    } else {
      buffer = Buffer.alloc(defaults.KEY_SIZE);

      buffer.set(u8a, 0);
    }

    return {
      buffer,
      nibbles: toNibbles(u8a)
    };
  }
}
