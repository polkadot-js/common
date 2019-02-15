const bytes = require('./schnorrkel_js_wasm');

module.exports = function init (schnorrkel_js) {
  const imports = { './schnorrkel_js': schnorrkel_js };
  const wasmModule = new WebAssembly.Module(bytes);
  const wasmInstance = new WebAssembly.Instance(wasmModule, imports);

  return wasmInstance.exports;
};
