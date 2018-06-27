const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/extrinsics(.*)$': '<rootDir>/packages/type-extrinsics/src/$1',
    '@polkadot/jsonrpc(.*)$': '<rootDir>/packages/type-jsonrpc/src/$1',
    '@polkadot/params(.*)$': '<rootDir>/packages/type-params/src/$1',
    '@polkadot/primitives(.*)$': '<rootDir>/packages/type-primitives/src/$1',
    '@polkadot/storage(.*)$': '<rootDir>/packages/type-storage/src/$1',

    '@polkadot/trie-(db|hash)(.*)$': '<rootDir>/packages/trie-$1/src/$2',
    '@polkadot/util-(crypto|keyring|rlp)(.*)$': '<rootDir>/packages/util-$1/src/$2',
    '@polkadot/util(.*)$': '<rootDir>/packages/util/src/$1'
  }
});
