module.exports = {
  base: '/common/',
  title: 'polkadot-js/common',
  description: 'Utilities and libraries in-use accross @polkadot projects',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    displayAllHeaders: true,
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'GitHub', link: 'https://github.com/polkadot-js/common' }
    ],
    sidebar: [
      {
        title: 'Examples (keyring)',
        path: '/examples/keyring/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          ['/examples/keyring/01_create_account/', 'Create account'],
          ['/examples/keyring/02_load_accounts/', 'Load Accounts']
        ]
      },
      ['/util/', '@polkadot/util'],
      ['/util-crypto/', '@polkadot/util-crypto'],
      ['/keyring/', '@polkadot/keyring'],
      '/CONTRIBUTING.md'
    ]
  }
};
