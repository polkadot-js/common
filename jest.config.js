const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/chainspec(.*)$': '<rootDir>/packages/chainspec/src/$1',
    '@polkadot/db(.*)$': '<rootDir>/packages/db/src/$1',
    '@polkadot/keyring(.*)$': '<rootDir>/packages/keyring/src/$1',
    '@polkadot/trie-(codec|db|hash)(.*)$': '<rootDir>/packages/trie-$1/src/$2',
    '@polkadot/util-(crypto|rlp)(.*)$': '<rootDir>/packages/util-$1/src/$2',
    '@polkadot/util(.*)$': '<rootDir>/packages/util/src/$1'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/db/build',
    '<rootDir>/packages/chainspec/build',
    '<rootDir>/packages/keyring/build',
    '<rootDir>/packages/trie-codec/build',
    '<rootDir>/packages/trie-db/build',
    '<rootDir>/packages/trie-hash/build',
    '<rootDir>/packages/util/build',
    '<rootDir>/packages/util-crypto/build',
    '<rootDir>/packages/util-rlp/build'
  ]
});
