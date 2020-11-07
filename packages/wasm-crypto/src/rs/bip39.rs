// Copyright 2019-2020 @polkadot/wasm-crypto authors & contributors
// SPDX-License-Identifier: Apache-2.0

use bip39::{Mnemonic, MnemonicType, Language, Seed};
use hmac::Hmac;
use pbkdf2::pbkdf2;
use sha2::Sha512;
use wasm_bindgen::prelude::*;

/// Generate a bip39 phrase
///
/// words: number of words, either 12, 15, 18 21 or 24
///
/// Returns the bip 39 phrase
#[wasm_bindgen]
pub fn ext_bip39_generate(words: u32) -> String {
	Mnemonic::new(MnemonicType::for_word_count(words as usize).unwrap(), Language::English)
		.into_phrase()
}

/// Create entropy from a bip39 phrase
///
/// * phrase: mnemonic phrase
///
/// Returns the entropy
#[wasm_bindgen]
pub fn ext_bip39_to_entropy(phrase: &str) -> Vec<u8> {
	Mnemonic::from_phrase(phrase, Language::English)
		.unwrap()
		.entropy()
		.to_vec()
}

/// Create a mini-secret from a bip39 phrase
///
/// * phrase: mnemonic phrase
///
/// Returns the 32-byte mini-secret via entropy
#[wasm_bindgen]
pub fn ext_bip39_to_mini_secret(phrase: &str, password: &str) -> Vec<u8> {
	let salt = format!("mnemonic{}", password);
	let mnemonic = Mnemonic::from_phrase(phrase, Language::English).unwrap();
	let mut result = [0u8; 64];

	pbkdf2::<Hmac<Sha512>>(mnemonic.entropy(), salt.as_bytes(), 2048, &mut result);

	result[..32].to_vec()
}

/// Creates a BTC/ETH compatible seed from a bip-39 phrase
///
/// @phrase: mnemonic phrase
///
/// Returns a 32-byte seed
#[wasm_bindgen]
pub fn ext_bip39_to_seed(phrase: &str, password: &str) -> Vec<u8> {
	let mnemonic = Mnemonic::from_phrase(phrase, Language::English).unwrap();

	Seed::new(&mnemonic, password)
		.as_bytes()[..32]
		.to_vec()
}

/// Validates a bip39 phrase
///
/// * phrase: mnemonic phrase
///
/// Returns the true/false
#[wasm_bindgen]
pub fn ext_bip39_validate(phrase: &str) -> bool {
	match Mnemonic::validate(phrase, Language::English) {
		Err(_) => false,
		_ => true
	}
}

#[cfg(test)]
pub mod tests {
	use hex_literal::hex;
	use super::*;

	#[test]
	fn can_bip39_entropy() {
		let phrase = "legal winner thank year wave sausage worth useful legal winner thank yellow";
		let entropy = hex!("7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f");
		let result = ext_bip39_to_entropy(phrase);

		assert_eq!(result, entropy);
	}

	#[test]
	fn can_bip39_mini_secret() {
		let phrase = "legal winner thank year wave sausage worth useful legal winner thank yellow";
		let password = "Substrate";
		let mini = hex!("4313249608fe8ac10fd5886c92c4579007272cb77c21551ee5b8d60b78041685");
		let result = ext_bip39_to_mini_secret(phrase, password);

		assert_eq!(result[..], mini[..]);
	}

	#[test]
	fn can_bip39_seed() {
		let phrase = "seed sock milk update focus rotate barely fade car face mechanic mercy";
		let seed = hex!("3c121e20de068083b49c2315697fb59a2d9e8643c24e5ea7628132c58969a027");
		let result = ext_bip39_to_seed(phrase, "");

		assert_eq!(result[..], seed[..]);
	}

	#[test]
	fn can_bip39_generate() {
		let phrase = ext_bip39_generate(12);
		let is_valid = ext_bip39_validate(&phrase);

		assert!(is_valid);
	}

	#[test]
	fn can_bip39_validate() {
		let is_valid = ext_bip39_validate("seed sock milk update focus rotate barely fade car face mechanic mercy");
		let is_invalid = ext_bip39_validate("wine photo extra cushion basket dwarf humor cloud truck job boat submit");

		assert_eq!(is_valid, true);
		assert_eq!(is_invalid, false);
	}
}
