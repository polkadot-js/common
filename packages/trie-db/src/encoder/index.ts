// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

// @ts-ignore FIXME, we need to properly check the full file
import { LevelUp$AbstractStorage } from 'levelup';
// @ts-ignore FIXME, we need to properly check the full file
import { EncoderBufferOptions, EncodingBuffer } from 'encoding-down';

// @ts-ignore FIXME, we need to properly check the full file
import encodingDown from 'encoding-down';
import logger from '@polkadot/util/logger';

import decode from './decode';
import encode from './encode';

const l = logger('trie/codec');

const encoding: EncodingBuffer<Uint8Array> = {
  buffer: true,
  decode: decode(l),
  encode: encode(l),
  type: 'Uint8Array'
};

const options: EncoderBufferOptions<Uint8Array> = {
  keyEncoding: encoding,
  valueEncoding: encoding
};

function encoder (db: LevelUp$AbstractStorage) {
  return encodingDown(db, options);
}

// @ts-ignore FIXME, we need to properly check the full file
encoder.options = options;

export default encoder;
