// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Key, NibbleBuffer, Slot, Value } from './types';

import fs from 'fs';
import { logger } from '@polkadot/util/index';

import Cache from './Cache';
import defaults from './defaults';

const l = logger('db/flat');

export default class Impl extends Cache {
  protected _getKeyValue (keyAt: number): Buffer {
    return this._getCachedData(keyAt, defaults.KEY_TOTAL_SIZE);
  }

  protected _retrieveBranch (doCreate: boolean, branch: Buffer, entryIndex: number, keyIndex: number, key: NibbleBuffer): Key | null {
    const nextBranchAt = branch.readUIntBE(entryIndex + 1, defaults.UINT_SIZE);

    l.debug(() => ['findKey/isBranch', { nextBranchAt }]);

    return this._findKey(key, doCreate, keyIndex + 1, nextBranchAt);
  }

  protected _retrieveEmpty (doCreate: boolean, branch: Buffer, branchAt: number, entryIndex: number, key: NibbleBuffer): Key | null {
    l.debug(() => ['findKey/isEmpty']);

    return doCreate
      ? this.writeNewLeaf(branch, branchAt, entryIndex, key)
      : null;
  }

  protected _retrieveLeaf (doCreate: boolean, branch: Buffer, branchAt: number, entryIndex: number, keyIndex: number, key: NibbleBuffer): Key | null {
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

  protected _findKey (key: NibbleBuffer, doCreate: boolean, keyIndex: number, branchAt: number): Key | null {
    const entryIndex = key.nibbles[keyIndex] * defaults.ENTRY_SIZE;
    const branch = this._getCachedBranch(branchAt);

    l.debug(() => ['findKey', { key, doCreate, keyIndex, branchAt, branch, entryIndex }]);

    const entryType = branch[entryIndex];

    switch (entryType) {
      case Slot.BRANCH:
        return this._retrieveBranch(doCreate, branch, entryIndex, keyIndex, key);

      case Slot.EMPTY:
        return this._retrieveEmpty(doCreate, branch, branchAt, entryIndex, key);

      case Slot.LEAF:
        return this._retrieveLeaf(doCreate, branch, branchAt, entryIndex, keyIndex, key);

      default:
        throw new Error(`Unhandled entry type ${entryType}`);
    }
  }

  protected _extractValueInfo (keyValue: Buffer): { valueAt: number, valueLength: number } {
    return {
      valueLength: keyValue.readUIntBE(defaults.KEY_SIZE, defaults.UINT_SIZE),
      valueAt: keyValue.readUIntBE(defaults.KEY_SIZE + defaults.UINT_SIZE, defaults.UINT_SIZE)
    };
  }

  protected _readValue (keyValue: Buffer): Value {
    l.debug(() => ['readValue', { keyValue }]);

    const { valueAt, valueLength } = this._extractValueInfo(keyValue);
    const value = this._getCachedData(valueAt, valueLength);

    return {
      value,
      valueAt
    };
  }

  protected _writeValue (keyAt: number, keyValue: Buffer, value: Buffer): Value {
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

  protected _writeNewKey (key: NibbleBuffer): Key {
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

  protected writeNewKey (key: NibbleBuffer): Key {
    const result = this._writeNewKey(key);

    l.debug(() => ['writeNewKey', '=>', { result }]);

    return result;
  }

  protected _writeNewBranch (branch: Buffer, branchAt: number, entryIndex: number, key: NibbleBuffer, prevAt: number, prevKey: NibbleBuffer, matchIndex: number, depth: number): Key {
    l.debug(() => ['writeNewBranch', { branch, branchAt, entryIndex, key, prevAt, prevKey, matchIndex, depth }]);

    const { keyAt, keyValue } = this.writeNewKey(key);
    const keyIndex = key.nibbles[matchIndex] * defaults.ENTRY_SIZE;
    const prevIndex = prevKey.nibbles[matchIndex] * defaults.ENTRY_SIZE;
    const buffers: Array<Buffer> = [];
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

  protected writeNewBranch (branch: Buffer, branchAt: number, entryIndex: number, key: NibbleBuffer, prevAt: number, prevValue: NibbleBuffer, matchIndex: number, depth: number): Key {
    const result = this._writeNewBranch(branch, branchAt, entryIndex, key, prevAt, prevValue, matchIndex, depth);

    l.debug(() => ['writeNewBranch', '=>', { result }]);

    return result;
  }

  protected _writeNewLeaf (branch: Buffer, branchAt: number, entryIndex: number, key: NibbleBuffer): Key {
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

  protected writeNewLeaf (branch: Buffer, branchAt: number, entryIndex: number, key: NibbleBuffer): Key {
    const result = this._writeNewLeaf(branch, branchAt, entryIndex, key);

    l.debug(() => ['writeNewLeaf', '=>', { result }]);

    return result;
  }

  protected _writeUpdatedBuffer (buffer: Buffer, bufferAt: number): number {
    fs.writeSync(this._fd, buffer, 0, buffer.length, bufferAt);
    this._cacheData(bufferAt, buffer);

    return bufferAt;
  }

  protected _writeNewBuffer (buffer: Buffer, withCache: boolean = true): number {
    const startAt = this._fileSize;

    fs.writeSync(this._fd, buffer, 0, buffer.length, startAt);

    if (withCache) {
      this._cacheData(startAt, buffer);
    }

    this._fileSize += buffer.length;

    return startAt;
  }

  protected _writeNewBuffers (buffers: Array<Buffer>): number {
    let bufferAt = this._fileSize;

    buffers.forEach((buffer) => {
      this._cacheData(bufferAt, buffer);
      bufferAt += buffer.length;
    });

    return this._writeNewBuffer(Buffer.concat(buffers), false);
  }
}
