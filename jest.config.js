const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/db-(diskdown)(.*)$': '<rootDir>/packages/db-$1/src/$2',
    '@polkadot/trie-(db-port|db|hash)(.*)$': '<rootDir>/packages/trie-$1/src/$2',
    '@polkadot/util-(crypto|keyring|rlp)(.*)$': '<rootDir>/packages/util-$1/src/$2',
    '@polkadot/util(.*)$': '<rootDir>/packages/util/src/$1'
  }
});
