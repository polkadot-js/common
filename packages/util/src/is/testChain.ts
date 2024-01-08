// Copyright 2017-2024 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

const REGEX_DEV = /(Development|Local Testnet)$/;

export function isTestChain (chain?: string | null): boolean {
  if (!chain) {
    return false;
  }

  return !!REGEX_DEV.test(chain.toString());
}
