// Copyright 2017-2021 @polkadot/x-bundle authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Adapted from https://github.com/isaacs/inherits/blob/dbade4c47c548aa7259017eca8874d61c8aaad2b/inherits_browser.js
// The ISC License
// Copyright (c) Isaac Z. Schlueter

export default function inherits (child: Record<string, unknown>, parent: Record<string, unknown>): void {
  if (parent) {
    child.super_ = parent;
    child.prototype = Object.create(parent.prototype as object, {
      constructor: {
        configurable: true,
        enumerable: false,
        value: child,
        writable: true
      }
    });
  }
}
