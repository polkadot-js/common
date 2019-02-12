***Added here until publiched on NPM and we have a proper solution for node & browser in the core***

# Schnorrkel-js

Provides a Javascript wrapper for some of the high-level functionality provded by schnorrkel.

# Build

Current experimental setup is created using [`wasm-pack`](https://rustwasm.github.io/wasm-pack/installer/) and [`webpack/node/npm`](https://www.npmjs.com/get-npm). Make sure to have both of them, alongside the latest **nightly** version of Rust installed.

In the root of the project run:

```bash
wasm-pack build --target browser
```

A directory named `pkg` should be created. Then:

```bash
cd pkg
npm link
```

This creates a local binding to npm, instructing it to use this folder whenever `schnorrkel-js` was imported as an npm module using `require()` or `import`.

Next, create head to the provided `www` folder (experimental test folder created via npm: `npm init wasm-app www`) and:

```
# Run just once
npm link schnorrkel-js
npm install
npm run start
```

The current `index.js` does absolutely nothing. It just binds the compiled wasm blob as a parsed object to the `window` object so that it can be easily tested in the console.

```javascript
import * as schnorrkel from 'schnorrkel-js'

window.schnorrkel = schnorrkel
```

To make any further changes, given that the linking with `npm link` is correct, just re-compile with `wasm-pack build` and let the `npm run start` be running in a separate process. It should automatically reload.
