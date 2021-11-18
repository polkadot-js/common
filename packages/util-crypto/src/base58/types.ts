// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

export interface BaseConverter {
  encode (buffer: Uint8Array): string;
  decode (string: string): Uint8Array;
}
