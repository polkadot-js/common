// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

// React Native does not have Object.setPrototypeOf
if (!Object.setPrototypeOf) {
  Object.setPrototypeOf = function (obj: Record<string, unknown>, proto: Record<string, unknown> | null): Record<string, unknown> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,no-proto
    obj.__proto__ = proto;

    return obj;
  };
}
