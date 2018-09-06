// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import toU8a from '@polkadot/util/u8a/toU8a';

import Trie from './index';

describe('snapshots (simple)', () => {
  const root = new Uint8Array([43, 119, 232, 84, 123, 197, 94, 42, 149, 34, 124, 147, 159, 159, 157, 103, 149, 45, 225, 233, 112, 160, 23, 224, 145, 11, 229, 16, 176, 144, 175, 243]);
  const snapshot = {
    root,
    kv: [
      {
        key: root,
        value: new Uint8Array([202, 133, 32, 116, 101, 115, 116, 131, 111, 110, 101])
      }
    ]
  };

  it('creates a snapshot of the (relevant) trie data', () => {
    const trie = new Trie();

    trie.put(toU8a('test'), toU8a('one'));
    trie.put(toU8a('test'), toU8a('two'));
    trie.del(toU8a('test'));
    trie.put(toU8a('test'), toU8a('one'));
    trie.put(toU8a('doge'), toU8a('coin'));
    trie.del(toU8a('doge'));

    expect(
      trie.createSnapshot(() => {})
    ).toEqual(snapshot);
  });

  it('restores a snapshot', () => {
    const trie = new Trie();

    trie.restoreSnapshot(snapshot, () => {});

    expect(trie.getRoot()).toEqual(root);
    expect(trie.get(toU8a('test'))).toEqual(toU8a('one'));
  });
});

describe('snapshot (complex)', () => {
  const root = new Uint8Array([124, 157, 64, 253, 245, 26, 3, 63, 210, 140, 4, 56, 214, 180, 147, 0, 167, 60, 113, 206, 171, 136, 88, 84, 139, 142, 230, 40, 42, 113, 21, 242]);
  const snapshot = {
    root,
    kv: [
      {
        key: new Uint8Array([124, 157, 64, 253, 245, 26, 3, 63, 210, 140, 4, 56, 214, 180, 147, 0, 167, 60, 113, 206, 171, 136, 88, 84, 139, 142, 230, 40, 42, 113, 21, 242]),
        value: new Uint8Array([248, 81, 128, 128, 128, 128, 128, 128, 160, 43, 20, 29, 166, 102, 237, 241, 3, 103, 141, 231, 12, 41, 136, 113, 127, 64, 230, 70, 53, 102, 251, 86, 124, 66, 133, 120, 158, 124, 131, 167, 115, 160, 180, 124, 180, 190, 148, 254, 225, 158, 93, 19, 73, 223, 197, 118, 58, 156, 142, 38, 117, 113, 113, 62, 24, 14, 112, 180, 71, 146, 88, 245, 8, 79, 128, 128, 128, 128, 128, 128, 128, 128, 128])
      },
      {
        key: new Uint8Array([43, 20, 29, 166, 102, 237, 241, 3, 103, 141, 231, 12, 41, 136, 113, 127, 64, 230, 70, 53, 102, 251, 86, 124, 66, 133, 120, 158, 124, 131, 167, 115]),
        value: new Uint8Array([248, 61, 128, 128, 128, 128, 160, 8, 114, 176, 29, 110, 138, 117, 140, 199, 123, 157, 109, 23, 13, 129, 183, 5, 36, 181, 7, 249, 235, 140, 105, 138, 43, 184, 43, 166, 27, 144, 119, 128, 128, 128, 128, 128, 128, 128, 128, 128, 128, 204, 131, 32, 110, 101, 135, 116, 101, 115, 116, 105, 110, 103, 128])
      },
      {
        key: new Uint8Array([8, 114, 176, 29, 110, 138, 117, 140, 199, 123, 157, 109, 23, 13, 129, 183, 5, 36, 181, 7, 249, 235, 140, 105, 138, 43, 184, 43, 166, 27, 144, 119]),
        value: new Uint8Array([228, 130, 0, 111, 160, 7, 72, 132, 209, 24, 245, 99, 65, 67, 56, 68, 203, 134, 163, 14, 162, 135, 192, 131, 115, 151, 152, 207, 11, 207, 252, 75, 133, 51, 218, 25, 238])
      },
      {
        key: new Uint8Array([7, 72, 132, 209, 24, 245, 99, 65, 67, 56, 68, 203, 134, 163, 14, 162, 135, 192, 131, 115, 151, 152, 207, 11, 207, 252, 75, 133, 51, 218, 25, 238]),
        value: new Uint8Array([246, 128, 128, 128, 128, 128, 128, 160, 0, 66, 56, 170, 201, 142, 143, 194, 136, 124, 99, 143, 114, 89, 170, 185, 131, 137, 42, 113, 24, 123, 127, 229, 184, 126, 106, 73, 207, 91, 203, 240, 128, 128, 128, 128, 128, 128, 128, 128, 128, 133, 100, 111, 32, 105, 116])
      },
      {
        key: new Uint8Array([0, 66, 56, 170, 201, 142, 143, 194, 136, 124, 99, 143, 114, 89, 170, 185, 131, 137, 42, 113, 24, 123, 127, 229, 184, 126, 106, 73, 207, 91, 203, 240]),
        value: new Uint8Array([248, 58, 128, 128, 128, 128, 201, 131, 32, 103, 101, 132, 99, 111, 105, 110, 128, 128, 160, 192, 43, 76, 25, 80, 92, 140, 120, 17, 231, 192, 130, 230, 92, 251, 13, 105, 186, 206, 179, 136, 98, 99, 172, 36, 39, 103, 252, 106, 239, 143, 65, 128, 128, 128, 128, 128, 128, 128, 128, 128])
      },
      {
        key: new Uint8Array([192, 43, 76, 25, 80, 92, 140, 120, 17, 231, 192, 130, 230, 92, 251, 13, 105, 186, 206, 179, 136, 98, 99, 172, 36, 39, 103, 252, 106, 239, 143, 65]),
        value: new Uint8Array([229, 128, 128, 128, 128, 128, 128, 206, 130, 55, 101, 138, 98, 105, 103, 103, 101, 114, 32, 100, 111, 103, 128, 128, 128, 128, 128, 128, 128, 128, 128, 134, 100, 111, 103, 103, 105, 101])
      },
      {
        key: new Uint8Array([180, 124, 180, 190, 148, 254, 225, 158, 93, 19, 73, 223, 197, 118, 58, 156, 142, 38, 117, 113, 113, 62, 24, 14, 112, 180, 71, 146, 88, 245, 8, 79]),
        value: new Uint8Array([228, 130, 20, 119, 160, 241, 238, 143, 216, 113, 181, 142, 30, 233, 10, 103, 88, 121, 181, 13, 65, 190, 125, 119, 254, 2, 74, 197, 253, 195, 30, 180, 27, 124, 108, 17, 37])
      },
      {
        key: new Uint8Array([241, 238, 143, 216, 113, 181, 142, 30, 233, 10, 103, 88, 121, 181, 13, 65, 190, 125, 119, 254, 2, 74, 197, 253, 195, 30, 180, 27, 124, 108, 17, 37]),
        value: new Uint8Array([248, 64, 128, 128, 128, 128, 128, 128, 160, 144, 253, 178, 188, 85, 38, 240, 124, 252, 74, 50, 104, 249, 63, 70, 48, 240, 230, 145, 24, 10, 144, 36, 140, 181, 209, 61, 245, 25, 143, 110, 208, 207, 131, 58, 101, 105, 138, 117, 110, 100, 32, 68, 101, 117, 116, 99, 104, 128, 128, 128, 128, 128, 128, 128, 128, 128])
      },
      {
        key: new Uint8Array([144, 253, 178, 188, 85, 38, 240, 124, 252, 74, 50, 104, 249, 63, 70, 48, 240, 230, 145, 24, 10, 144, 36, 140, 181, 209, 61, 245, 25, 143, 110, 208]),
        value: new Uint8Array([231, 63, 165, 116, 101, 115, 116, 105, 110, 103, 32, 119, 105, 116, 104, 32, 97, 32, 109, 117, 99, 104, 32, 108, 111, 110, 103, 101, 114, 32, 118, 97, 108, 117, 101, 32, 104, 101, 114, 101])
      }
    ]
  };

  it('creates a snapshot of the (relevant) data', () => {
    const trie = new Trie();

    trie.put(toU8a('one'), toU8a('testing'));
    trie.put(toU8a('two'), toU8a('testing with a much longer value here'));
    trie.put(toU8a('twzei'), toU8a('und Deutch'));
    trie.put(toU8a('do'), toU8a('do it'));
    trie.put(toU8a('dog'), toU8a('doggie'));
    trie.put(toU8a('dogge'), toU8a('bigger dog'));
    trie.put(toU8a('dodge'), toU8a('coin'));

    expect(
      trie.createSnapshot(() => {})
    ).toEqual(snapshot);
  });

  it('restores the snapshot', () => {
    const trie = new Trie();

    trie.restoreSnapshot(snapshot, () => {});

    expect(trie.getRoot()).toEqual(root);
    expect(trie.get(toU8a('one'))).toEqual(toU8a('testing'));
    expect(trie.get(toU8a('two'))).toEqual(toU8a('testing with a much longer value here'));
    expect(trie.get(toU8a('twzei'))).toEqual(toU8a('und Deutch'));
    expect(trie.get(toU8a('do'))).toEqual(toU8a('do it'));
    expect(trie.get(toU8a('dog'))).toEqual(toU8a('doggie'));
    expect(trie.get(toU8a('dogge'))).toEqual(toU8a('bigger dog'));
    expect(trie.get(toU8a('dodge'))).toEqual(toU8a('coin'));
  });
});
