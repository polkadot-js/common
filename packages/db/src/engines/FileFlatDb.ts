// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb, ProgressCb } from '../types';

import fs from 'fs';
// import snappy from 'snappy';
import assert from '@polkadot/util/assert';
import logger from '@polkadot/util/logger';
import bufferToU8a from '@polkadot/util/buffer/toU8a';
import u8aToBuffer from '@polkadot/util/u8a/toBuffer';
import u8aToHex from '@polkadot/util/u8a/toHex';

enum Slot {
  EMPTY = 0,
  BRANCH = 1,
  LEAF = 2
}

type Entry = {
  entry: Buffer,
  entryAt: number
};

type Key = {
  key: Buffer,
  keyAt: number,
  keyValue: Buffer
};

type Leaf = Entry & Key;

type Branch = Leaf & {
  branch: Buffer,
  branchAt: number
};

type Value = Key & {
  value: Buffer,
  valueAt: number
};

// NOTE 1,099,511,627,776 filesize (max allowed here is 6 as per Nodejs)
const UINT_SIZE = 5;
const KEY_SIZE = 32;
const KEY_TOTAL_SIZE = KEY_SIZE + UINT_SIZE + UINT_SIZE;
const ENTRY_NUM = 256;
const ENTRY_SIZE = 1 + UINT_SIZE;
const HEADER_SIZE = ENTRY_NUM * ENTRY_SIZE;

const l = logger('db/flat');

export default class FileFlatDb implements BaseDb {
  _fd: number;
  _file: string;

  constructor (location: string) {
    if (!fs.existsSync(location)) {
      throw new Error(`Unable to open ${location}`);
    }

    this._file = `${location}/store.db`;
    this._fd = -1;
  }

  open (): void {
    this._fd = this._open(this._file);
  }

  close (): void {
    this.assertOpen();

    fs.closeSync(this._fd);
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

  del (key: Uint8Array): void {
    throw new Error('delete not implemented, only stubbed');
  }

  get (key: Uint8Array): Uint8Array | null {
    this.assertOpen();

    l.debug(() => ['get', { key }]);

    const desc = this.findKey(this._serializeKey(key), false);

    if (!desc) {
      return null;
    }

    const result = this.readValue(desc);

    return result && result.value
      ? bufferToU8a(result.value)
      : null;
  }

  put (key: Uint8Array, value: Uint8Array): void {
    this.assertOpen();

    l.debug(() => ['set', { key, value }]);

    const desc = this.findKey(this._serializeKey(key), true);

    if (!desc) {
      throw new Error('Unable to create key');
    }

    this.writeValue(
      desc,
      u8aToBuffer(value)
    );
  }

  private _serializeKey (key: Uint8Array): Buffer {
    if (key.length === KEY_SIZE) {
      return u8aToBuffer(key);
    } else if (key.length < KEY_SIZE) {
      const paddedKey = Buffer.alloc(KEY_SIZE);

      paddedKey.set(key, 0);

      return paddedKey;
    }

    throw new Error(`${u8aToHex(key)} too large, expected <= 32 bytes`);
  }

  private _compactReadEntry (fd: number, at: number, index: number): Buffer {
    const entry = Buffer.alloc(ENTRY_SIZE);
    const entryAt = at + (index * ENTRY_SIZE);

    fs.readSync(fd, entry, 0, ENTRY_SIZE, entryAt);

    return entry;
  }

  private _compactReadKey (fd: number, at: number): [Buffer, Buffer] {
    const key = Buffer.alloc(KEY_TOTAL_SIZE);

    fs.readSync(fd, key, 0, KEY_TOTAL_SIZE, at);

    const valueLength = key.readUIntBE(KEY_SIZE, UINT_SIZE);
    const valueAt = key.readUIntBE(KEY_SIZE + UINT_SIZE, UINT_SIZE);
    const value = Buffer.alloc(valueLength);

    fs.readSync(fd, value, 0, valueLength, valueAt);

    return [key, value];
  }

  private _compactWriteKey (fd: number, key: Buffer, value: Buffer): number {
    const stats = fs.fstatSync(fd);
    const at = stats.size;

    fs.writeSync(fd, value, 0, value.length, at);
    key.writeUIntBE(at, KEY_SIZE + UINT_SIZE, UINT_SIZE);
    fs.writeSync(fd, key, 0, KEY_TOTAL_SIZE);

    return at + value.length;
  }

  private _compactUpdateLink (fd: number, at: number, index: number, pointer: number, type: Slot): void {
    const entry = Buffer.alloc(ENTRY_SIZE);

    entry.set([type], 0);
    entry.writeUIntBE(pointer, 1, UINT_SIZE);

    fs.writeSync(fd, entry, 0, ENTRY_SIZE, at + (index * ENTRY_SIZE));
  }

  private _compactWriteHeader (fd: number, at: number, index: number): number {
    const stats = fs.fstatSync(fd);
    const headerAt = stats.size;
    const header = Buffer.alloc(HEADER_SIZE);

    fs.writeSync(fd, header, 0, HEADER_SIZE, headerAt);

    this._compactUpdateLink(fd, at, index, headerAt, Slot.BRANCH);

    return headerAt;
  }

  private _compact (fn: ProgressCb, newFd: number, oldFd: number): number {
    // l.debug(() => ['_compact', debug({ newFd, oldFd, newAt, oldAt })]);

    let keys = 0;
    let percent = 0;

    const doCompact = (newAt: number, oldAt: number, depth: number) => {
      const increment = (100 / ENTRY_NUM) / Math.pow(ENTRY_NUM, depth);

      for (let index = 0; index < ENTRY_NUM; index++) {
        const entry = this._compactReadEntry(oldFd, oldAt, index);
        const dataAt = entry.readUIntBE(1, UINT_SIZE);
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
          isCompleted: depth === 0 && index === (ENTRY_NUM - 1),
          keys,
          percent
        });
      }

      // l.debug(() => ['_compact', '=>', `${depth}: ${keys} keys written`]);
    };

    doCompact(0, 0, 0);

    return keys;
  }

  private _findKey (key: Buffer, doCreate: boolean, keyIndex: number, diskAt: number): Leaf | null {
    const entry = Buffer.alloc(ENTRY_SIZE);
    const entryAt = diskAt + (key[keyIndex] * ENTRY_SIZE);

    fs.readSync(this._fd, entry, 0, ENTRY_SIZE, entryAt);

    l.debug(() => ['findKey', { key, doCreate, keyIndex, diskAt, entry, entryAt }]);

    const entryType = entry[0];

    if (entryType === Slot.BRANCH) {
      const branchAt = entry.readUIntBE(1, UINT_SIZE);

      l.debug(() => ['findKey/isBranch', { branchAt }]);

      return this._findKey(key, doCreate, keyIndex + 1, branchAt);
    }

    if (entryType === Slot.EMPTY) {
      l.debug(() => ['findKey/isEmpty']);

      return doCreate
        ? this.writeNewLeaf(entry, entryAt, key)
        : null;
    }

    if (entryType === Slot.LEAF) {
      const keyAt = entry.readUIntBE(1, UINT_SIZE);
      const keyValue = Buffer.alloc(KEY_TOTAL_SIZE);

      fs.readSync(this._fd, keyValue, 0, KEY_TOTAL_SIZE, keyAt);

      l.debug(() => ['findKey/isLeaf', { keyAt, entry, keyValue }]);

      let matchIndex = keyIndex;

      while (matchIndex < KEY_SIZE) {
        if (keyValue[matchIndex] !== key[matchIndex]) {
          break;
        }

        matchIndex++;
      }

      if (matchIndex !== KEY_SIZE) {
        return doCreate
          ? this.writeNewBranch(entry, entryAt, key, keyAt, keyValue, matchIndex, matchIndex - keyIndex - 1)
          : null;
      }

      return {
        entry,
        entryAt,
        key,
        keyAt,
        keyValue
      };
    }

    throw new Error(`Unhandled entry type ${entryType}`);
  }

  private findKey (key: Buffer, doCreate: boolean): Leaf | null {
    const result = this._findKey(key, doCreate, 0, 0);

    l.debug(() => ['findKey', { result }]);

    return result;
  }

  private _extractValueInfo (keyValue: Buffer): { valueAt: number, valueLength: number } {
    return {
      valueLength: keyValue.readUIntBE(KEY_SIZE, UINT_SIZE),
      valueAt: keyValue.readUIntBE(KEY_SIZE + UINT_SIZE, UINT_SIZE)
    };
  }

  private _readValue (key: Buffer, keyAt: number, keyValue: Buffer): Value {
    l.debug(() => ['readValue', { key, keyAt, keyValue }]);

    const { valueAt, valueLength } = this._extractValueInfo(keyValue);
    const value = Buffer.alloc(valueLength);

    fs.readSync(this._fd, value, 0, valueLength, valueAt);

    return {
      key,
      keyAt,
      keyValue,
      value,
      valueAt
    };
  }

  private readValue ({ key, keyAt, keyValue }: Key): Value {
    const result = this._readValue(key, keyAt, keyValue);

    l.debug(() => ['readValue', { result }]);

    return result;
  }

  private _writeValue (key: Buffer, keyAt: number, keyValue: Buffer, value: Buffer): Value {
    l.debug(() => ['writeValue', { keyAt, keyValue, value }]);

    let { valueAt, valueLength } = this._extractValueInfo(keyValue);

    if (valueLength < value.length) {
      const stats = fs.fstatSync(this._fd);

      valueAt = stats.size;
    }

    fs.writeSync(this._fd, value, 0, value.length, valueAt);

    keyValue.writeUIntBE(value.length, KEY_SIZE, UINT_SIZE);
    keyValue.writeUIntBE(valueAt, KEY_SIZE + UINT_SIZE, UINT_SIZE);

    fs.writeSync(this._fd, keyValue, KEY_SIZE, 2 * UINT_SIZE, keyAt + KEY_SIZE);

    return {
      key,
      keyAt,
      keyValue,
      value,
      valueAt
    };
  }

  private writeValue ({ key, keyAt, keyValue }: Key, value: Buffer): Value {
    const result = this._writeValue(key, keyAt, keyValue, value);

    l.debug(() => ['writeValue', '=>', { result }]);

    return result;
  }

  private _writeNewKey (key: Buffer): Key {
    l.debug(() => ['writeNewKey', { key }]);

    const stats = fs.fstatSync(this._fd);
    const keyAt = stats.size;
    const keyValue = Buffer.alloc(KEY_TOTAL_SIZE);

    keyValue.set(key, 0);

    fs.writeSync(this._fd, keyValue, 0, KEY_TOTAL_SIZE, keyAt);

    return {
      key,
      keyAt,
      keyValue
    };
  }

  private writeNewKey (key: Buffer): Key {
    const result = this._writeNewKey(key);

    l.debug(() => ['writeNewKey', '=>', { result }]);

    return result;
  }

  private _writeNewBranch (entry: Buffer, entryAt: number, key: Buffer, prevAt: number, prevValue: Buffer, matchIndex: number, depth: number): Branch {
    l.debug(() => ['writeNewBranch', { entry, entryAt, key, prevValue, matchIndex, depth }]);

    const { keyAt, keyValue } = this.writeNewKey(key);
    const branch = Buffer.alloc(HEADER_SIZE);
    const keyIndex = ENTRY_SIZE * key[matchIndex];
    const prevIndex = ENTRY_SIZE * prevValue[matchIndex];
    const stats = fs.fstatSync(this._fd);
    let branchAt = stats.size;

    branch.set([Slot.LEAF], keyIndex);
    branch.writeUIntBE(keyAt, keyIndex + 1, UINT_SIZE);
    branch.set([Slot.LEAF], prevIndex);
    branch.writeUIntBE(prevAt, prevIndex + 1, UINT_SIZE);
    fs.writeSync(this._fd, branch, 0, HEADER_SIZE, branchAt);

    let intermediateAt = branchAt;

    for (let offset = 1; depth > 0; depth--, offset++) {
      const intermediate = Buffer.alloc(HEADER_SIZE);
      const intermediateIndex = ENTRY_SIZE * key[matchIndex - offset];
      const stats = fs.fstatSync(this._fd);

      intermediate.set([Slot.BRANCH], intermediateIndex);
      intermediate.writeUIntBE(intermediateAt, intermediateIndex + 1, UINT_SIZE);
      intermediateAt = stats.size;

      fs.writeSync(this._fd, intermediate, 0, HEADER_SIZE, intermediateAt);
    }

    entry.set([Slot.BRANCH], 0);
    entry.writeUIntBE(intermediateAt, 1, UINT_SIZE);
    fs.writeSync(this._fd, entry, 0, ENTRY_SIZE, entryAt);

    return {
      branch,
      branchAt,
      entry: branch.slice(keyIndex, keyIndex + ENTRY_SIZE),
      entryAt: branchAt + keyIndex,
      key,
      keyAt,
      keyValue
    };
  }

  private writeNewBranch (entry: Buffer, entryAt: number, key: Buffer, prevAt: number, prevValue: Buffer, matchIndex: number, depth: number): Leaf {
    const result = this._writeNewBranch(entry, entryAt, key, prevAt, prevValue, matchIndex, depth);

    l.debug(() => ['writeNewBranch', '=>', { result }]);

    return result;
  }

  private _writeNewLeaf (entry: Buffer, entryAt: number, key: Buffer): Leaf {
    l.debug(() => ['writeNewLeaf', { entry, entryAt, key }]);

    const { keyAt, keyValue } = this.writeNewKey(key);

    entry.set([Slot.LEAF], 0);
    entry.writeUIntBE(keyAt, 1, UINT_SIZE);

    fs.writeSync(this._fd, entry, 0, ENTRY_SIZE, entryAt);

    return {
      entry,
      entryAt,
      key,
      keyAt,
      keyValue
    };
  }

  private writeNewLeaf (entry: Buffer, entryAt: number, key: Buffer): Leaf {
    const result = this._writeNewLeaf(entry, entryAt, key);

    l.debug(() => ['writeNewLeaf', '=>', { result }]);

    return result;
  }

  private assertOpen (): void {
    assert(this._fd !== -1, 'Expected an open database');
  }

  private _open (file: string, startEmpty: boolean = false): number {
    if (!fs.existsSync(file) || startEmpty) {
      fs.writeFileSync(file, Buffer.alloc(HEADER_SIZE));
    }

    return fs.openSync(file, 'a+');
  }
}
