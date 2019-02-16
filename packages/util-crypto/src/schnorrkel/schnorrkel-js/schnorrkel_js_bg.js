
const bytes = require('./schnorrkel_js_wasm');

module.exports = async function createExportPromise (wasmImports) {
  const imports = {
    './schnorrkel_js': wasmImports
  };

  if (!WebAssembly) {
    return null;
  }

  try {
    const { instance } = await WebAssembly.instantiate(bytes, imports);

    return instance.exports;
  } catch (error) {
    return null;
  }
}
