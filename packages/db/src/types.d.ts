// Copyright 2017-2018 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

export type ProgressValue = {
  isCompleted?: boolean,
  keys: number,
  percent: number
};

export type ProgressCb = (progress: ProgressValue) => void;

export interface BaseDb {
  close (): void;
  open (): void;

  maintain (fn: ProgressCb): void;

  del (key: Uint8Array): void;
  get (key: Uint8Array): Uint8Array | null;
  put (key: Uint8Array, value: Uint8Array): void;
}

export interface TxDb <T = any> extends BaseDb {
  transaction (fn: () => boolean): T;
}
