// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const bufferFromHex = require('../hex/toBuffer');

/**
  @name bufferFromHex
  @signature bufferFromHex (value?: string): Buffer
  @summary Creates a Buffer object from a hex string.
  @alias hex/toBuffer
*/
module.exports = bufferFromHex;
