// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import toU8a from '@polkadot/util/u8a/toU8a';

import Trie from '../src/index';

describe.skip'kv stream test', () => {
  var trie = new Trie();
  var init = [{
    type: 'del',
    key: 'father'
  }, {
    type: 'put',
    key: 'name',
    value: 'Yuri Irsenovich Kim'
  }, {
    type: 'put',
    key: 'dob',
    value: '16 February 1941'
  }, {
    type: 'put',
    key: 'spouse',
    value: 'Kim Young-sook'
  }, {
    type: 'put',
    key: 'occupation',
    value: 'Clown'
  }, {
    type: 'put',
    key: 'nameads',
    value: 'Yuri Irsenovich Kim'
  }, {
    type: 'put',
    key: 'namfde',
    value: 'Yuri Irsenovich Kim'
  }, {
    type: 'put',
    key: 'namsse',
    value: 'Yuri Irsenovich Kim'
  }, {
    type: 'put',
    key: 'dofab',
    value: '16 February 1941'
  }, {
    type: 'put',
    key: 'spoudse',
    value: 'Kim Young-sook'
  }, {
    type: 'put',
    key: 'occupdsation',
    value: 'Clown'
  }, {
    type: 'put',
    key: 'dozzzb',
    value: '16 February 1941'
  }, {
    type: 'put',
    key: 'spouszze',
    value: 'Kim Young-sook'
  }, {
    type: 'put',
    key: 'occupatdfion',
    value: 'Clown'
  }, {
    type: 'put',
    key: 'dssob',
    value: '16 February 1941'
  }, {
    type: 'put',
    key: 'spossuse',
    value: 'Kim Young-sook'
  }, {
    type: 'put',
    key: 'occupssation',
    value: 'Clown'
  }].map(({ type, key, value }) => ({
    type,
    key: toU8a(key),
    value: toU8a(value)
  }));

  const valObj = init.reduce((result, { key, type, value }) => {
    if (type === 'put') {
      result[toU8a(key)] = toU8a(value);
    }

    return result;
  }, {});

  it('should populate trie', async () => {
    await trie.batch(init);
  });

  it('should fetch all of the nodes', (done) => {
    const stream = trie.createReadStream();

    stream.on('data', ({ key, value }) => {
      expect(valObj[key]).toEqual(value);

      delete valObj[key];
    });

    stream.on('end', () => {
      const keys = Object.keys(valObj);

      expect(keys).toHaveLength(0);
      done();
    });
  });
});

describe.skip'db stream test', () => {
  var trie = new Trie();
  var init = [{
    type: 'put',
    key: 'color',
    value: 'purple'
  }, {
    type: 'put',
    key: 'food',
    value: 'sushi'
  }, {
    type: 'put',
    key: 'fight',
    value: 'fire'
  }, {
    type: 'put',
    key: 'colo',
    value: 'trolo'
  }, {
    type: 'put',
    key: 'color',
    value: 'blue'
  }, {
    type: 'put',
    key: 'color',
    value: 'pink'
  }].map(({ type, key, value }) => ({
    type,
    key: toU8a(key),
    value: toU8a(value)
  }));

  var expectedNodes = [
    '0x3c38d9aa6ad288c8e27da701e17fe99a5b67c8b12fd0469651c80494d36bc4c1',
    '0xd5f61e1ff2b918d1c2a2c4b1732a3c68bd7e3fd64f35019f2f084896d4546298',
    '0xe64329dadee2fb8a113b4c88cfe973aeaa9b523d4dc8510b84ca23f9d5bfbd90',
    '0xc916d458bfb5f27603c5bd93b00f022266712514a59cde749f19220daffc743f',
    '0x2386bfb0de9cf93902a110f5ab07b917ffc0b9ea599cb7f4f8bb6fd1123c866c'
  ].reduce((result, hex) => {
    result[toU8a(hex)] = true;

    return result;
  }, {});

  it('should populate trie', async () => {
    await trie.checkpoint();
    await trie.batch(init);
  });

  it('should only fetch nodes in the current trie', (done) => {
    const stream = trie.createScratchReadStream();

    stream.on('data', ({ key }) => {
      expect(!!expectedNodes[key]).toEqual(true);
      delete expectedNodes[key];
    });

    stream.on('end', () => {
      expect(Object.keys(expectedNodes)).toHaveLength(0);
      done();
    });
  });
});
