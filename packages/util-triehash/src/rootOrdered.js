// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

const bufferToU8a = require('@polkadot/util/buffer/toU8a');
const rlp = require('rlp');

const asNibbles = require('./util/asNibbles');
const genRoot = require('./util/genRoot');
const pairsUniq = require('./util/pairsUniq');

/**
  @name trieRootOrdered
  @signature trieRootOrdered (pvalues: Array<Uint8Array>): Uint8Array
  @summary Creates a trie hash from the supplied values.
  @description
    From an `Array<Uint8Array>` input, calculate the ordered triehash and return the result as a `Uint8Array`.
  @example
    import { u8aFromString } from '@polkadot/util';
    import { trieRootOrdered } from '@polkadot/util-triehash';

    trieRootOrdered([
      u8aFromString('doe'),
      u8aFromString('reindeer')
    ]) // => 0xe766d5d51b89dc39d981b41bda63248d7abce4f0225eefd023792a540bcffee3
*/
module.exports = function trieRootOrdered (values: Array<Uint8Array>): Uint8Array {
  return genRoot(
    pairsUniq(
      values.map((v, index) => ({
        k: asNibbles(
          bufferToU8a(
            // $FlowFixMe rlp type definition is lacking
            rlp.encode(index)
          )
        ),
        v
      }))
    )
  );
};
