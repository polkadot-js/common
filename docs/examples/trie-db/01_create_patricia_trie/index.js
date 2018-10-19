const Trie = require('@polkadot/trie-db').default;

async function main () {
  const trie = new Trie();

  // Open the database for each of the trie instances
  trie.open();

  // Initial root value is valid
  console.log(`Initial root Uint8Array value: ${trie.getRoot()}`);
}

main().catch(console.error).finally(_ => process.exit());
