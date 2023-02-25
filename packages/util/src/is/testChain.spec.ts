// Copyright 2017-2023 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

// eslint-disable-next-line spaced-comment
/// <reference types="@polkadot/dev/node/test/node" />

import { isTestChain } from '.';

describe('isTestChain', (): void => {
  it('enables test environment when chain specification matches text of dev or loc(al)', (): void => {
    const validTestModeChainSpecsWithDev = ['Development'];
    const validTestModeChainSpecsWithLoc = ['Local Testnet'];

    validTestModeChainSpecsWithDev.concat(validTestModeChainSpecsWithLoc).forEach((s): void => {
      expect(isTestChain(s)).toEqual(true);
    });
  });

  it('disables keyring test mode when chain specification is not a test mode or undefined or number type', (): void => {
    const invalidTestModeChainSpecs = ['dev', 'local', 'development', 'PoC-1 Testnet', 'Staging Testnet', 'future PoC-2 Testnet', 'a pocadot?', undefined];

    invalidTestModeChainSpecs.forEach((s): void => {
      expect(isTestChain(s)).toEqual(false);
    });
  });
});
