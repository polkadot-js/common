// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

export type DecodeOutput = {
  decoded: Uint8Array | Array<*>,
  remainder: Uint8Array
}

export type DecodeFunc = (input: Uint8Array) => DecodeOutput;
