// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb, BaseDbOptions, ProgressCb } from '../types';

import fs from 'fs';
import { LRUMap } from 'lru_map';
import mkdirp from 'mkdirp';
import path from 'path';
import snappy from 'snappy';
import asNibbles from '@polkadot/trie-hash/util/asNibbles';
import assert from '@polkadot/util/assert';
import logger from '@polkadot/util/logger';
import isUndefined from '@polkadot/util/is/undefined';
import bufferToU8a from '@polkadot/util/buffer/toU8a';
import u8aToBuffer from '@polkadot/util/u8a/toBuffer';
import u8aToHex from '@polkadot/util/u8a/toHex';

enum Slot {
  EMPTY = 0,
  BRANCH = 1,
  LEAF = 2
}

type NibbleBuffer = {
  buffer: Buffer,
  nibbles: Uint8Array
};

type Key = {
  key: NibbleBuffer,
  keyAt: number,
  keyValue: Buffer
};

type Value = {
  value: Buffer,
  valueAt: number
};

// NOTE 1,099,511,627,776 filesize (max allowed here is 6 as per Nodejs)
const UINT_SIZE = 5;
const KEY_SIZE = 32;
const KEY_TOTAL_SIZE = KEY_SIZE + UINT_SIZE + UINT_SIZE;
const ENTRY_NUM = 16; // nibbles, 256 for bytes (where serialize would be noop)
const ENTRY_SIZE = 1 + UINT_SIZE;
const BRANCH_SIZE = ENTRY_NUM * ENTRY_SIZE;
const LRU_BRANCH_COUNT = 2048;
const DEFAULT_FILE = 'store.db';

const l = logger('db/flat');

export default class FileFlatDb implements BaseDb {
  private _fd: number;
  private _file: string;
  private _isCompressed: boolean;
  private _lruBranch: LRUMap<number, Buffer>;

  constructor (base: string, file: string = DEFAULT_FILE, options: BaseDbOptions = {}) {
    this._fd = -1;
    this._file = path.join(base, file);
    this._lruBranch = new LRUMap(LRU_BRANCH_COUNT);
    this._isCompressed = options && !isUndefined(options.isCompressed)
      ? options.isCompressed
      : false;

    mkdirp.sync(base);
  }

  open (): void {
    this._fd = this._open(this._file);
    this._lruBranch.clear();
  }

  close (): void {
    this.assertOpen();

    fs.closeSync(this._fd);
    this._lruBranch.clear();
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
      ? this._deserializeValue(result.value)
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
      this._serializeValue(value)
    );
  }

  private _deserializeValue (value: Buffer): Uint8Array | null {
    return bufferToU8a(
      this._isCompressed
        ? snappy.uncompressSync(value)
        : value
    );
  }

  private _serializeValue (value: Uint8Array): Buffer {
    return this._isCompressed
      ? snappy.compressSync(
        u8aToBuffer(value)
      )
      : u8aToBuffer(value);
  }

  private _serializeKey (u8a: Uint8Array): NibbleBuffer {
    if (u8a.length > KEY_SIZE) {
      throw new Error(`${u8aToHex(u8a)} too large, expected <= 32 bytes`);
    }

    let buffer;

    if (u8a.length === KEY_SIZE) {
      buffer = u8aToBuffer(u8a);
    } else {
      buffer = Buffer.alloc(KEY_SIZE);

      buffer.set(u8a, 0);
    }

    return {
      buffer,
      nibbles: asNibbles(u8a)
    };
  }

  private _getBranch (branchAt: number): Buffer {
    let branch = this._lruBranch.get(branchAt);

    if (!branch) {
      branch = Buffer.alloc(BRANCH_SIZE);

      fs.readSync(this._fd, branch, 0, BRANCH_SIZE, branchAt);
      this._cacheBranch(branchAt, branch);
    }

    return branch;
  }

  private _cacheBranch (branchAt: number, branch: Buffer): void {
    this._lruBranch.set(branchAt, branch);
  }

  private _findKey (key: NibbleBuffer, doCreate: boolean, keyIndex: number, branchAt: number): Key | null {
    const entryIndex = key.nibbles[keyIndex] * ENTRY_SIZE;
    const branch = this._getBranch(branchAt);

    l.debug(() => ['findKey', { key, doCreate, keyIndex, branchAt, branch, entryIndex }]);

    const entryType = branch[entryIndex];

    if (entryType === Slot.BRANCH) {
      const nextBranchAt = branch.readUIntBE(entryIndex + 1, UINT_SIZE);

      l.debug(() => ['findKey/isBranch', { branchAt }]);

      return this._findKey(key, doCreate, keyIndex + 1, nextBranchAt);
    }

    if (entryType === Slot.EMPTY) {
      l.debug(() => ['findKey/isEmpty']);

      return doCreate
        ? this.writeNewLeaf(branch, branchAt, entryIndex, key)
        : null;
    }

    if (entryType === Slot.LEAF) {
      const keyAt = branch.readUIntBE(entryIndex + 1, UINT_SIZE);
      const keyValue = Buffer.alloc(KEY_TOTAL_SIZE);

      fs.readSync(this._fd, keyValue, 0, KEY_TOTAL_SIZE, keyAt);

      const prevValue = this._serializeKey(keyValue.subarray(0, KEY_SIZE));

      l.debug(() => ['findKey/isLeaf', { keyAt, branch, branchAt, entryIndex, keyValue }]);

      let matchIndex = keyIndex;

      while (matchIndex < KEY_SIZE) {
        if (prevValue.nibbles[matchIndex] !== key.nibbles[matchIndex]) {
          break;
        }

        matchIndex++;
      }

      if (matchIndex !== KEY_SIZE) {
        return doCreate
          ? this.writeNewBranch(branch, branchAt, entryIndex, key, keyAt, prevValue, matchIndex, matchIndex - keyIndex - 1)
          : null;
      }

      return {
        key,
        keyAt,
        keyValue
      };
    }

    throw new Error(`Unhandled entry type ${entryType}`);
  }

  private findKey (key: NibbleBuffer, doCreate: boolean): Key | null {
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

  private _readValue (keyValue: Buffer): Value {
    l.debug(() => ['readValue', { keyValue }]);

    const { valueAt, valueLength } = this._extractValueInfo(keyValue);
    const value = Buffer.alloc(valueLength);

    fs.readSync(this._fd, value, 0, valueLength, valueAt);

    return {
      value,
      valueAt
    };
  }

  private readValue ({ keyValue }: Key): Value {
    const result = this._readValue(keyValue);

    l.debug(() => ['readValue', { result }]);

    return result;
  }

  private _writeValue (keyAt: number, keyValue: Buffer, value: Buffer): Value {
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
      value,
      valueAt
    };
  }

  private writeValue ({ keyAt, keyValue }: Key, value: Buffer): Value {
    const result = this._writeValue(keyAt, keyValue, value);

    l.debug(() => ['writeValue', '=>', { result }]);

    return result;
  }

  private _writeNewKey (key: NibbleBuffer): Key {
    l.debug(() => ['writeNewKey', { key }]);

    const stats = fs.fstatSync(this._fd);
    const keyAt = stats.size;
    const keyValue = Buffer.alloc(KEY_TOTAL_SIZE);

    keyValue.set(key.buffer, 0);

    fs.writeSync(this._fd, keyValue, 0, KEY_TOTAL_SIZE, keyAt);

    return {
      key,
      keyAt,
      keyValue
    };
  }

  private writeNewKey (key: NibbleBuffer): Key {
    const result = this._writeNewKey(key);

    l.debug(() => ['writeNewKey', '=>', { result }]);

    return result;
  }

  private _writeNewBranch (branch: Buffer, branchAt: number, entryIndex: number, key: NibbleBuffer, prevAt: number, prevValue: NibbleBuffer, matchIndex: number, depth: number): Key {
    l.debug(() => ['writeNewBranch', { branch, branchAt, entryIndex, key, prevValue, matchIndex, depth }]);

    const { keyAt, keyValue } = this.writeNewKey(key);
    const newBranch = Buffer.alloc(BRANCH_SIZE);
    const keyIndex = ENTRY_SIZE * key.nibbles[matchIndex];
    const prevIndex = ENTRY_SIZE * prevValue.nibbles[matchIndex];
    const stats = fs.fstatSync(this._fd);
    const newBranchAt = stats.size;

    newBranch.set([Slot.LEAF], keyIndex);
    newBranch.writeUIntBE(keyAt, keyIndex + 1, UINT_SIZE);
    newBranch.set([Slot.LEAF], prevIndex);
    newBranch.writeUIntBE(prevAt, prevIndex + 1, UINT_SIZE);

    fs.writeSync(this._fd, branch, 0, BRANCH_SIZE, newBranchAt);
    this._cacheBranch(newBranchAt, newBranch);

    let intermediateAt = newBranchAt;

    for (let offset = 1; depth > 0; depth--, offset++) {
      const intermediate = Buffer.alloc(BRANCH_SIZE);
      const intermediateIndex = key.nibbles[matchIndex - offset] * ENTRY_SIZE;
      const stats = fs.fstatSync(this._fd);

      intermediate.set([Slot.BRANCH], intermediateIndex);
      intermediate.writeUIntBE(intermediateAt, intermediateIndex + 1, UINT_SIZE);
      intermediateAt = stats.size;

      fs.writeSync(this._fd, intermediate, 0, BRANCH_SIZE, intermediateAt);
      this._cacheBranch(intermediateAt, intermediate);
    }

    branch.set([Slot.BRANCH], entryIndex);
    branch.writeUIntBE(intermediateAt, entryIndex + 1, UINT_SIZE);
    fs.writeSync(this._fd, branch, entryIndex, ENTRY_SIZE, branchAt + entryIndex);

    return {
      key,
      keyAt,
      keyValue
    };
  }

  private writeNewBranch (branch: Buffer, branchAt: number, entryIndex: number, key: NibbleBuffer, prevAt: number, prevValue: NibbleBuffer, matchIndex: number, depth: number): Key {
    const result = this._writeNewBranch(branch, branchAt, entryIndex, key, prevAt, prevValue, matchIndex, depth);

    l.debug(() => ['writeNewBranch', '=>', { result }]);

    return result;
  }

  private _writeNewLeaf (branch: Buffer, branchAt: number, entryIndex: number, key: NibbleBuffer): Key {
    l.debug(() => ['writeNewLeaf', { branch, branchAt, entryIndex, key }]);

    const { keyAt, keyValue } = this.writeNewKey(key);

    branch.set([Slot.LEAF], entryIndex);
    branch.writeUIntBE(keyAt, entryIndex + 1, UINT_SIZE);

    fs.writeSync(this._fd, branch, entryIndex, ENTRY_SIZE, branchAt + entryIndex);

    return {
      key,
      keyAt,
      keyValue
    };
  }

  private writeNewLeaf (branch: Buffer, branchAt: number, entryIndex: number, key: NibbleBuffer): Key {
    const result = this._writeNewLeaf(branch, branchAt, entryIndex, key);

    l.debug(() => ['writeNewLeaf', '=>', { result }]);

    return result;
  }

  private assertOpen (): void {
    assert(this._fd !== -1, 'Expected an open database');
  }

  private _open (file: string, startEmpty: boolean = false): number {
    if (!fs.existsSync(file) || startEmpty) {
      fs.writeFileSync(file, Buffer.alloc(BRANCH_SIZE));
    }

    return fs.openSync(file, 'a+');
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
    const header = Buffer.alloc(BRANCH_SIZE);

    fs.writeSync(fd, header, 0, BRANCH_SIZE, headerAt);

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
}
