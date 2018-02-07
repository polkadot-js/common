const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@polkadot/util-(crypto|triehash)(.*)$': '<rootDir>/packages/util-$1/src/$2',
    '@polkadot/util(.*)$': '<rootDir>/packages/util/src/$1'
  }
});
