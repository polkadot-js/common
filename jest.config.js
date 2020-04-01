// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/keyring(.*)$': '<rootDir>/packages/keyring/src/$1',
    '@polkadot/util-(crypto)(.*)$': '<rootDir>/packages/util-$1/src/$2',
    // eslint-disable-next-line sort-keys
    '@polkadot/util(.*)$': '<rootDir>/packages/util/src/$1'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/keyring/build',
    '<rootDir>/packages/util/build',
    '<rootDir>/packages/util-crypto/build'
  ],
  resolver: './jest.resolver.js'
});
