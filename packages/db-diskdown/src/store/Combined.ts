// Copyright 2017-2018 @polkadot/db-diskdown authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { DiskStore } from '../types';

import fs from 'fs';
import logger from '@polkadot/util/logger';

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

const UINT_SIZE = 6; // 48-bit, the max Node supports
const KEY_SIZE = 32;
const KEY_TOTAL_SIZE = KEY_SIZE + UINT_SIZE + UINT_SIZE;
const ENTRY_SIZE = 1 + UINT_SIZE;
const HEADER_SIZE = 10 * ENTRY_SIZE;

const l = logger('disk/combined');

function debug (obj: any) {
  return JSON.stringify(
    !obj
      ? obj
      : Object.keys(obj).reduce((result, key) => {
        result[key] = Buffer.isBuffer(obj[key])
          ? obj[key].toString('hex')
          : obj[key];

        return result;
      }, {} as any)
  );
}

export default class StoreCombined implements DiskStore {
  _fd: number;

  constructor (location: string) {
    if (!fs.existsSync(location)) {
      throw new Error(`Unable to open ${location}`);
    }

    const file = `${location}/store.db`;

    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, Buffer.alloc(HEADER_SIZE));
    }

    this._fd = fs.openSync(file, 'a+');
  }

  private _readValue (key: Buffer, keyAt: number, keyValue: Buffer): Value {
    l.debug(() => ['readValue', debug({ key, keyAt, keyValue })]);

    const length = keyValue.readUIntBE(KEY_SIZE, UINT_SIZE);
    const valueAt = keyValue.readUIntBE(KEY_SIZE + UINT_SIZE, UINT_SIZE);
    const value = Buffer.alloc(length);

    fs.readSync(this._fd, value, 0, length, valueAt);

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

    l.debug(() => ['readValue', '=>', debug(result)]);

    return result;
  }

  private _writeValue (key: Buffer, keyAt: number, keyValue: Buffer, value: Buffer): Value {
    l.debug(() => ['writeValue', debug({ keyAt, keyValue, value })]);

    const stats = fs.fstatSync(this._fd);
    const valueAt = stats.size;

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

    l.debug(() => ['writeValue', '=>', debug(result)]);

    return result;
  }

  private _writeNewKey (key: Buffer): Key {
    l.debug(() => ['writeNewKey', debug({ key })]);

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

    l.debug(() => ['writeNewKey', '=>', debug(result)]);

    return result;
  }

  private _writeNewBranch (entry: Buffer, entryAt: number, key: Buffer, prevAt: number, prevValue: Buffer, matchIndex: number, depth: number): Branch {
    l.debug(() => ['writeNewBranch', debug({ entry, entryAt, key, prevValue, matchIndex, depth })]);

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

    l.debug(() => ['writeNewBranch', '=>', debug(result)]);

    return result;
  }

  private _writeNewLeaf (entry: Buffer, entryAt: number, key: Buffer): Leaf {
    l.debug(() => ['writeNewLeaf', debug({ entry, entryAt, key })]);

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

    l.debug(() => ['writeNewLeaf', '=>', debug(result)]);

    return result;
  }

  private _findKey (key: Buffer, doCreate: boolean, keyIndex: number, diskAt: number): Leaf | null {
    const entry = Buffer.alloc(ENTRY_SIZE);
    const entryAt = diskAt + (key[keyIndex] * ENTRY_SIZE);

    fs.readSync(this._fd, entry, 0, ENTRY_SIZE, entryAt);

    l.debug(() => ['findKey', debug({ key, doCreate, keyIndex, diskAt, entry, entryAt })]);

    const entryType = entry[0];

    if (entryType === Slot.BRANCH) {
      const branchAt = entry.readUIntBE(1, UINT_SIZE);

      l.debug(() => ['findKey/isBranch', debug({ branchAt })]);

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

      l.debug(() => ['findKey/isLeaf', debug({ keyAt, entry, keyValue })]);

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

    throw new Error(`Unhandled entry type ${entry[0]}`);
  }

  private findKey (key: Buffer, doCreate: boolean): Leaf | null {
    const result = this._findKey(key, doCreate, 0, 0);

    l.debug(() => ['findKey', '=>', debug(result)]);

    return result;
  }

  delete (key: Buffer): void {
    throw new Error('delete not implemented, only stubbed');

    // l.debug(() => ['del', debug({ key })]);

    // const desc = this.findKey(key, false);

    // if (desc) {
    //   desc.entry.set([Slot.EMPTY], 0);

    //   fs.writeSync(this._fd, desc.entry, 0, 1, desc.entryAt);
    // }
  }

  get (key: Buffer): Buffer | undefined {
    l.debug(() => ['get', debug({ key })]);

    const desc = this.findKey(key, false);

    if (!desc) {
      return;
    }

    return this.readValue(desc).value;
  }

  set (key: Buffer, value: Buffer): void {
    l.debug(() => ['set', debug({ key, value })]);

    const desc = this.findKey(key, true);

    if (!desc) {
      throw new Error('Unable to create key');
    }

    this.writeValue(desc, value);
  }
}
