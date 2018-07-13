// Copyright 2017-2018 @polkadot/primitives authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import BN from 'bn.js';

interface PrimitiveEncoder <S = Uint8Array> {
  encode (): S;
  toJSON (): any;
}

interface PrivitiveDecoder <C extends PrimitiveBase<any, S>, S = Uint8Array> {
  decode (input: S): C;
  fromJSON (input: any): C;
}

interface PrimitiveBase <T, S = Uint8Array> extends PrimitiveEncoder<S> {
  value: T;
}

export interface AccountIndex extends PrimitiveBase<BN> {}
export interface AccountIndexDecoder extends PrivitiveDecoder<AccountIndex> {}
