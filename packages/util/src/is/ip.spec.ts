// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

/// <reference types="@polkadot/dev-test/globals.d.ts" />

import { isIp } from './index.js';

describe('isIp', (): void => {
  it('returns false when non-ip found', (): void => {
    expect(
      isIp('not.an.ip.1')
    ).toEqual(false);
  });

  it('returns true on IPv4 addresses', (): void => {
    expect(
      isIp('192.168.0.1')
    ).toEqual(true);
  });

  it('returns true on IPv4 addresses (IPV4 type)', (): void => {
    expect(
      isIp('192.168.0.1', 'v4')
    ).toEqual(true);
  });

  it('returns false on IPv4 addresses (IPv6 type)', (): void => {
    expect(
      isIp('192.168.0.1', 'v6')
    ).toEqual(false);
  });

  it('returns true on IPv6 addresses', (): void => {
    expect(
      isIp('1:2:3:4:5:6:7:8')
    ).toEqual(true);
  });

  it('returns true on IPv6 addresses (IPv6 type)', (): void => {
    expect(
      isIp('1:2:3:4:5:6:7:8', 'v6')
    ).toEqual(true);
  });

  it('returns false on IPv6 addresses (IPv4 type)', (): void => {
    expect(
      isIp('1:2:3:4:5:6:7:8', 'v4')
    ).toEqual(false);
  });
});
