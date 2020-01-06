// Copyright 2017-2020 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { TxDb, ProgressCb } from '@polkadot/db/types';
import { Codec } from '@polkadot/trie-codec/types';
import { TrieDb, Node, TrieEntry } from './types';

import MemoryDb from '@polkadot/db/Memory';
import { toNibbles } from '@polkadot/trie-codec/util';
import { isNull, logger, u8aToHex } from '@polkadot/util';

import Impl from './Impl';
import constants from './constants';

const l = logger('trie/db');

/**
 * # @polkadot/trie-db
 *
 * ## Overview
 *
 * @name Trie
 * @summary Re-implementation of a Patricia Trie
 * @example See [Polkadot-JS Common Trie-DB Examples](https://polkadot.js.org/api/common/examples/trie-db/)
 */
export default class Trie extends Impl implements TrieDb {
  constructor (db: TxDb = new MemoryDb(), rootHash?: Uint8Array, codec?: Codec) {
    super(db, rootHash, codec);

    l.debug((): string => `Created with ${this.codec.type} codec, root ${u8aToHex(this.rootHash, 64)}`);
  }

  public transaction<T> (fn: () => T): T {
    try {
      this.createCheckpoint();

      const result = this.db.transaction(fn);

      if (result) {
        this.commitCheckpoint();
      } else {
        this.revertCheckpoint();
      }

      return result;
    } catch (error) {
      this.revertCheckpoint();

      throw error;
    }
  }

  public open (): void {
    this.db.open();
  }

  public close (): void {
    this.db.close();
  }

  public empty (): void {
    this.db.empty();
  }

  public drop (): void {
    this.db.drop();
  }

  public maintain (fn: ProgressCb): void {
    this.db.maintain(fn);
  }

  public rename (base: string, file: string): void {
    this.db.rename(base, file);
  }

  public size (): number {
    return this.db.size();
  }

  public del (key: Uint8Array): void {
    // l.debug(() => ['del', { key }]);

    this._setRootNode(
      this._del(
        this._getNode(this.rootHash),
        toNibbles(key)
      )
    );
  }

  public get (key: Uint8Array): Uint8Array | null {
    // l.debug(() => ['get', { key }]);

    return this._get(
      this._getNode(this.rootHash),
      toNibbles(key)
    );
  }

  public put (key: Uint8Array, value: Uint8Array): void {
    // l.debug(() => ['put', { key, value }]);

    this._setRootNode(
      this._put(
        this._getNode(this.rootHash),
        toNibbles(key),
        value
      )
    );
  }

  public getRoot (): Uint8Array {
    const rootNode = this.getNode();

    if (isNull(rootNode)) {
      return constants(this.codec).EMPTY_U8A;
    }

    return this.rootHash;
  }

  public setRoot (rootHash: Uint8Array): void {
    this.rootHash = rootHash;
    // return this._setRootNode(rootNode);
  }

  public getEntry (hash?: Uint8Array): TrieEntry | null {
    return this._entry(hash || this.rootHash);
  }

  public getNode (hash?: Uint8Array): Node {
    return this._getNode(hash || this.rootHash);
  }

  public entries (): TrieEntry[] {
    l.debug((): string => 'retrieving trie entries');

    const start = Date.now();
    const entries = this._entries(this.rootHash);
    const elapsed = (Date.now() - start) / 1000;

    l.debug((): string => `entries retrieved in ${elapsed.toFixed(2)}s, ${(entries.length / 1000).toFixed(2)}k keys`);

    return entries;
  }

  public snapshot (dest: TrieDb, fn?: ProgressCb): number {
    l.debug((): string => 'creating current state snapshot');

    const start = Date.now();
    const keys = this._snapshot(dest, fn, this.rootHash, 0, 0, 0);
    const elapsed = (Date.now() - start) / 1000;

    dest.setRoot(this.rootHash);

    l.debug((): string => `snapshot created in ${elapsed.toFixed(2)}s, ${(keys / 1000).toFixed(2)}k keys`);

    fn && fn({
      isCompleted: true,
      keys,
      percent: 100
    });

    return keys;
  }
}
