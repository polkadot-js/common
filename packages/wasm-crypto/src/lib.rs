// Copyright 2019-2020 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

// Use `wee_alloc` as the global allocator.
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[path = "rs/bip39.rs"]
pub mod bip39;

#[path = "rs/ed25519.rs"]
pub mod ed25519;

#[path = "rs/hashing.rs"]
pub mod hashing;

#[path = "rs/sr25519.rs"]
pub mod sr25519;
