// Copyright 2017-2021 @polkadot/x-bundle authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Adapted from https://github.com/isaacs/inherits/blob/dbade4c47c548aa7259017eca8874d61c8aaad2b/inherits_browser.js
// The ISC License
// Copyright (c) Isaac Z. Schlueter

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
function inherits (ctor: any, superCtor: any): any {
  if (superCtor) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    ctor.super_ = superCtor;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        configurable: true,
        enumerable: false,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value: ctor,
        writable: true
      }
    });
  }
}

export default inherits;
