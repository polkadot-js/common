const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/db(.*)$': '<rootDir>/packages/db/src/$1',
    '@polkadot/keyring(.*)$': '<rootDir>/packages/keyring/src/$1',
    '@polkadot/trie-(db-old|db|hash)(.*)$': '<rootDir>/packages/trie-$1/src/$2',
    '@polkadot/util-(crypto|rlp)(.*)$': '<rootDir>/packages/util-$1/src/$2',
    '@polkadot/util(.*)$': '<rootDir>/packages/util/src/$1'
  }
});
