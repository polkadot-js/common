// Copyright 2017-2018 @polkadot/trie-root authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { stream } from '@polkadot/trie-codec/index';

export default function buildTrie (input: Array<[Uint8Array, Uint8Array]>, cursor: number = 0): Uint8Array {
  console.error('buildTrie', input);

  if (input.length === 0) {
    return stream.createEmpty();
  } else if (input.length === 1) {
    const [k, v] = input[0];

    return stream.createLeaf(k.subarray(cursor), v);
  }

  throw new Error('invalid');
}

    // let (key, value) = (&input[0].0.as_ref(), input[0].1.as_ref());
    // // Count the number of nibbles in the other elements that are
    // // shared with the first key.
    // // e.g. input = [ [1'7'3'10'12'13], [1'7'3'], [1'7'7'8'9'] ] => [1'7'] is common => 2
    // let shared_nibble_count = input.iter().skip(1).fold(key.len(), |acc, &(ref k, _)| {
    //   cmp::min( shared_prefix_len(key, k.as_ref()), acc )
    // });
    // // Add an extension node if the number of shared nibbles is greater
    // // than what we saw on the last call (`cursor`): append the new part
    // // of the path then recursively append the remainder of all items
    // // who had this partial key.
    // if shared_nibble_count > cursor {
    //   // println!("[build_trie] appending ext and recursing, cursor={}, stream={:?}, partial key={:?}", cursor, stream.as_raw(), &key[cursor..shared_nibble_count]);
    //   stream.append_extension(&key[cursor..shared_nibble_count]);
    //   build_trie_trampoline::<H, _, _, _>(input, shared_nibble_count, stream);
    //   // println!("[build_trie] returning after recursing, cursor={}, stream={:?}, partial key={:?}", cursor, stream.as_raw(), &key[cursor..shared_nibble_count]);
    //   return;
    // }

    // // We'll be adding a branch node because the path is as long as it gets.
    // // First we need to figure out what entries this branch node will have...

    // // We have a a value for exactly this key. Branch node will have a value
    // // attached to it.
    // let value = if cursor == key.len() { Some(value) } else { None };

    // // We need to know how many keys each of the children account for.
    // let mut shared_nibble_counts = [0usize; 16];
    // {
    //   // Children keys begin at either index 1 or 0, depending on whether we have a value.
    //   let mut begin = match value { None => 0, _ => 1 };
    //   for i in 0..16 {
    //     shared_nibble_counts[i] = input[begin..].iter()
    //       .take_while(|(k, _)| k.as_ref()[cursor] == i as u8)
    //       .count();
    //     begin += shared_nibble_counts[i];
    //   }
    // }

    // // Put out the node header:
    // stream.begin_branch(value, shared_nibble_counts.iter().map(|&n| n > 0));

    // // Fill in each slot in the branch node. We don't need to bother with empty slots since they
    // // were registered in the header.
    // let mut begin = match value { None => 0, _ => 1 };
    // for &count in &shared_nibble_counts {
    //   if count > 0 {
    //     // println!("[build_trie] branch slot {}; recursing with cursor={}, begin={}, shared nibbles={}, input={:?}", i, cursor, begin, shared_nibble_count, &input[begin..(begin + shared_nibble_count)]);
    //     build_trie_trampoline::<H, S, _, _>(&input[begin..(begin + count)], cursor + 1, stream);
    //     begin += count;
    //   } else {
    //     stream.append_empty_child();
    //   }
    // }

    // // println!("[build_trie] branch slot 17; cursor={}, appending value {:?}", cursor, value);
    // stream.end_branch(value);

    // // println!("[build_trie] ending branch node, cursor={}, stream={:?}", cursor, stream.as_raw());
