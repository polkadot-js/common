// Copyright 2017-2018 @polkadot/util-rlp authors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export type DecodeOutput = {
  // flowlint-next-line unclear-type:off
  decoded: Uint8Array | Array<any>,
  remainder: Uint8Array
}

export type DecodeFunc = (input: Uint8Array) => DecodeOutput;
