// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { ProgressCb } from '../types';
import { Slot } from './types';

import fs from 'fs';
import { assert, logger } from '@polkadot/util/index';

import defaults from './defaults';

const l = logger('db/compact');

export default class Compact {
  private _fd: number;
  private _file: string;

  constructor (file: string) {
    this._fd = -1;
    this._file = file;
  }

  maintain (fn: ProgressCb): void {
    assert(this._fd === -1, 'Database cannot be open for compacting');

    l.log('compacting database');

    const start = Date.now();
    const newFile = `${this._file}.compacted`;
    const newFd = this._open(newFile, true);
    const oldFd = this._open(this._file);
    const keys = this._compact(fn, newFd, oldFd);

    fs.closeSync(oldFd);
    fs.closeSync(newFd);

    const newStat = fs.lstatSync(newFile);
    const oldStat = fs.lstatSync(this._file);
    const percentage = 100 * (newStat.size / oldStat.size);
    const sizeMB = newStat.size / (1024 * 1024);
    const elapsed = (Date.now() - start) / 1000;

    fs.unlinkSync(this._file);
    fs.renameSync(newFile, this._file);

    l.log(`compacted in ${elapsed.toFixed(2)}s, ${(keys / 1000).toFixed(2)}k keys, ${sizeMB.toFixed(2)}MB (${percentage.toFixed(2)}%)`);
  }

  private _open (file: string, startEmpty: boolean = false): number {
    if (!fs.existsSync(file) || startEmpty) {
      fs.writeFileSync(file, Buffer.alloc(defaults.BRANCH_SIZE));
    }

    return fs.openSync(file, 'r+');
  }

  private _compact (fn: ProgressCb, newFd: number, oldFd: number): number {
    // l.debug(() => ['_compact', debug({ newFd, oldFd, newAt, oldAt })]);

    let keys = 0;
    let percent = 0;

    const doCompact = (newAt: number, oldAt: number, depth: number) => {
      const increment = (100 / defaults.ENTRY_NUM) / Math.pow(defaults.ENTRY_NUM, depth);

      for (let index = 0; index < defaults.ENTRY_NUM; index++) {
        const entry = this._compactReadEntry(oldFd, oldAt, index);
        const dataAt = entry.readUIntBE(1, defaults.UINT_SIZE);
        const entryType = entry[0];

        if (entryType === Slot.EMPTY) {
          // l.debug(() => '_compact/isEmpty');
          percent += increment;
        } else if (entryType === Slot.LEAF) {
          // l.debug(() => '_compact/isLeaf');

          const [key, value] = this._compactReadKey(oldFd, dataAt);
          const keyAt = this._compactWriteKey(newFd, key, value);

          this._compactUpdateLink(newFd, newAt, index, keyAt, Slot.LEAF);

          keys++;
          percent += increment;
        } else if (entryType === Slot.BRANCH) {
          // l.debug(() => '_compact/isBranch');

          const headerAt = this._compactWriteHeader(newFd, newAt, index);

          doCompact(headerAt, dataAt, depth + 1);
        } else {
          throw new Error(`Unknown entry type, ${entryType}`);
        }

        fn({
          isCompleted: depth === 0 && index === (defaults.ENTRY_NUM - 1),
          keys,
          percent
        });
      }

      // l.debug(() => ['_compact', '=>', `${depth}: ${keys} keys written`]);
    };

    doCompact(0, 0, 0);

    return keys;
  }

  private _compactReadEntry (fd: number, at: number, index: number): Buffer {
    const entry = Buffer.alloc(defaults.ENTRY_SIZE);
    const entryAt = at + (index * defaults.ENTRY_SIZE);

    fs.readSync(fd, entry, 0, defaults.ENTRY_SIZE, entryAt);

    return entry;
  }

  private _compactReadKey (fd: number, at: number): [Buffer, Buffer] {
    const key = Buffer.alloc(defaults.KEY_TOTAL_SIZE);

    fs.readSync(fd, key, 0, defaults.KEY_TOTAL_SIZE, at);

    const valueLength = key.readUIntBE(defaults.KEY_SIZE, defaults.UINT_SIZE);
    const valueAt = key.readUIntBE(defaults.KEY_SIZE + defaults.UINT_SIZE, defaults.UINT_SIZE);
    const value = Buffer.alloc(valueLength);

    fs.readSync(fd, value, 0, valueLength, valueAt);

    return [key, value];
  }

  private _compactWriteKey (fd: number, key: Buffer, value: Buffer): number {
    const valueAt = fs.fstatSync(fd).size;
    const keyAt = valueAt + value.length;

    key.writeUIntBE(valueAt, defaults.KEY_SIZE + defaults.UINT_SIZE, defaults.UINT_SIZE);

    fs.writeSync(fd, value, 0, value.length, valueAt);
    fs.writeSync(fd, key, 0, defaults.KEY_TOTAL_SIZE, keyAt);

    return keyAt;
  }

  private _compactUpdateLink (fd: number, at: number, index: number, pointer: number, type: Slot): void {
    const entry = Buffer.alloc(defaults.ENTRY_SIZE);

    entry.set([type], 0);
    entry.writeUIntBE(pointer, 1, defaults.UINT_SIZE);

    fs.writeSync(fd, entry, 0, defaults.ENTRY_SIZE, at + (index * defaults.ENTRY_SIZE));
  }

  private _compactWriteHeader (fd: number, at: number, index: number): number {
    const headerAt = fs.fstatSync(fd).size;
    const header = Buffer.alloc(defaults.BRANCH_SIZE);

    fs.writeSync(fd, header, 0, defaults.BRANCH_SIZE, headerAt);

    this._compactUpdateLink(fd, at, index, headerAt, Slot.BRANCH);

    return headerAt;
  }
}
