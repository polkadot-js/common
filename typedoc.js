module.exports = {
  exclude: '**/*+(index|e2e|spec).ts',
  excludeExternals: true,
  excludeNotExported: true,
  excludePrivate: true,
  excludeProtected: true,
  hideGenerator: true,
  includeDeclarations: false,
  module: 'commonjs',
  moduleResolution: 'node',
  name: 'Polkadot JS Common',
  out: 'docs',
  stripInternal: 'true',
  theme: 'markdown'
};
