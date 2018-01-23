// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const hexFromBuffer = require('../bn/toHex');

/**
  @name hexFromBn
  @signature hexFromBuffer (value?: Buffer): string
  @summary Creates a hex value from a Buffer object.
  @alias buffer/toHex
*/
module.exports = hexFromBuffer;
