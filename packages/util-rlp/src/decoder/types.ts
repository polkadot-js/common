// Copyright 2017-2020 @polkadot/util-rlp authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

export interface DecodeOutput {
  decoded: Uint8Array | (Uint8Array | Uint8Array[])[];
  remainder: Uint8Array;
}

export type DecodeFunc = (input: Uint8Array) => DecodeOutput;
