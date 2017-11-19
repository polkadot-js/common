// ISC, Copyright 2017 Jaco Greeff
// @flow

const hasPrefix = require('./hasPrefix');

module.exports = function stripPrefix (value: ?string): string {
  if (value && hasPrefix(value)) {
    return value.substr(2);
  }

  return value || '';
};
