// Copyright 2017-2024 @polkadot/x-bundle authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Adapted from https://github.com/isaacs/inherits/blob/dbade4c47c548aa7259017eca8874d61c8aaad2b/inherits_browser.js
// The ISC License
// Copyright (c) Isaac Z. Schlueter

interface Class {
  prototype: object;
  super_: Class;

  [key: string]: unknown;
}

export default function inherits (child: Class, parent: Class): void {
  if (parent) {
    child.super_ = parent;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    child.prototype = Object.create(parent.prototype, {
      constructor: {
        configurable: true,
        enumerable: false,
        value: child,
        writable: true
      }
    });
  }
}
