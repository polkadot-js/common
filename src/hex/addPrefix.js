// ISC, Copyright 2017 Jaco Greeff
// @flow

const hasPrefix = require('./hasPrefix');

module.exports = function addPrefix (value: ?string): string {
  if (value && hasPrefix(value)) {
    return value;
  }

  return `0x${value || ''}`;
};
