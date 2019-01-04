// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDbOptions } from '../types';

import fs from 'fs';
import { LRUMap } from 'lru_map';

import File from './File';
import defaults from './defaults';

export default class Cache extends File {
  protected _lruBranch: LRUMap<number, Buffer>;
  protected _lruData: LRUMap<number, Buffer>;

  constructor (base: string, file: string, options: BaseDbOptions) {
    super(base, file, options);

    this._lruBranch = new LRUMap(defaults.LRU_BRANCH_COUNT);
    this._lruData = new LRUMap(defaults.LRU_DATA_COUNT);
  }

  protected _cacheBranch (branchAt: number, branch: Buffer): void {
    this._lruBranch.set(branchAt, branch);
  }

  protected _cacheData (dataAt: number, data: Buffer): void {
    this._lruData.set(dataAt, data);
  }

  protected _getCachedBranch (branchAt: number): Buffer {
    let branch = this._lruBranch.get(branchAt);

    if (!branch) {
      branch = Buffer.alloc(defaults.BRANCH_SIZE);

      fs.readSync(this._fd, branch, 0, defaults.BRANCH_SIZE, branchAt);
      this._cacheBranch(branchAt, branch);
    }

    return branch;
  }

  protected _getCachedData (dataAt: number, length: number): Buffer {
    let data = this._lruData.get(dataAt);

    if (!data) {
      data = Buffer.alloc(length);

      fs.readSync(this._fd, data, 0, length, dataAt);
      this._cacheData(dataAt, data);
    }

    return data;
  }
}
