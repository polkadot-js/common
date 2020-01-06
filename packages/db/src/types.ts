// Copyright 2017-2020 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export interface ProgressValue {
  isCompleted?: boolean;
  keys: number;
  percent: number;
}

export type ProgressCb = (progress: ProgressValue) => void;

export interface BaseDbOptions {
  isCompressed?: boolean;
  isLru?: boolean;
  isNative?: boolean;
}

export interface BaseDb {
  close (): void;
  open (): void;
  drop (): void;
  empty (): void;
  maintain (fn: ProgressCb): void;
  rename (base: string, file: string): void;
  size (): number;

  txCommit?: () => void;
  txRevert?: () => void;
  txStart?: () => void;

  del (key: Uint8Array): void;
  get (key: Uint8Array): Uint8Array | null;
  put (key: Uint8Array, value: Uint8Array): void;
}

export interface TxDb extends BaseDb {
  transaction <T> (fn: () => T): T;
}
