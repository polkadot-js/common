// Copyright 2017-2020 @polkadot/util authors & contributors
// SPDX-License-Identifier: Apache-2.0

const path = require('path');

module.exports = function resolver (file, config) {
  return file.includes('package.json')
    ? path.join(config.basedir.replace('/src', '/'), file)
    : config.defaultResolver(file, config);
};
