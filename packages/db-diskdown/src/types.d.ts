// Copyright 2017-2018 @polkadot/db-diskdown authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

export type ProgressValue = {
  depth: number,
  keys: number,
  percent: number
};

export interface DiskStore {
  close (): void;
  compact (progress: (value: ProgressValue) => void): void,
  delete (key: Buffer): void;
  get (key: Buffer): Buffer | undefined;
  open (): void,
  set (key: Buffer, value: Buffer): void;
}
