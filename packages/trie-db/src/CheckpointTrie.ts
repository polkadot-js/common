// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

// @ts-ignore FIXME, we need to properly check the full file
import levelws from 'level-ws';
// @ts-ignore FIXME, we need to properly check the full file
import levelup from 'levelup';
import memdown from 'memdown';
import assert from '@polkadot/util/assert';
import logger from '@polkadot/util/logger';
import u8aToHex from '@polkadot/util/u8a/toHex';

import BaseTrie from './BaseTrie';
import encoder from './encoder';
import ScratchReadStream from './streams/ScratchRead';

const l = logger('trie/checkpt');

function putRaw (key: Uint8Array, value: Uint8Array) {
  return Promise.all(
    // @ts-ignore FIXME, we need to properly check the full file
    this.__putDBs.map((db) => {
      return db.put(key, value);
    })
  );
}

export default class CheckpointTrie extends BaseTrie {
  _checkpoints: Array<Uint8Array>;
  _scratch: any; // FIXME
  // @ts-ignore FIXME, we need to properly check the full file
  __putDBs: any[]; // tslint:disable-line

  // @ts-ignore FIXME, we need to properly check the full file
  constructor (db, root: Uint8Array) {
    super(db, root);

    this._scratch = null;
    this._checkpoints = [];

    l.debug(() => 'Created CheckpointTrie');
  }

  get isCheckpoint () {
    return !!this._checkpoints.length;
  }

  copy () {
    l.debug(() => ['Copying CheckpointTrie', typeof this.dbDown, u8aToHex(this.root)]);

    return new CheckpointTrie(this.dbDown, this.root);
  }

  async checkpoint () {
    l.debug(() => 'Marking checkpoint');

    const wasCheckpoint = this.isCheckpoint;

    this._checkpoints.push(this.root);

    if (!wasCheckpoint && this.isCheckpoint) {
      this._enterCpMode();
    }
  }

  commit () {
    l.debug(() => 'Committing checkpoint');

    return this.semaphore(async () => {
      assert(this.isCheckpoint, 'trying to commit when not checkpointed');

      this._checkpoints.pop();

      if (this.isCheckpoint) {
        return;
      }

      return this._exitCpMode(true);
    });
  }

  revert () {
    l.debug(() => 'Reverting checkpoint');

    return this.semaphore(async () => {
      if (!this.isCheckpoint) {
        return;
      }

      this.root = this._checkpoints.pop() as Uint8Array;

      if (this.isCheckpoint) {
        return;
      }

      return this._exitCpMode(false);
    });
  }

  // @ts-ignore FIXME, we need to properly check the full file
  createScratchReadStream (scratch) {
    const trie = this.copy();

    scratch = scratch || this._scratch;

    // only read from the scratch
    trie._getDBs = [scratch];
    trie._scratch = scratch;

    return new ScratchReadStream(trie);
  }

  _enterCpMode () {
    l.debug(() => 'Entering checkpoint mode');

    this._scratch = levelup(encoder(memdown()));

    this._getDBs = [this._scratch].concat(this._getDBs);
    this.__putDBs = this._putDBs;
    this._putDBs = [this._scratch];
    this._putRaw = this.putRaw;
    this.putRaw = putRaw;
  }

  // @ts-ignore FIXME, we need to properly check the full file
  _exitCpMode (commitState) {
    l.debug(() => 'Exiting checkpoint mode');

    const scratch = this._scratch;
    this._scratch = null;
    this._getDBs = this._getDBs.slice(1);
    this._putDBs = this.__putDBs;
    this.putRaw = this._putRaw;

    if (!commitState) {
      return;
    }

    return Promise.all(
      this._putDBs.map((db) => {
        return new Promise((resolve) => {
          if (!db.createWriteStream) {
            db = levelws(db);
          }

          this
            // @ts-ignore FIXME, we need to properly check the full file
            .createScratchReadStream(scratch)
            // @ts-ignore FIXME, we need to properly check the full file
            .pipe(
              // @ts-ignore FIXME, we need to properly check the full file
              db.createWriteStream(encoder.options)
            )
            .on('close', resolve);
        });
      })
    );
  }
}
