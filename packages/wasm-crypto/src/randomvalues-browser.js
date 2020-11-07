// Copyright 2019-2020 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

module.exports = function getRandomValues (arr) {
  return crypto.getRandomValues(arr);
};
