// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import rlpEncode from '@polkadot/util-rlp/encode';

import asNibbles from './util/asNibbles';
import genRoot from './util/genRoot';
import pairsUniq from './util/pairsUniq';

/**
  @name trieRootOrdered
  @signature trieRootOrdered (values: Array<Uint8Array>): Uint8Array
  @summary Creates a trie hash from the supplied values.
  @description
    From an `Array<Uint8Array>` input, calculate the ordered triehash and return the result as a `Uint8Array`.
  @example
    import { u8aFromString } from '@polkadot/util';
    import { trieRootOrdered } from '@polkadot/trie-hash';

    trieRootOrdered([
      u8aFromString('doe'),
      u8aFromString('reindeer')
    ]) // => 0xe766d5d51b89dc39d981b41bda63248d7abce4f0225eefd023792a540bcffee3
*/
export default function trieRootOrdered (values: Array<Uint8Array>): Uint8Array {
  return genRoot(
    pairsUniq(
      values.map((v, index) => ({
        k: asNibbles(
          rlpEncode(index)
        ),
        v
      }))
    )
  );
}
