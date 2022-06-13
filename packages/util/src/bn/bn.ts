// Copyright 2017-2022 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BN as BNjs } from 'bn.js';

/**
 * @name BN
 * @description
 * Wrapper class - this allows us to get the typings correct, ala
 * the bn.js import is _slightly_ weird between the class/namespace

 * In this case we want to ensure it works the same way as with
 * esModuleInterop, i.e. the type `BN` is allowed and the `new BN(...)`
 * works as expected in all cases (returning something of type BN)
 */
export class BN extends BNjs {
  // since we have no additional interfaces, these 2 are equivalent
}
