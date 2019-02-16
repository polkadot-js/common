
const bytes = require('./schnorrkel_js_wasm');

module.exports = async function createExportPromise (wasmImports) {
  const imports = {
    './schnorrkel_js': wasmImports
  };

  return WebAssembly
    .instantiate(bytes, imports)
    .then((wasm) => wasm.instance.exports);
}
