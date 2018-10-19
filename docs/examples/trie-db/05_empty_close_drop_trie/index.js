const toU8a = require('@polkadot/util/u8a/toU8a').default;
const Trie = require('@polkadot/trie-db').default;
const {
  isEmptyNode,
  isKvNode
} = require('@polkadot/trie-db/util/is');

async function main () {
  const trie = new Trie();

  // Open the database for each of the trie instances
  trie.open();

  // Initial root value is valid
  console.log(`Initial root Uint8Array value: ${trie.getRoot()}`);

  // Create a branch under the trie root with a key of 'branch1' and 'branch2'
  // and a value of 'one' and 'two'
  trie.put(toU8a('branch1'), toU8a('one'));
  trie.put(toU8a('branch2'), toU8a('two'));

  // Retrieve the value of a given key named 'branch1' and 'branch2' in the trie
  console.log(`Stored value of key 'branch1': ${trie.get(toU8a('branch1'))}`);
  console.log(`Stored value of key 'branch2': ${trie.get(toU8a('branch2'))}`);

  // Store the root hash of the trie root node in a variable
  const trieRootNodeHash = trie.getRoot();

  // Store the root node object in a variable
  const trieRootNode = trie.getNode(trieRootNodeHash);

  // Show information about the trie node
  console.log(`Is root node object empty? : ${isEmptyNode(trieRootNode)}`);
  console.log(`Is root node object a KV node? : ${isKvNode(trieRootNode)}`);

  // Deletes the value of a given key named 'branch1' in the trie branch
  trie.del(toU8a('branch1'));

  // Retrieve the value of a given key named 'test' in the trie
  console.log(`Stored value of key 'branch1': ${trie.get(toU8a('branch1'))}`);

  // Empty, close, and drop the database for each of the trie instances
  trie.empty();

  // Retrieve the value of a given key named 'test' in the trie
  console.log(`Stored value of key 'branch2': ${trie.get(toU8a('branch2'))}`);

  // Close the trie
  trie.close();

  // Drop the trie
  trie.drop();
}

main().catch(console.error).finally(_ => process.exit());
