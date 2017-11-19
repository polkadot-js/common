// ISC, Copyright 2017 Jaco Greeff
// @flow

function isFunction (value: any): boolean {
  return typeof value === 'function';
}

function isHex (value: any): boolean {
  return isString(value) && /^0x[a-fA-F0-9]+$/.test(value);
}

function isInstanceOf (value: any, clazz: any): boolean {
  return value instanceof clazz;
}

function isNumber (value: any): boolean {
  return typeof value === 'number';
}

function isString (value: any): boolean {
  return typeof value === 'string';
}

function isUndefined (value: any): boolean {
  return typeof value === 'undefined';
}

module.exports = {
  isFunction,
  isHex,
  isInstanceOf,
  isNumber,
  isString,
  isUndefined
};
