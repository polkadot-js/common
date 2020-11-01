// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

const re = /(Development|Local Testnet)$/;

export default function isTestChain (chain?: string | null): boolean {
  if (!chain) {
    return false;
  }

  return !!re.test(chain.toString());
}
