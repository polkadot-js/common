// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb, ProgressCb } from '../types';

import fs from 'fs';
import mkdirp from 'mkdirp';
import logger from '@polkadot/util/logger';
import bufferToU8a from '@polkadot/util/buffer/toU8a';
import u8aToBuffer from '@polkadot/util/u8a/toBuffer';
import u8aToHex from '@polkadot/util/u8a/toHex';

type FilePath = {
  directory: string,
  file: string
};

const DIR_DEPTH = 1;

const l = logger('db/tree');

export default class FileTreeDb implements BaseDb {
  _location: string;

  constructor (location: string) {
    this._location = location;
  }

  private _getFilePath (key: Uint8Array): FilePath {
    // NOTE We want to limit the number of entries in any specific directory. Split the
    // key into parts and use this to construct the path and the actual filename. We want
    // to limit the entries per directory, but at the same time minimize the number of
    // directories we need to create (when non-existent as well as the size overhead)
    const parts = u8aToHex(key).match(/.{1,6}/g) || [];
    const directory = `${this._location}/${parts.slice(0, DIR_DEPTH).join('/')}`;
    const file = `${directory}/${parts.slice(DIR_DEPTH).join('')}`;

    return {
      directory,
      file
    };
  }

  open (): void {
    // noop
  }

  close (): void {
    // noop
  }

  empty (): void {
    l.error('empty() is not implemented');
  }

  rename (base: string, file: string): void {
    l.error('rename() is not implemented');
  }

  size (): number {
    l.error('size() is not implemented');

    return 0;
  }

  maintain (fn: ProgressCb): void {
    fn({
      isCompleted: true,
      keys: 0,
      percent: 100
    });
  }

  del (key: Uint8Array): void {
    l.debug(() => ['del', { key }]);

    const { file } = this._getFilePath(key);

    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
  }

  get (key: Uint8Array): Uint8Array | null {
    l.debug(() => ['get', { key }]);

    const { file } = this._getFilePath(key);

    if (!fs.existsSync(file)) {
      return null;
    }

    return bufferToU8a(
      fs.readFileSync(file)
    );
  }

  put (key: Uint8Array, value: Uint8Array): void {
    l.debug(() => ['set', { key, value }]);

    const { directory, file } = this._getFilePath(key);

    if (!fs.existsSync(directory)) {
      mkdirp.sync(directory);
    }

    fs.writeFileSync(file, u8aToBuffer(value));
  }
}
