module.exports = {
  base: '/common/',
  title: 'polkadot-js/common',
  description: 'Common utilities and libraries that are in use accross all @polkadot projects',
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      { text: 'Polkadot/Substrate Apps', link: 'https://polkadot.js.org/apps/' },
      { text: 'Project family', link: 'https://polkadot.js.org/' },
      {
        text: 'Documentation',
        items: [
          { text: 'API Reference', link: 'https://polkadot.js.org/api/' },
          { text: 'Utility Reference (this)', link: 'https://polkadot.js.org/common/' },
          { text: 'UI Libs Reference', link: 'https://polkadot.js.org/ui/' },
        ]
      },
      { text: 'GitHub', link: 'https://github.com/polkadot-js/common' }
    ],
    search: false,
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
