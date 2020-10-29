// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/keyring(.*)$': '<rootDir>/packages/keyring/src/$1',
    '@polkadot/networks(.*)$': '<rootDir>/packages/networks/src/$1',
    '@polkadot/util-(crypto)(.*)$': '<rootDir>/packages/util-$1/src/$2',
    // eslint-disable-next-line sort-keys
    '@polkadot/util(.*)$': '<rootDir>/packages/util/src/$1',
    '@polkadot/x-(fetch|textdecoder|textencoder|ws)(.*)$': '<rootDir>/packages/util-$1/src/$2'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/keyring/build',
    '<rootDir>/packages/networks/build',
    '<rootDir>/packages/util/build',
    '<rootDir>/packages/util-crypto/build',
    '<rootDir>/packages/x-fetch/build',
    '<rootDir>/packages/x-textdecoder/build',
    '<rootDir>/packages/x-textencoder/build',
    '<rootDir>/packages/x-ews/build'
  ],
  resolver: '@polkadot/dev/config/jest-resolver'
});
