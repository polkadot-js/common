// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import taskExecutor from '../src/util/taskExecutor';

const executor = taskExecutor(2);

describe.skip('taskExecutor', () => {
  it('executes in order', async () => {
    var tasks = [1, 2, 3, 4, 5, 6, 7];
    var executionOrder = [];

    await Promise.all(
      tasks.map((priority) =>
        executor(priority, (cb) => {
          executionOrder.push(priority);
          setTimeout(cb, 50);
        })
      )
    );

    expect(
      executionOrder
    ).toEqual(
      [1, 2, 7, 6, 5, 4, 3]
    );
  });
});
