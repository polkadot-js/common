// Copyright 2017-2018 @polkadot/db-diskdown authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { DiskStore } from '../types';

import fs from 'fs';
import mkdirp from 'mkdirp';
import logger from '@polkadot/util/logger';

type FilePath = {
  directory: string,
  file: string
};

const DIR_DEPTH = 1;

const l = logger('disk/scatter');

export default class Scatter implements DiskStore {
  _location: string;

  constructor (location: string) {
    this._location = location;
  }

  private _keyToString (key: Buffer): string {
    return key
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

  private _getFilePath (key: Buffer): FilePath {
    // NOTE We want to limit the number of entries in any specific directory. Split the
    // key into parts and use this to construct the path and the actual filename. We want
    // to limit the entries per directory, but at the same time minimize the number of
    // directories we need to create (when non-existent as well as the size overhead)
    const parts = this._keyToString(key).match(/.{1,3}/g) || [];
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

  compact (progress: (message: string) => void): void {
    // noop
  }

  delete (key: Buffer): void {
    throw new Error('delete not implemented, only stubbed');
  }

  get (key: Buffer): Buffer | undefined {
    l.debug(() => ['get', key.toString('hex')]);

    const { file } = this._getFilePath(key);

    if (!fs.existsSync(file)) {
      return;
    }

    return fs.readFileSync(file);
  }

  set (key: Buffer, value: Buffer): void {
    l.debug(() => ['set', key.toString('hex'), value]);

    const { directory, file } = this._getFilePath(key);

    if (!fs.existsSync(directory)) {
      mkdirp.sync(directory);
    }

    fs.writeFileSync(file, value);
  }
}
