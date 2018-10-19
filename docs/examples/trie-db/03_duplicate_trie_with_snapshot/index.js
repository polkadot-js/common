const Trie = require('@polkadot/trie-db').default;

async function main () {
  const trie = new Trie();

  // Use `back` to later store a snapshot of the `trie`
  const back = new Trie();

  // Open the database for each of the trie instances
  trie.open();
  back.open();

  // Initial root value is valid
  console.log(`Initial root Uint8Array value: ${trie.getRoot()}`);

  // Create a snapshot of the `trie` data into `back`
  trie.snapshot(back, () => {});

  // Show value of snapshot's root is same as original trie's root
  console.log(`Snapshot root value matches original trie root: ` +
              `${back.getRoot() === trie.getRoot()}`);
}

main().catch(console.error).finally(_ => process.exit());
