// Copyright 2017-2021 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

const config = require('@polkadot/dev/config/jest.cjs');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/hw-ledger-transports(.*)$': '<rootDir>/packages/hw-ledger-transports/src/node',
    // eslint-disable-next-line sort-keys
    '@polkadot/hw-ledger(.*)$': '<rootDir>/packages/hw-ledger/src/$1',
    '@polkadot/keyring(.*)$': '<rootDir>/packages/keyring/src/$1',
    '@polkadot/networks(.*)$': '<rootDir>/packages/networks/src/$1',
    '@polkadot/util-(crypto)(.*)$': '<rootDir>/packages/util-$1/src/$2',
    // eslint-disable-next-line sort-keys
    '@polkadot/util(.*)$': '<rootDir>/packages/util/src/$1',
    '@polkadot/x-(fetch|randomvalues|textdecoder|textencoder|ws)(.*)$': '<rootDir>/packages/x-$1/src/node'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/hw-ledger/build',
    '<rootDir>/packages/hw-ledger-transports/build',
    '<rootDir>/packages/keyring/build',
    '<rootDir>/packages/networks/build',
    '<rootDir>/packages/util/build',
    '<rootDir>/packages/util-crypto/build',
    '<rootDir>/packages/x-fetch/build',
    '<rootDir>/packages/x-randomvalues/build',
    '<rootDir>/packages/x-rxjs/build',
    '<rootDir>/packages/x-textdecoder/build',
    '<rootDir>/packages/x-textencoder/build',
    '<rootDir>/packages/x-ws/build'
  ],
  resolver: '@polkadot/dev/config/jest-resolver.cjs'
});
