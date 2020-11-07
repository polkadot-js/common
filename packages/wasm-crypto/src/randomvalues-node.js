// Copyright 2019-2020 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

const crypto = require('crypto');

module.exports = function getRandomValues (arr) {
  return crypto.randomBytes(arr.length).reduce((arr, value, index) => {
    arr[index] = value;

    return arr;
  }, arr);
};
