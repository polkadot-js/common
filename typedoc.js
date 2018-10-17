module.exports = {
  name: 'Polkadot JS Common',
  exclude: [],
  excludeExternals: true,
  excludeNotExported: true,
  excludeProtected: true,
  excludePrivate: true,
  hideGenerator: true,
  includeDeclarations: false,
  out: 'docs',
  module: 'commonjs',
  moduleResolution: 'node',
  mdEngine: 'gitbook',
  stripInternal: 'true',
  theme: 'markdown'
};
