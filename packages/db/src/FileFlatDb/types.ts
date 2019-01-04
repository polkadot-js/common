// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export enum Slot {
  EMPTY = 0,
  BRANCH = 1,
  LEAF = 2
}

export type NibbleBuffer = {
  buffer: Buffer,
  nibbles: Uint8Array
};

export type Key = {
  key: NibbleBuffer,
  keyAt: number,
  keyValue: Buffer
};

export type Value = {
  value: Buffer,
  valueAt: number
};
