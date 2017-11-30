// ISC, Copyright 2017 Jaco Greeff
// @flow

const hexFromBuffer = require('../bn/toHex');

/**
  @name hexFromBn
  @signature hexFromBuffer (value?: Buffer): string
  @summary Creates a hex value from a Buffer object. [buffer.md#buffertohex](alias bufferToHex)
*/
module.exports = hexFromBuffer;
