// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const blake = require('./blake');
const keccak = require('./keccak');

/**
  @summary Utility methods for this package are split into groups
*/
module.exports = Object.assign(
  {}, blake, keccak
);
