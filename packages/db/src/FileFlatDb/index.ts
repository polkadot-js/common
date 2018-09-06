// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { BaseDb, BaseDbOptions, ProgressCb } from '../types';
import { Key, NibbleBuffer, Slot, Value } from './types';

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

import Compact from './Compact';
import defaults from './defaults';

const LRU_BRANCH_COUNT = 16384; // * 96 = bytes
const LRU_DATA_COUNT = 8192;

const l = logger('db/flat');

export default class FileFlatDb implements BaseDb {
  private _fd: number;
  private _fileSize: number = 0;
  private _file: string;
  private _isCompressed: boolean;
  private _lruBranch: LRUMap<number, Buffer>;
  private _lruData: LRUMap<number, Buffer>;

  constructor (base: string, file: string = defaults.DEFAULT_FILE, options: BaseDbOptions = {}) {
    this._fd = -1;
    this._file = path.join(base, file);
    this._lruBranch = new LRUMap(LRU_BRANCH_COUNT);
    this._lruData = new LRUMap(LRU_DATA_COUNT);
    this._isCompressed = options && !isUndefined(options.isCompressed)
      ? options.isCompressed
      : false;

    mkdirp.sync(base);
  }

  open (): void {
    this._fd = this._open(this._file);
    this._fileSize = fs.fstatSync(this._fd).size;

    this._lruBranch.clear();
    this._lruData.clear();
  }

  close (): void {
    this.assertOpen();

    fs.closeSync(this._fd);

    this._lruBranch.clear();
    this._lruData.clear();
  }

  empty (): void {
    this.close();

    this._fd = this._open(this._file, true);
    this._fileSize = fs.fstatSync(this._fd).size;
  }

  maintain (fn: ProgressCb): void {
    assert(this._fd === -1, 'Database cannot be open for compacting');

    const compactor = new Compact(this._file);

    compactor.maintain(fn);
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
    if (u8a.length > defaults.KEY_SIZE) {
      throw new Error(`${u8aToHex(u8a)} too large, expected <= 32 bytes`);
    }

    let buffer;

    if (u8a.length === defaults.KEY_SIZE) {
      buffer = u8aToBuffer(u8a);
    } else {
      buffer = Buffer.alloc(defaults.KEY_SIZE);

      buffer.set(u8a, 0);
    }

    return {
      buffer,
      nibbles: asNibbles(u8a)
    };
  }

  private _cacheBranch (branchAt: number, branch: Buffer): void {
    this._lruBranch.set(branchAt, branch);
  }

  private _cacheData (dataAt: number, data: Buffer): void {
    this._lruData.set(dataAt, data);
  }

  private _getCachedBranch (branchAt: number): Buffer {
    let branch = this._lruBranch.get(branchAt);

    if (!branch) {
      branch = Buffer.alloc(defaults.BRANCH_SIZE);

      fs.readSync(this._fd, branch, 0, defaults.BRANCH_SIZE, branchAt);
      this._cacheBranch(branchAt, branch);
    }

    return branch;
  }

  private _getCachedData (dataAt: number, length: number): Buffer {
    let data = this._lruData.get(dataAt);

    if (!data) {
      data = Buffer.alloc(length);

      fs.readSync(this._fd, data, 0, length, dataAt);
      this._cacheData(dataAt, data);
    }

    return data;
  }

  private _getKeyValue (keyAt: number): Buffer {
    return this._getCachedData(keyAt, defaults.KEY_TOTAL_SIZE);
  }

  private _findKey (key: NibbleBuffer, doCreate: boolean, keyIndex: number, branchAt: number): Key | null {
    const entryIndex = key.nibbles[keyIndex] * defaults.ENTRY_SIZE;
    const branch = this._getCachedBranch(branchAt);

    l.debug(() => ['findKey', { key, doCreate, keyIndex, branchAt, branch, entryIndex }]);

    const entryType = branch[entryIndex];

    if (entryType === Slot.BRANCH) {
      const nextBranchAt = branch.readUIntBE(entryIndex + 1, defaults.UINT_SIZE);

      l.debug(() => ['findKey/isBranch', { nextBranchAt }]);

      return this._findKey(key, doCreate, keyIndex + 1, nextBranchAt);
    }

    if (entryType === Slot.EMPTY) {
      l.debug(() => ['findKey/isEmpty']);

      return doCreate
        ? this.writeNewLeaf(branch, branchAt, entryIndex, key)
        : null;
    }

    if (entryType === Slot.LEAF) {
      const keyAt = branch.readUIntBE(entryIndex + 1, defaults.UINT_SIZE);
      const keyValue = this._getKeyValue(keyAt);
      const prevKey = this._serializeKey(keyValue.subarray(0, defaults.KEY_SIZE));
      let matchIndex = keyIndex;

      l.debug(() => ['findKey/isLeaf', { keyAt, branch, branchAt, entryIndex, keyValue }]);

      while (matchIndex < defaults.KEY_SIZE) {
        if (prevKey.nibbles[matchIndex] !== key.nibbles[matchIndex]) {
          break;
        }

        matchIndex++;
      }

      if (matchIndex !== defaults.KEY_SIZE) {
        return doCreate
          ? this.writeNewBranch(branch, branchAt, entryIndex, key, keyAt, prevKey, matchIndex, matchIndex - keyIndex - 1)
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
      valueLength: keyValue.readUIntBE(defaults.KEY_SIZE, defaults.UINT_SIZE),
      valueAt: keyValue.readUIntBE(defaults.KEY_SIZE + defaults.UINT_SIZE, defaults.UINT_SIZE)
    };
  }

  private _readValue (keyValue: Buffer): Value {
    l.debug(() => ['readValue', { keyValue }]);

    const { valueAt, valueLength } = this._extractValueInfo(keyValue);
    const value = this._getCachedData(valueAt, valueLength);

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

    const current = this._extractValueInfo(keyValue);
    const valueAt = value.length > current.valueLength
      ? this._writeNewBuffer(value)
      : this._writeUpdatedBuffer(value, current.valueAt);

    keyValue.writeUIntBE(value.length, defaults.KEY_SIZE, defaults.UINT_SIZE);
    keyValue.writeUIntBE(valueAt, defaults.KEY_SIZE + defaults.UINT_SIZE, defaults.UINT_SIZE);
    fs.writeSync(this._fd, keyValue, defaults.KEY_SIZE, 2 * defaults.UINT_SIZE, keyAt + defaults.KEY_SIZE);

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

    const keyValue = Buffer.alloc(defaults.KEY_TOTAL_SIZE);

    keyValue.set(key.buffer, 0);

    const keyAt = this._writeNewBuffer(keyValue);

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

  private _writeNewBranch (branch: Buffer, branchAt: number, entryIndex: number, key: NibbleBuffer, prevAt: number, prevKey: NibbleBuffer, matchIndex: number, depth: number): Key {
    l.debug(() => ['writeNewBranch', { branch, branchAt, entryIndex, key, prevAt, prevKey, matchIndex, depth }]);

    const { keyAt, keyValue } = this.writeNewKey(key);
    const keyIndex = key.nibbles[matchIndex] * defaults.ENTRY_SIZE;
    const prevIndex = prevKey.nibbles[matchIndex] * defaults.ENTRY_SIZE;
    const buffers = [];
    let newBranchAt = this._fileSize;
    let newBranch = Buffer.alloc(defaults.BRANCH_SIZE);

    newBranch.set([Slot.LEAF], keyIndex);
    newBranch.writeUIntBE(keyAt, keyIndex + 1, defaults.UINT_SIZE);
    newBranch.set([Slot.LEAF], prevIndex);
    newBranch.writeUIntBE(prevAt, prevIndex + 1, defaults.UINT_SIZE);
    buffers.push(newBranch);

    for (let offset = 1; depth > 0; depth--, offset++) {
      const branchIndex = key.nibbles[matchIndex - offset] * defaults.ENTRY_SIZE;

      newBranch = Buffer.alloc(defaults.BRANCH_SIZE);
      newBranch.set([Slot.BRANCH], branchIndex);
      newBranch.writeUIntBE(newBranchAt, branchIndex + 1, defaults.UINT_SIZE);
      buffers.push(newBranch);
      newBranchAt += defaults.BRANCH_SIZE;
    }

    this._writeNewBuffers(buffers);

    branch.set([Slot.BRANCH], entryIndex);
    branch.writeUIntBE(newBranchAt, entryIndex + 1, defaults.UINT_SIZE);
    fs.writeSync(this._fd, branch, entryIndex, defaults.ENTRY_SIZE, branchAt + entryIndex);

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
    branch.writeUIntBE(keyAt, entryIndex + 1, defaults.UINT_SIZE);

    fs.writeSync(this._fd, branch, entryIndex, defaults.ENTRY_SIZE, branchAt + entryIndex);

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

  private _writeUpdatedBuffer (buffer: Buffer, bufferAt: number): number {
    fs.writeSync(this._fd, buffer, 0, buffer.length, bufferAt);
    this._cacheData(bufferAt, buffer);

    return bufferAt;
  }

  private _writeNewBuffer (buffer: Buffer, withCache: boolean = true): number {
    const startAt = this._fileSize;

    fs.writeSync(this._fd, buffer, 0, buffer.length, startAt);

    if (withCache) {
      this._cacheData(startAt, buffer);
    }

    this._fileSize += buffer.length;

    return startAt;
  }

  private _writeNewBuffers (buffers: Array<Buffer>): number {
    let bufferAt = this._fileSize;

    buffers.forEach((buffer) => {
      this._cacheData(bufferAt, buffer);
      bufferAt += buffer.length;
    });

    return this._writeNewBuffer(Buffer.concat(buffers), false);
  }

  private assertOpen (): void {
    assert(this._fd !== -1, 'Expected an open database');
  }

  private _open (file: string, startEmpty: boolean = false): number {
    const isExisting = fs.existsSync(file);

    if (!isExisting || startEmpty) {
      if (isExisting) {
        fs.renameSync(file, `${file}.${Date.now()}`);
      }

      fs.writeFileSync(file, Buffer.alloc(defaults.BRANCH_SIZE));
    }

    return fs.openSync(file, 'a+');
  }
}
