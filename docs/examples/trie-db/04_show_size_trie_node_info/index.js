const toU8a = require('@polkadot/util/u8a/toU8a').default;
const Trie = require('@polkadot/trie-db').default;
const {
  isEmptyNode,
  isKvNode,
  isExtensionNode,
  isLeafNode,
  isBranchNode
} = require('@polkadot/trie-db/util/is');

async function main () {
  const trie = new Trie();

  // Use `back` to later store a snapshot of the `trie`
  const back = new Trie();

  // Open the database for each of the trie instances
  trie.open();
  back.open();

  // Initial root value is valid
  console.log(`Initial root Uint8Array value: ${trie.getRoot()}`);

  // Create two branches under the trie root with
  // key 'branch1' and 'branch2' and a values of 'one' and 'two'
  trie.put(toU8a('test'), toU8a('one'));
  trie.put(toU8a('test'), toU8a('two'));

  // Store the root hash of the trie root node in a variable
  const trieRootNodeHash = trie.getRoot();

  // Store the root node object in a variable
  const trieRootNode = trie.getNode(trieRootNodeHash);

  // Show the node object of the root node hash
  console.log(`Root node object: ${trieRootNode}`);

  // Show information about the trie node
  console.log(`Is root node object empty? : ${isEmptyNode(trieRootNode)}`);
  console.log(`Is root node object a KV node? : ${isKvNode(trieRootNode)}`);

  // Show information about the trie that is Merkle Patricia Trie specific
  // Reference: https://github.com/ethereum/wiki/wiki/Patricia-Tree#optimization
  console.log(`Is root node object an Extension node? : ${isExtensionNode(trieRootNode)}`);
  console.log(`Is root node object an Leaf node? : ${isLeafNode(trieRootNode)}`);
  console.log(`Is root node object an Branch node? : ${isBranchNode(trieRootNode)}`);

  // Retrieve the value of a given key named 'test' in the trie
  console.log(`Current value of key 'test': ${trie.get(toU8a('test'))}`);

  // Create a snapshot of the `trie` data into `back`
  trie.snapshot(back, () => {});

  // Show that value of the snapshot's root is the same as the original trie's root
  console.log(`Snapshot root value matches original trie root: ${back.getRoot() === trie.getRoot()}`);

  // Deletes the value of a given key named 'test' in the trie branch
  trie.del(toU8a('test'));

  // Show size of the database for each of the trie instances
  console.log(`Size of 'trie' database: ${trie.size()}`);
  console.log(`Size of 'back' database: ${back.size()}`);
}

main().catch(console.error).finally(_ => process.exit());
