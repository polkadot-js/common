// Copyright 2017-2018 @polkadot/trie-db-port authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { Decoder, Encoder, NodeDecoded, NodeType } from './types';

import isU8a from '@polkadot/util/is/u8a';
import u8aToHex from '@polkadot/util/u8a/toHex';

export default class Node {
  private decoded: NodeDecoded;
  private type: NodeType;

  constructor (type: NodeType, decoded: NodeDecoded) {
    this.decoded = decoded;
    this.type = type;
  }

  encode (encoder: Encoder): Uint8Array {
    return encoder(this.decoded);
  }

  toString (): string {
    return this.decoded.reduce((text, item, index) => {
      if (index !== 0) {
        text += ', ';
      }

      if (isU8a(item)) {
        text += u8aToHex(item);
      } else if (item) {
        text += '<object>';
      } else {
        text += '<empty>';
      }

      return text;
    }, `${NodeType[this.type]}: [`) + ']';
  }

  static fromEncoded (decoder: Decoder, encoded: Uint8Array): Node {
    const decoded = decoder(encoded);

    return new Node(NodeType.EMPTY, decoded);
  }
}
