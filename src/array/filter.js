// ISC, Copyright 2017 Jaco Greeff
// @flow

const assert = require('../assert');
const isNull = require('../is/null');
const isUndefined = require('../is/undefined');

/**
  @name arrayFilter
  @signature arrayFilter (array: Array<any>, allowNulls: boolean = true): Array<any>
  @summary Filters undefined and (optionally) null values from an array
  @description
    Returns a new array with all `undefined` values removed. Optionally, when `allowNulls = false`, it removes the `null` values as well
  @example
    import { arrayFilter } from '@polkadot/util';

    arrayFilter([0, void 0, true, null, false, '']); // [0, true, null, false, '']
    arrayFilter([0, void 0, true, null, false, ''], false); // [0, true, false, '']
*/
module.exports = function arrayFilter (array: Array<any>, allowNulls: boolean = true): Array<any> {
  assert(Array.isArray(array), `Expected Array input value, received '${(array: any)}'`);

  return array.filter((value) => {
    return !isUndefined(value) && (allowNulls || !isNull(value));
  });
};
