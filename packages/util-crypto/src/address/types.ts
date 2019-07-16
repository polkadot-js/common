// Copyright 2017-2019 @polkadot/util-crypto authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

type PrefixPolkadot = 0;
type PrefixKusama = 2;
type PrefixSubstrate = 42;
type DeprecatedPrefixBBQ = 68;

export type Prefix = PrefixPolkadot | PrefixKusama | PrefixSubstrate | DeprecatedPrefixBBQ;
