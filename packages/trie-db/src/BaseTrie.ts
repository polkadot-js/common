// Copyright 2015-2018 authors & contributors of https://github.com/ethereumjs/merkle-patricia-tree
// Copyright 2017-2018 @polkadot/trie-db authors & contributors
// This software may be modified and distributed under the terms
// of the MPL-2.0 license. See the LICENSE file for details.

import { HashFn, NodeFactory, SemaphorePromise } from './types';

import async from 'async';
// @ts-ignore FIXME, we need to properly check the full file
import levelup from 'levelup';
import memdown from 'memdown';
import logger from '@polkadot/util/logger';
import assert from '@polkadot/util/assert';
import isU8a from '@polkadot/util/is/u8a';
import promisify from '@polkadot/util/promisify';
// import u8aToHex from '@polkadot/util/u8a/toHex';
import decodeRlp from '@polkadot/util-rlp/decode';

import { EMPTY_ROOT_U8A, EMPTY_ROOT_STR } from './constants';
import encoder from './encoder';
import { nibblesMatchingLength, nibblesIsEqual, nibblesFromU8a } from './nibbles';
import ReadStream from './streams/TrieRead';
import createFactory from './nodeFactory';
import isRawNode from './util/isRawNode';
import prioritizedTaskExecutor from './util/taskExecutor';
import semaphore from './util/semaphore';

type RawPutFn = (key: Uint8Array, value: Uint8Array) => Promise<any>;

const l = logger('trie/base');

export default class BaseTrie {
  // @ts-ignore we are assigning via this.root in constructor
  _root: Uint8Array;
  _getDBs: any[]; // FIXME
  _putDBs: any[]; // FIXME
  dbDown: any; // FIXME
  db: any; // FIXME
  hashing: HashFn;
  nodeFactory: NodeFactory;
  putRaw: RawPutFn;
  semaphore: SemaphorePromise;

  // @ts-ignore FIXME, we need to properly check the full file
  constructor (db, root: Uint8Array, hashing: HashFn) {
    this.putRaw = this._putRaw;

    this.semaphore = semaphore(1);
    this.dbDown = db || memdown();
    this.db = levelup(encoder(this.dbDown));
    this._getDBs = [this.db];
    this._putDBs = [this.db];
    this.hashing = hashing;
    this.nodeFactory = createFactory(hashing);
    this.root = root;

    // l.debug(() => ['Created BaseTrie', typeof db, u8aToHex(root)]);
  }

  get root (): Uint8Array {
    return this._root;
  }

  set root (value: Uint8Array) {
    if (value) {
      assert(isU8a(value) && value.length === 32, 'Invalid root length. Roots are Uint8Array 32 bytes');
    } else {
      value = EMPTY_ROOT_U8A;
    }

    this._root = value;
  }

  /**
   * Gets a value given a `key`
   * @method get
   * @param {Buffer|String} key - the key to search for
   * @param {Function} cb A callback `Function` which is given the arguments `err` - for errors that may have occured and `value` - the found value in a `Buffer` or if no value was found `null`
   */
  async get (key: Uint8Array): Promise<Uint8Array | null> {
    // l.debug(() => ['get', 'key ->', u8aToHex(key)]);

    const result = await this.findPath(key);

    let value = null;

    if (result && result.node && result.remainder.length === 0) {
      value = result.node.value;
    }

    return value;
  }

  /**
   * Stores a given `value` at the given `key`
   * @method put
   * @param {Buffer|String} key
   * @param {Buffer|String} Value
   * @returns {Function} Promise<void>
   */
  async put (key: Uint8Array, value: Uint8Array) {
    // l.debug(() => ['put', 'key ->', u8aToHex(key), 'value ->', u8aToHex(value, 256)]);

    if (!value || value.toString() === '') {
      return this.del(key);
    }

    return this.semaphore(async () => {
      if (this.root.toString() === EMPTY_ROOT_STR) {
        return this._createInitialNode(key, value); // if no root initialize this trie
      }

      // first try to find the give key or its nearst node
      const result = await this.findPath(key);

      return this._updateNode(key, value, result && result.remainder, result && result.stack);
    });
  }

  /**
   * deletes a value given a `key`
   * @method del
   * @param {Buffer|String} key
   * @param {Function} callback the callback `Function`
   */
  del (key: Uint8Array) {
    // l.debug(() => ['del', 'key ->', u8aToHex(key)]);

    return this.semaphore(async () => {
      const result = await this.findPath(key);

      if (result && result.node) {
        return this._deleteNode(key, result.stack);
      }
    });
  }

  /**
   * Retrieves a raw value in the underlying db
   * @method getRaw
   * @param {Buffer} key
   * @param {Function} callback A callback `Function`, which is given the arguments `err` - for errors that may have occured and `value` - the found value in a `Buffer` or if no value was found `null`.
   */
  async getRaw (key: Uint8Array): Promise<Uint8Array> {
    let found: Uint8Array;

    await Promise.all(
      this._getDBs.map(async (db) => {
        if (!found) {
          try {
            found = await db.get(key);
          } catch (error) {
            // l.error('getRaw', 'key ->', u8aToHex(key), error);
            // not doing anything
          }
        }

        return found;
      })
    );

    // @ts-ignore FIXME, we need to properly check the full file
    return found;
  }

  // retrieves a node from dbs by hash
  // @ts-ignore FIXME, we need to properly check the full file
  async _lookupNode (node) {
    if (isRawNode(node)) {
      return this.nodeFactory.fromRaw(node);
    }

    let value = await this.getRaw(node);

    if (value) {
      try {
        // @ts-ignore FIXME, we need to properly check the full file
        value = this.nodeFactory.fromRaw(decodeRlp(value));
      } catch (error) {
        // l.error('_lookupNode decoding', typeof value, value);
        throw error;
      }
    }

    return value;
  }

  // TODO: remove the proxy method when changing the caching
  async _putRaw (key: Uint8Array, value: Uint8Array) {
    return Promise.all(
      this._putDBs.map((db) => {
        return db.put(key, value);
      })
    );
  }

  /**
   * Removes a raw value in the underlying db
   * @method delRaw
   * @param {Buffer|String} key
   * @param {Function} callback A callback `Function`, which is given the argument `err` - for errors that may have occured
   */
  delRaw (key: Uint8Array) {
    return Promise.all(
      this._putDBs.map((db) => {
        return db.del(key);
      })
    );
  }

  // writes a single node to dbs
  // @ts-ignore FIXME, we need to properly check the full file
  _putNode (node) {
    const hash = node.hash();
    const serialized = node.serialize();

    return this._putRaw(hash, serialized);
  }

  // writes many nodes to db
  // @ts-ignore FIXME, we need to properly check the full file
  _batchNodes (opStack) {
    return Promise.all(
      this._putDBs.map((db) => {
        return db.batch(opStack);
      })
    );
  }

  /**
   * Trys to find a path to the node for the given key
   * It returns a `stack` of nodes to the closet node
   * @method findPath
   * @param {String|Buffer} - key - the search key
   * @param {Function} - cb - the callback function. Its is given the following
   * arguments
   *  - err - any errors encontered
   *  - node - the last node found
   *  - remainder - the remaining key nibbles not accounted for
   *  - stack - an array of nodes that forms the path to node we are searching for
   */
  // @ts-ignore FIXME, we need to properly check the full file
  findPath (_targetKey) {
    const stack: any[] = []; // FIXME
    const targetKey = nibblesFromU8a(_targetKey);

    // l.debug(() => ['findPath', targetKey.join(', ')]);

    // @ts-ignore FIXME, we need to properly check the full file
    const processNode = (nodeRef, node, keyProgress, walkController) => {
      const nodeKey = node.key || [];
      const remainder = targetKey.slice(nibblesMatchingLength(keyProgress, targetKey));
      const matchingLen = nibblesMatchingLength(remainder, nodeKey);

      stack.push(node);

      if (node.type === 'branch') {
        if (remainder.length === 0) {
          walkController.return(null, { node, remainder: [], stack });
        // we exhausted the key without finding a node
        } else {
          const branchIndex = remainder[0];
          const branchNode = node.getValue(branchIndex);

          if (!branchNode) {
            // there are no more nodes to find and we didn't find the key
            walkController.return(null, { node: null, remainder, stack });
          } else {
            // node found, continuing search
            walkController.only(branchIndex);
          }
        }
      } else if (node.type === 'leaf') {
        if (nibblesIsEqual(remainder, nodeKey)) {
          // keys match, return node with empty key
          walkController.return(null, { node, remainder: [], stack });
        } else {
          // reached leaf but keys dont match
          walkController.return(null, { node: null, remainder, stack });
        }
      } else if (node.type === 'extention') {
        if (matchingLen !== nodeKey.length) {
          // keys dont match, fail
          walkController.return(null, { node: null, remainder, stack });
        } else {
          // keys match, continue search
          walkController.next();
        }
      }
    };

    return promisify(this, this._walkTrie, this.root, processNode);
  }

  /*
  * Finds all nodes that store k,v values
  */
  // NOTE seems unused
  // _findNode = function (key, root, stack, cb) {
  //   this.findPath(key, (...args) => {
  //     cb.apply(null, args);
  //   });
  // };

  /*
  * Finds all nodes that store k,v values
  */
  // @ts-ignore FIXME, we need to properly check the full file
  _findValueNodes (onFound, cb) {
    // @ts-ignore FIXME, we need to properly check the full file
    this._walkTrie(this.root, (nodeRef, node, key, walkController) => { // tslint:disable-line
      let fullKey = key;

      if (node.key) {
        fullKey = key.concat(node.key);
      }

      if (node.type === 'leaf') {
        // found leaf node!
        onFound(nodeRef, node, fullKey, walkController.next);
      } else if (node.type === 'branch' && node.value) {
        // found branch with value
        onFound(nodeRef, node, fullKey, walkController.next);
      } else {
        // keep looking for value nodes
        walkController.next();
      }
    }, cb);
  }

  /*
  * Finds all nodes that are stored directly in the db
  * (some nodes are stored raw inside other nodes)
  */
  // @ts-ignore FIXME, we need to properly check the full file
  _findDbNodes (onFound, cb) {
    // @ts-ignore FIXME, we need to properly check the full file
    this._walkTrie(this.root, (nodeRef, node, key, walkController) => { // tslint:disable-line
      if (isRawNode(nodeRef)) {
        walkController.next();
      } else {
        onFound(nodeRef, node, key, walkController.next);
      }
    }, cb);
  }

  /**
   * Updates a node
   * @method _updateNode
   * @param {Buffer} key
   * @param {Buffer| String} value
   * @param {Array} keyRemainder
   * @param {Array} stack -
   * @param {Function} cb - the callback
   */
  // @ts-ignore FIXME, we need to properly check the full file
  async _updateNode (key, value, keyRemainder, stack) {
    // @ts-ignore FIXME, we need to properly check the full file
    const toSave = [];
    const lastNode = stack.pop();

    // add the new nodes
    key = nibblesFromU8a(key);

    // Check if the last node is a leaf and the key matches to this
    let matchLeaf = false;

    if (lastNode.type === 'leaf') {
      let l = 0;

      for (let i = 0; i < stack.length; i++) {
        const n = stack[i];

        if (n.type === 'branch') {
          l++;
        } else {
          l += n.key.length;
        }
      }

      if ((nibblesMatchingLength(lastNode.key, key.slice(l)) === lastNode.key.length) && (keyRemainder.length === 0)) {
        matchLeaf = true;
      }
    }

    if (matchLeaf) {
      // just updating a found value
      lastNode.value = value;
      stack.push(lastNode);
    } else if (lastNode.type === 'branch') {
      stack.push(lastNode);

      if (keyRemainder !== 0) {
        // add an extention to a branch node
        keyRemainder.shift();
        // create a new leaf
        stack.push(
          this.nodeFactory.fromLeaf(keyRemainder, value)
        );
      } else {
        lastNode.value = value;
      }
    } else {
      // create a branch node
      const lastKey = lastNode.key;
      const matchingLength = nibblesMatchingLength(lastKey, keyRemainder);
      // @ts-ignore FIXME, we need to properly check the full file
      const newBranchNode = this.nodeFactory.fromBranch();

      // create a new extention node
      if (matchingLength !== 0) {
        const newKey = lastNode.key.slice(0, matchingLength);
        const newExtNode = this.nodeFactory.fromExtention(newKey, value);

        stack.push(newExtNode);
        lastKey.splice(0, matchingLength);
        keyRemainder.splice(0, matchingLength);
      }

      stack.push(newBranchNode);

      if (lastKey.length !== 0) {
        const branchKey = lastKey.shift();

        if (lastKey.length !== 0 || lastNode.type === 'leaf') {
          // shriking extention or leaf
          lastNode.key = lastKey;

          // @ts-ignore FIXME, we need to properly check the full file
          const formatedNode = this._formatNode(lastNode, false, toSave);

          // @ts-ignore FIXME, we need to properly check the full file
          newBranchNode.setValue(branchKey, formatedNode);
        } else {
          // remove extention or attaching
          // @ts-ignore FIXME, we need to properly check the full file
          this._formatNode(lastNode, false, true, toSave);

          // @ts-ignore FIXME, we need to properly check the full file
          newBranchNode.setValue(branchKey, lastNode.value);
        }
      } else {
        newBranchNode.value = lastNode.value;
      }

      if (keyRemainder.length !== 0) {
        keyRemainder.shift();

        // add a leaf node to the new branch node
        stack.push(
          this.nodeFactory.fromLeaf(keyRemainder, value)
        );
      } else {
        newBranchNode.value = value;
      }
    }

    // @ts-ignore FIXME, we need to properly check the full file
    return this._saveStack(key, stack, toSave);
  }

  // walk tree
  // @ts-ignore FIXME, we need to properly check the full file
  async _walkTrie (root, onNode, onDone) {
    root = root || this.root;

    let isAborted: boolean = false;
    // @ts-ignore FIXME, we need to properly check the full file
    let returnValues: any[] = [];

    if (root.toString() === EMPTY_ROOT_STR) {
      onDone();
      return;
    }

    // the maximum pool size should be high enough to utilise the parallelizability of reading nodes from disk and
    // low enough to utilize the prioritisation of node lookup.
    const maxPoolSize = 500;
    const taskExecutor = prioritizedTaskExecutor(maxPoolSize);

    // @ts-ignore FIXME, we need to properly check the full file
    const processNode = (nodeRef, node, key, cb) => {
      if (!node || isAborted) {
        return cb();
      }

      const self = this;
      let isStopped = false;

      key = key || [];

      const walkController = {
        stop: function () {
          isStopped = true;
          cb();
        },
        // end all traversal and return values to the onDone cb
        return: function () {
          isAborted = true;
          // @ts-ignore FIXME, we need to properly check the full file
          returnValues = arguments;
          cb();
        },
        next: async function () {
          if (isAborted || isStopped) {
            return cb();
          }

          const children = node.getChildren();

          // @ts-ignore FIXME callback
          async.forEachOf(children, (childData: any[], index: number, cb) => {
            // @ts-ignore FIXME, we need to properly check the full file
            const keyExtension = childData[0];
            // @ts-ignore FIXME, we need to properly check the full file
            const childRef = childData[1];
            const childKey = key.concat(keyExtension);
            const priority = childKey.length;

            // tslint:disable-next-line
            taskExecutor(priority, async (taskCallback) => {
              const childNode = await self._lookupNode(childRef);

              // @ts-ignore FIXME, we need to properly check the full file
              taskCallback();
              processNode(childRef, childNode, childKey, cb);
            });
          }, cb);
        },
        // @ts-ignore FIXME, we need to properly check the full file
        only: function (childIndex) {
          const childRef = node.getValue(childIndex);
          const childKey = key.slice();

          childKey.push(childIndex);

          const priority = childKey.length;

          // tslint:disable-next-line
          taskExecutor(priority, async (taskCallback) => {
            const childNode = await self._lookupNode(childRef);

            // @ts-ignore FIXME, we need to properly check the full file
            taskCallback();
            processNode(childRef, childNode, childKey, cb);
          });
        }
      };
      onNode(nodeRef, node, key, walkController);
    };

    const node = await this._lookupNode(root);

    processNode(root, node, null, (error: Error | null) => {
      if (error) {
        onDone(error);
        return;
      }

      // @ts-ignore FIXME, we need to properly check the full file
      onDone.apply(null, returnValues);
    });
  }

  /**
   * saves a stack
   * @method _saveStack
   * @param {Array} key - the key. Should follow the stack
   * @param {Array} stack - a stack of nodes to the value given by the key
   * @param {Array} opStack - a stack of levelup operations to commit at the end of this funciton
   * @param {Function} cb
   */
  // @ts-ignore FIXME, we need to properly check the full file
  _saveStack (key, stack, opStack: any[]) {
    let lastRoot;

    // update nodes
    while (stack.length) {
      const node = stack.pop();

      if (node.type === 'leaf') {
        key.splice(key.length - node.key.length);
      } else if (node.type === 'extention') {
        key.splice(key.length - node.key.length);
        if (lastRoot) {
          node.value = lastRoot;
        }
      } else if (node.type === 'branch') {
        if (lastRoot) {
          const branchKey = key.pop();

          node.setValue(branchKey, lastRoot);
        }
      }

      // @ts-ignore FIXME, we need to properly check the full file
      lastRoot = this._formatNode(node, stack.length === 0, opStack);
    }

    if (lastRoot) {
      this.root = lastRoot;
    }

    return this._batchNodes(opStack);
  }

  // @ts-ignore FIXME, we need to properly check the full file
  async _deleteNode (key: Uint8Array, stack) {
    // @ts-ignore FIXME, we need to properly check the full file
    const processBranchNode = (key, branchKey, branchNode, parentNode, stack) => {
      // branchNode is the node ON the branch node not THE branch node
      const branchNodeKey = branchNode.key;

      if (!parentNode || parentNode.type === 'branch') {
        // branch->?
        if (parentNode) {
          stack.push(parentNode);
        }

        if (branchNode.type === 'branch') {
          // create an extention node
          // branch->extention->branch
          // @ts-ignore FIXME, we need to properly check the full file
          stack.push(this.nodeFactory.fromExtention([branchKey], null));
          key.push(branchKey);
        } else {
          // branch key is an extention or a leaf
          // branch->(leaf or extention)
          branchNodeKey.unshift(branchKey);
          branchNode.key = branchNodeKey;

          // hackery. This is equvilant to array.concat except we need keep the
          // rerfance to the `key` that was passed in.
          branchNodeKey.unshift(0);
          branchNodeKey.unshift(key.length);
          key.splice.apply(key, branchNodeKey);
        }
        stack.push(branchNode);
      } else {
        // parent is a extention
        let parentKey = parentNode.key;

        if (branchNode.type === 'branch') {
          // ext->branch
          parentKey.push(branchKey);
          key.push(branchKey);
          parentNode.key = parentKey;
          stack.push(parentNode);
        } else {
          // branch node is an leaf or extention and parent node is an exstention
          // add two keys together
          // dont push the parent node
          branchNodeKey.unshift(branchKey);
          key = key.concat(branchNodeKey);
          parentKey = parentKey.concat(branchNodeKey);
          branchNode.key = parentKey;
        }
        stack.push(branchNode);
      }

      return key;
    };

    // @ts-ignore FIXME, we need to properly check the full file
    const opStack: any[] = [];
    let lastNode = stack.pop();
    let parentNode = stack.pop();

    if (!Array.isArray(key)) {
      // @ts-ignore FIXME, we need to properly check the full file
      key = nibblesFromU8a(key);
    }

    if (!parentNode) {
      // the root here has to be a leaf.
      this.root = EMPTY_ROOT_U8A;
    } else {
      if (lastNode.type === 'branch') {
        lastNode.value = null;
      } else {
        // the lastNode has to be a leaf if its not a branch. And a leaf's parent
        // if it has one must be a branch.
        const lastNodeKey = lastNode.key;

        // @ts-ignore FIXME, we need to properly check the full file
        key.splice(key.length - lastNodeKey.length);
        // delete the value
        this._formatNode(lastNode, false, true, opStack);
        // @ts-ignore FIXME, we need to properly check the full file
        parentNode.setValue(key.pop(), null);
        lastNode = parentNode;
        parentNode = stack.pop();
      }

      // nodes on the branch
      // @ts-ignore FIXME, we need to properly check the full file
      const branchNodes = [];

      // count the number of nodes on the branch
      // @ts-ignore FIXME, we need to properly check the full file
      lastNode.raw.forEach(function (node, i) {
        const val = lastNode.getValue(i);

        // @ts-ignore FIXME, we need to properly check the full file
        if (val) branchNodes.push([i, val]);
      });

      // if there is only one branch node left, collapse the branch node
      if (branchNodes.length === 1) {
        // add the one remaing branch node to node above it
        // @ts-ignore FIXME, we need to properly check the full file
        const branchNode = branchNodes[0][1];
        // @ts-ignore FIXME, we need to properly check the full file
        const branchNodeKey = branchNodes[0][0];

        // look up node
        const foundNode = await this._lookupNode(branchNode);

        // @ts-ignore FIXME, we need to properly check the full file
        key = processBranchNode(key, branchNodeKey, foundNode, parentNode, stack, opStack);

        return this._saveStack(key, stack, opStack);
      } else {
        // simple removing a leaf and recaluclation the stack
        if (parentNode) {
          stack.push(parentNode);
        }

        stack.push(lastNode);

        return this._saveStack(key, stack, opStack);
      }
    }
  }

  // Creates the initial node from an empty tree
  _createInitialNode (key: Uint8Array, value: Uint8Array) {
    const newNode = this.nodeFactory.fromLeaf(key, value);

    this.root = newNode.hash();

    return this._putNode(newNode);
  }

  // formats node to be saved by levelup.batch.
  // returns either the hash that will be used key or the rawNode
  // @ts-ignore FIXME, we need to properly check the full file
  _formatNode (node: any, topLevel: any, remove: any, opStack: any) {
    if (arguments.length === 3) {
      opStack = remove;
      remove = false;
    }

    const rlpNode = node.serialize();

    if (rlpNode.length >= 32 || topLevel) {
      const hashRoot = node.hash();

      // FIXME Actually 2 things wrong here - this is on checkpoint, so one higher-level class...
      // @ts-ignore FIXME, we need to properly check the full file
      if (remove && this.isCheckpoint) {
        opStack.push({
          type: 'del',
          key: hashRoot
        });
      } else {
        opStack.push({
          type: 'put',
          key: hashRoot,
          value: rlpNode
        });
      }

      return hashRoot;
    }

    return node.raw;
  }

  /**
   * The `data` event is given an `Object` hat has two properties; the `key` and the `value`. Both should be Buffers.
   * @method createReadStream
   * @return {stream.Readable} Returns a [stream](https://nodejs.org/dist/latest-v5.x/docs/api/stream.html#stream_class_stream_readable) of the contents of the `trie`
   */
  createReadStream () {
    return new ReadStream(this);
  }

  // creates a new trie backed by the same db
  // and starting at the same root
  copy () {
    // l.debug(() => ['Copying BaseTrie', typeof this.dbDown, u8aToHex(this.root)]);

    return new BaseTrie(this.dbDown, this.root, this.hashing);
  }

  /**
   * The given hash of operations (key additions or deletions) are executed on the DB
   * @method batch
   * @example
   * const ops = [
   *    { type: 'del', key: 'father' }
   *  , { type: 'put', key: 'name', value: 'Yuri Irsenovich Kim' }
   *  , { type: 'put', key: 'dob', value: '16 February 1941' }
   *  , { type: 'put', key: 'spouse', value: 'Kim Young-sook' }
   *  , { type: 'put', key: 'occupation', value: 'Clown' }
   * ]
   * trie.batch(ops)
   * @param {Array} ops
   * @param {Function} cb
   */
  // @ts-ignore FIXME, we need to properly check the full file
  batch (ops: any[]) {
    return Promise.all(
      // @ts-ignore FIXME, we need to properly check the full file
      ops.map((op) => {
        if (op.type === 'put') {
          return this.put(op.key, op.value);
        } else if (op.type === 'del') {
          return this.del(op.key);
        }
      })
    );
  }

  /**
   * Checks if a given root exists
   * @method checkRoot
   * @param {Buffer} root
   * @param {Function} cb
   */
  async checkRoot (root: Uint8Array): Promise<boolean> {
    const value = await this._lookupNode(root);

    return !!value;
  }
}
