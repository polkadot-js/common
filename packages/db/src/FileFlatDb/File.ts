// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDbOptions } from '../types';

import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';
import { assert, isUndefined } from '@polkadot/util';

import Serialize from './Serialize';
import defaults from './defaults';

export default class File extends Serialize {
  protected _fd: number = -1;
  protected _fileSize: number = 0;
  protected _path: string;
  protected _file: string;

  constructor (base: string, file: string, options: BaseDbOptions) {
    super();

    this._file = file;
    this._path = path.join(base, file);
    this._isCompressed = options && !isUndefined(options.isCompressed)
      ? options.isCompressed
      : false;

    mkdirp.sync(base);
  }

  protected assertOpen (open: boolean = true): void {
    const test = open
      ? this._fd !== -1
      : this._fd === -1;

    assert(test, `Expected ${open ? 'an open' : 'a closed'} database`);
  }

  protected _close (): void {
    fs.closeSync(this._fd);

    this._fd = -1;
  }

  protected _open (file: string, startEmpty: boolean = false): void {
    const isExisting = fs.existsSync(file);

    if (!isExisting || startEmpty) {
      if (isExisting) {
        fs.renameSync(file, `${file}.${Date.now()}`);
      }

      fs.writeFileSync(file, Buffer.alloc(defaults.BRANCH_SIZE));
    }

    this._fd = fs.openSync(file, 'r+');
    this._fileSize = fs.fstatSync(this._fd).size;
  }
}
