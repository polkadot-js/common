// Copyright 2017-2020 @polkadot/keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { KeyringInstance, KeyringOptions } from './types';

import { hexToU8a } from '@polkadot/util';

import createPair from './pair';
import Keyring from '.';

interface PairDef {
  name?: string;
  publicKey: Uint8Array;
  seed: string;
  secretKey?: Uint8Array;
  type?: 'ed25519' | 'sr25519';
}

// NOTE This is not great since we have the secretKey here explicitly, but a testing
// keyring is for testing - what happens is that in most cases the keyring is initialises
// before anything else. Since the sr25519 crypto is async, this creates problems with
// adding the keys when only the keyring is used.
export const PAIRS: PairDef[] = [
  {
    publicKey: hexToU8a('0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d'),
    secretKey: hexToU8a('0x98319d4ff8a9508c4bb0cf0b5a78d760a0b2082c02775e6e82370816fedfff48925a225d97aa00682d6a59b95b18780c10d7032336e88f3442b42361f4a66011'),
    seed: 'Alice'
  },
  {
    publicKey: hexToU8a('0xbe5ddb1579b72e84524fc29e78609e3caf42e85aa118ebfe0b0ad404b5bdd25f'),
    secretKey: hexToU8a('0xe8da6c9d810e020f5e3c7f5af2dea314cbeaa0d72bc6421e92c0808a0c584a6046ab28e97c3ffc77fe12b5a4d37e8cd4afbfebbf2391ffc7cb07c0f38c023efd'),
    seed: 'Alice//stash'
  },
  {
    publicKey: hexToU8a('0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48'),
    secretKey: hexToU8a('0x081ff694633e255136bdb456c20a5fc8fed21f8b964c11bb17ff534ce80ebd5941ae88f85d0c1bfc37be41c904e1dfc01de8c8067b0d6d5df25dd1ac0894a325'),
    seed: 'Bob'
  },
  {
    publicKey: hexToU8a('0xfe65717dad0447d715f660a0a58411de509b42e6efb8375f562f58a554d5860e'),
    secretKey: hexToU8a('0xc006507cdfc267a21532394c49ca9b754ca71de21e15a1cdf807c7ceab6d0b6c3ed408d9d35311540dcd54931933e67cf1ea10d46f75408f82b789d9bd212fde'),
    seed: 'Bob//stash'
  },
  {
    publicKey: hexToU8a('0x90b5ab205c6974c9ea841be688864633dc9ca8a357843eeacf2314649965fe22'),
    secretKey: hexToU8a('0xa8f2d83016052e5d6d77b2f6fd5d59418922a09024cda701b3c34369ec43a7668faf12ff39cd4e5d92bb773972f41a7a5279ebc2ed92264bed8f47d344f8f18c'),
    seed: 'Charlie'
  },
  {
    publicKey: hexToU8a('0x306721211d5404bd9da88e0204360a1a9ab8b87c66c1bc2fcdd37f3c2222cc20'),
    secretKey: hexToU8a('0x20e05482ca4677e0edbc58ae9a3a59f6ed3b1a9484ba17e64d6fe8688b2b7b5d108c4487b9323b98b11fe36cb301b084e920f7b7895536809a6d62a451b25568'),
    seed: 'Dave'
  },
  {
    publicKey: hexToU8a('0xe659a7a1628cdd93febc04a4e0646ea20e9f5f0ce097d9a05290d4a9e054df4e'),
    secretKey: hexToU8a('0x683576abfd5dc35273e4264c23095a1bf21c14517bece57c7f0cc5c0ed4ce06a3dbf386b7828f348abe15d76973a72009e6ef86a5c91db2990cb36bb657c6587'),
    seed: 'Eve'
  },
  {
    publicKey: hexToU8a('0x1cbd2d43530a44705ad088af313e18f80b53ef16b36177cd4b77b846f2a5f07c'),
    secretKey: hexToU8a('0xb835c20f450079cf4f513900ae9faf8df06ad86c681884122c752a4b2bf74d4303e4f21bc6cc62bb4eeed5a9cce642c25e2d2ac1464093b50f6196d78e3a7426'),
    seed: 'Ferdie'
  }
];

/**
 * @name testKeyring
 * @summary Create an instance of Keyring pre-populated with locked test accounts
 * @description The test accounts (i.e. alice, bob, dave, eve, ferdie)
 * are available on the dev chain and each test account is initialised with DOT funds.
 */
export default function testKeyring (options: KeyringOptions = {}, isDerived = true): KeyringInstance {
  const keyring = new Keyring(options);

  PAIRS.forEach(({ name, publicKey, secretKey, seed, type = 'sr25519' }): void => {
    const meta = {
      isTesting: true,
      name: name || seed.replace('//', '_').toLowerCase()
    };

    const pair = !isDerived && !name
      ? keyring.addFromUri(seed, meta, options.type)
      : keyring.addPair(
        createPair({ toSS58: keyring.encodeAddress, type }, { publicKey, secretKey }, meta)
      );

    pair.lock = (): void => {
      // we don't have lock/unlock functionality here
    };
  });

  return keyring;
}
