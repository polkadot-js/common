const bytes = require('./schnorrkel_js_wasm');

module.exports = function init (schnorrkel_js) {
  const imports = {
    './schnorrkel_js': schnorrkel_js
  };

  return WebAssembly
    .instantiate(bytes, imports)
    .then((wasm) => wasm.instance.exports);
};
