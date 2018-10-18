# @polkadot/db

This is an implementation of a basic sync in-memory and on-disk database with overlays. Memory is currently used by polkadot-js/client

## Usage

Installation -

```
yarn add @polkadot/db
```

Classes can be imported as follows:

```js
// Default exports
import DiskDb from '@polkadot/db/Disk';
import MemoryDb from '@polkadot/db/Memory';
import TransactionDb from '@polkadot/db/engines/TransactionDb';
```

## Documentation and Available Utilities

No classes or methods are exposed on the [Polkadot-JS Common Documentation Portal](https://polkadot.js.org/common/db/).

However, the key classes that are available include:

- db
  - Classes
    - Engines
      - DiskDb
      - MemoryDb
      - TransactionDb