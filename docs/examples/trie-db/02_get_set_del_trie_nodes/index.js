const toU8a = require('@polkadot/util/u8a/toU8a').default;
const Trie = require('@polkadot/trie-db').default;

async function main () {
  const trie = new Trie();

  // Open the database for each of the trie instances
  trie.open();

  // Initial root value is valid
  console.log(`Initial root Uint8Array value: ${trie.getRoot()}`);

  // Create a branch under the trie root with a key of 'test' and a value of 'one'
  trie.put(toU8a('test'), toU8a('one'));

  // Store the root hash of the trie root node in a variable
  const trieRootNodeHash = trie.getRoot();

  // Store the root node object in a variable
  const trieRootNode = trie.getNode(trieRootNodeHash);

  // Show the node object of the root node hash
  console.log(`Root node object: ${trieRootNode}`);

  // Show the updated root hash value of the trie root node
  console.log(`Updated root hash value: ${trie.getRoot()}`);

  const branch = trie.get(toU8a('test'));
  // Retrieve the value of a given key named 'test' in the trie
  console.log(`Current value of key 'test': ${branch}`);

  // Deletes the value of a given key named 'test' in the trie branch
  trie.del(toU8a('test'));

  // Retrieve the value of a given key named 'test' in the trie
  console.log(`Updated value of key 'test' after deleting it: ${trie.get(toU8a('test'))}`);

  // Set the root hash value of the trie root node (if necessary)
  trie.setRoot(trieRootNodeHash);

  // Show the node object of the root node hash
  console.log(`Root node object: ${trie.getRoot()}`);

  // Retrieve the value of a given key named 'test' in the trie
  console.log(`Restored value of key 'test' after restoring root node: ${branch}`);
}

main().catch(console.error).finally(_ => process.exit());
