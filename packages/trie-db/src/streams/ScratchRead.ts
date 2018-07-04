// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { Trie$Base } from '../types';

// @ts-ignore FIXME, we need to properly check the full file
import { Readable } from 'readable-stream';
// import logger from '@polkadot/util/logger';
// import u8aToHex from '@polkadot/util/u8a/toHex';

// import rlpToString from '../util/rlpToString';

// const l = logger('trie/scratch');

export default class ScratchReadStream extends Readable {
  trie: Trie$Base;
  next: null; // FIXME
  // @ts-ignore FIXME, we need to properly check the full file
  _started: boolean;

  constructor (trie: Trie$Base) {
    super({ objectMode: true });

    this.trie = trie;
    this.next = null;
  }

  _read () {
    if (this._started) {
      return;
    }

    const onDone = () => {
      // l.debug(() => 'onDone');
      // @ts-ignore FIXME, we need to properly check the full file
      this.push(null);
    };
    // @ts-ignore FIXME, we need to properly check the full file
    const onFound = (nodeRef, node, key, next) => {
      // l.debug(() => ['onFound', u8aToHex(nodeRef), node.type, rlpToString(node.raw)]);

      // @ts-ignore FIXME, we need to properly check the full file
      this.push({
        key: nodeRef,
        value: node.serialize()
      });

      next();
    };

    // l.debug(() => 'Starting stream');

    this._started = true;
    this.trie._findDbNodes(onFound, onDone);
  }
}
