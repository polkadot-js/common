// Copyright 2017-2019 @polkadot/db authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { BaseDbOptions } from './types';

import FileFlatDb from './FileFlatDb';
import LruDb from './engines/LruDb';
import TransactionDb from './engines/TransactionDb';

/**
 * @name DiskDb
 * @summary Creates DiskDb database using LruDb for caching with FileFlatDb and extending TransactionDb.
 * @description Create an instance of a Disk database using
 * LruDb (for caching with FileFlatDb) and extending TransactionDb.
 * Note that LruDB uses the [Least Recently Used (LRU) cache algorithm](https://www.npmjs.com/package/lru_map)
 * @example
 * <BR>
 *
 * ```javascript
 * import stringToU8a from '@polkadot/util/string/toU8a';
 * import DiskDb from '@polkadot/db/Disk';
 * import TransactionDb from '@polkadot/db/engines/TransactionDb';
 *
 * // Creat diskDb instance that wraps LruDb with backing and Lru cache
 * const diskDb = new DiskDb();
 *
 * // Creat txDb instance that uses diskDb
 * const txDb = new TransactionDb(diskDb);
 *
 * // Open the disk db backing database. Clears the Lru cache
 * diskDb.open();
 *
 * // Declare key/value pair to allocate to store under a the key
 * const key = stringToU8a('key');
 * const value = stringToU8a('some value');
 *
 * // Store key/value pair in disk db backing and also in Lru cache
 * diskDb.put(key, value);
 *
 * // Retrieve value for key from disk db. Returns cached value if key
 * // in cache, otherwise returns backing value for key and stores
 * // this latest retrieved key/value pair in Lru cache
 * valueRetrieved = diskDb.get(key);
 *
 * // Delete key/value pair from disk db backing and set the key to null in Lru cache
 * diskDb.del(key);
 *
 * // Transaction to Store key/value pair in transaction db
 * const isTxSuccess = txDb.transaction(() => {
 *   txDb.put(key, value);
 *
 *   // Boolean to indicate whether transaction was successful or not
 *   return true;
 * });
 *
 * console.log(`Transaction successful?: ${isTxSuccess}`);
 *
 * // Retrieve transaction value from diskDb db
 * console.log(`Transfered value: ${diskDb.get(key)}`);
 *
 * // Close the diskDb database and clear Lru cache
 * diskDb.close();
 * ```
 */
export default class DiskDb extends TransactionDb {
  constructor (base: string, name: string, options?: BaseDbOptions) {
    super(
      new LruDb(
        new FileFlatDb(base, name, options)
      )
    );
  }
}
