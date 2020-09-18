// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

const base = require('@polkadot/dev/config/eslint');

module.exports = {
  ...base,
  parserOptions: {
    ...base.parserOptions,
    project: [
      './tsconfig.json'
    ]
  },
  rules: {
    ...base.rules,
    // this seems very broken atm, false positives
    '@typescript-eslint/unbound-method': 'off'
  }
};
