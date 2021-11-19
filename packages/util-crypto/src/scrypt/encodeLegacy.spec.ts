// Copyright 2017-2021 @polkadot/util-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { waitReady } from '@polkadot/wasm-crypto';

import { DEFAULT_PARAMS } from './defaults';
import { KNOWN_PASS, KNOWN_SALT, KNOWN_TEST } from './encode.spec';
import { scryptEncode } from './encodeLegacy';

describe('scryptEncode (legacy)', (): void => {
  beforeEach(async (): Promise<void> => {
    await waitReady();
  });

  describe.each([false, true])('onlyJs=%p', (onlyJs): void => {
    it('generates a known output', (): void => {
      expect(
        scryptEncode(KNOWN_TEST, KNOWN_SALT, undefined, onlyJs)
      ).toEqual({
        params: DEFAULT_PARAMS,
        password: KNOWN_PASS,
        salt: KNOWN_SALT
      });
    });
  });
});
