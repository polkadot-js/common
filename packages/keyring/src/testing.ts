// Copyright 2017-2025 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@polkadot/util/types';
import type { KeypairType } from '@polkadot/util-crypto/types';
import type { KeyringInstance, KeyringOptions } from './types.js';

import { hexToU8a } from '@polkadot/util';

import { createPair } from './pair/index.js';
import { Keyring } from './keyring.js';

interface PairDef {
  name?: string;
  p: HexString;
  s: HexString;
  seed?: string;
  type: KeypairType
}

// NOTE This is not great since we have the secretKey here explicitly, but a testing
// keyring is for testing - what happens is that in most cases the keyring is initialises
// before anything else. Since the sr25519 crypto is async, this creates problems with
// adding the keys when only the keyring is used.
export const PAIRSSR25519: PairDef[] = [
  {
    p: '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
    s: '0x98319d4ff8a9508c4bb0cf0b5a78d760a0b2082c02775e6e82370816fedfff48925a225d97aa00682d6a59b95b18780c10d7032336e88f3442b42361f4a66011', // nosemgrep
    seed: 'Alice',
    type: 'sr25519'
  },
  {
    p: '0xbe5ddb1579b72e84524fc29e78609e3caf42e85aa118ebfe0b0ad404b5bdd25f',
    s: '0xe8da6c9d810e020f5e3c7f5af2dea314cbeaa0d72bc6421e92c0808a0c584a6046ab28e97c3ffc77fe12b5a4d37e8cd4afbfebbf2391ffc7cb07c0f38c023efd', // nosemgrep
    seed: 'Alice//stash',
    type: 'sr25519'
  },
  {
    p: '0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48',
    s: '0x081ff694633e255136bdb456c20a5fc8fed21f8b964c11bb17ff534ce80ebd5941ae88f85d0c1bfc37be41c904e1dfc01de8c8067b0d6d5df25dd1ac0894a325', // nosemgrep
    seed: 'Bob',
    type: 'sr25519'
  },
  {
    p: '0xfe65717dad0447d715f660a0a58411de509b42e6efb8375f562f58a554d5860e',
    s: '0xc006507cdfc267a21532394c49ca9b754ca71de21e15a1cdf807c7ceab6d0b6c3ed408d9d35311540dcd54931933e67cf1ea10d46f75408f82b789d9bd212fde', // nosemgrep
    seed: 'Bob//stash',
    type: 'sr25519'
  },
  {
    p: '0x90b5ab205c6974c9ea841be688864633dc9ca8a357843eeacf2314649965fe22',
    s: '0xa8f2d83016052e5d6d77b2f6fd5d59418922a09024cda701b3c34369ec43a7668faf12ff39cd4e5d92bb773972f41a7a5279ebc2ed92264bed8f47d344f8f18c', // nosemgrep
    seed: 'Charlie',
    type: 'sr25519'
  },
  {
    p: '0x306721211d5404bd9da88e0204360a1a9ab8b87c66c1bc2fcdd37f3c2222cc20',
    s: '0x20e05482ca4677e0edbc58ae9a3a59f6ed3b1a9484ba17e64d6fe8688b2b7b5d108c4487b9323b98b11fe36cb301b084e920f7b7895536809a6d62a451b25568', // nosemgrep
    seed: 'Dave',
    type: 'sr25519'
  },
  {
    p: '0xe659a7a1628cdd93febc04a4e0646ea20e9f5f0ce097d9a05290d4a9e054df4e',
    s: '0x683576abfd5dc35273e4264c23095a1bf21c14517bece57c7f0cc5c0ed4ce06a3dbf386b7828f348abe15d76973a72009e6ef86a5c91db2990cb36bb657c6587', // nosemgrep
    seed: 'Eve',
    type: 'sr25519'
  },
  {
    p: '0x1cbd2d43530a44705ad088af313e18f80b53ef16b36177cd4b77b846f2a5f07c',
    s: '0xb835c20f450079cf4f513900ae9faf8df06ad86c681884122c752a4b2bf74d4303e4f21bc6cc62bb4eeed5a9cce642c25e2d2ac1464093b50f6196d78e3a7426', // nosemgrep
    seed: 'Ferdie',
    type: 'sr25519'
  }
];

export const PAIRSETHEREUM: PairDef[] = [
  {
    name: 'Alith',
    p: '0x02509540919faacf9ab52146c9aa40db68172d83777250b28e4679176e49ccdd9f',
    s: '0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133', // nosemgrep
    type: 'ethereum'
  },
  {
    name: 'Baltathar',
    p: '0x033bc19e36ff1673910575b6727a974a9abd80c9a875d41ab3e2648dbfb9e4b518',
    s: '0x8075991ce870b93a8870eca0c0f91913d12f47948ca0fd25b49c6fa7cdbeee8b', // nosemgrep
    type: 'ethereum'
  },
  {
    name: 'Charleth',
    p: '0x0234637bdc0e89b5d46543bcbf8edff329d2702bc995e27e9af4b1ba009a3c2a5e',
    s: '0x0b6e18cafb6ed99687ec547bd28139cafdd2bffe70e6b688025de6b445aa5c5b', // nosemgrep
    type: 'ethereum'
  },
  {
    name: 'Dorothy',
    p: '0x02a00d60b2b408c2a14c5d70cdd2c205db8985ef737a7e55ad20ea32cc9e7c417c',
    s: '0x39539ab1876910bbf3a223d84a29e28f1cb4e2e456503e7e91ed39b2e7223d68', // nosemgrep
    type: 'ethereum'
  },
  {
    name: 'Ethan',
    p: '0x025cdc005b752651cd3f728fb9192182acb3a9c89e19072cbd5b03f3ee1f1b3ffa',
    s: '0x7dce9bc8babb68fec1409be38c8e1a52650206a7ed90ff956ae8a6d15eeaaef4', // nosemgrep
    type: 'ethereum'
  },
  {
    name: 'Faith',
    p: '0x037964b6c9d546da4646ada28a99e34acaa1d14e7aba861a9055f9bd200c8abf74',
    s: '0xb9d2ea9a615f3165812e8d44de0d24da9bbd164b65c4f0573e1ce2c8dbd9c8df', // nosemgrep
    type: 'ethereum'
  }
];

function createMeta (name?: string, seed?: string) {
  if (!name && !seed) {
    throw new Error('Testing pair should have either a name or a seed');
  }

  return {
    isTesting: true,
    name: name || seed?.replace('//', '_').toLowerCase()
  };
}

/**
 * @name testKeyring
 * @summary Create an instance of Keyring pre-populated with locked test accounts
 * @description The test accounts (i.e. alice, bob, dave, eve, ferdie)
 * are available on the dev chain and each test account is initialized with DOT funds.
 */
export function createTestKeyring (options: KeyringOptions = {}, isDerived = true): KeyringInstance {
  const keyring = new Keyring(options);
  const pairs = options.type === 'ethereum'
    ? PAIRSETHEREUM
    : PAIRSSR25519;

  for (const { name, p, s, seed, type } of pairs) {
    const meta = createMeta(name, seed);
    const pair = !isDerived && !name && seed
      ? keyring.addFromUri(seed, meta, options.type)
      : keyring.addPair(
        createPair(
          { toSS58: keyring.encodeAddress, type },
          { publicKey: hexToU8a(p), secretKey: hexToU8a(s) },
          meta
        )
      );

    pair.lock = (): void => {
      // we don't have lock/unlock functionality here
    };
  }

  return keyring;
}
