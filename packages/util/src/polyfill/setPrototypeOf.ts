/* eslint-disable @typescript-eslint/unbound-method */
// Copyright 2017-2020 @polkadot/util authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

// React Native does not have Object.setPrototypeOf
if (!Object.setPrototypeOf) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.setPrototypeOf = function (obj: any, proto: object | null): void {
    // eslint-disable-next-line no-proto
    obj.__proto__ = proto;

    return obj;
  };
}
