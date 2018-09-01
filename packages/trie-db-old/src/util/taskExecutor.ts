// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

type Task$Fn = (taskCb: (value: any) => any) => any;

type Task = {
  fn: Task$Fn,
  priority: number,
  reject: (error: Error) => void,
  resolve: (value: any) => void
};

// https://github.com/ethereumjs/merkle-patricia-tree/pull/38
export default function taskExecutor (maxPoolSize: number) {
  let currentPoolSize = 0;
  const queue: Array<Task> = [];

  const execute = (task: Task | undefined) => {
    if (task === undefined) {
      return;
    }

    if (currentPoolSize < maxPoolSize) {
      currentPoolSize++;

      task.fn((value: any): void => {
        currentPoolSize--;

        task.resolve(value);

        if (queue.length > 0) {
          queue.sort((a, b) =>
            b.priority - a.priority
          );

          execute(queue.shift());
        }
      });

      return;
    }

    queue.push(task);
  };

  return (priority: number, fn: Task$Fn): Promise<any> => {
    return new Promise((resolve, reject) => {
      execute({ fn, reject, resolve, priority });
    });
  };
}
