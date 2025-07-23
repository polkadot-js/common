# Generation 4 Encoding Format

## Overview

Generation 4 encoding format was introduced in polkadot-js/common to support variable-length cryptographic keys, primarily for experimental post-quantum signature algorithms like ML-DSA (Module-Lattice-Based Digital Signature Algorithm). This format addresses the limitations of previous generations that assumed fixed 32-byte public keys and 64-byte secret keys.

**Note**: Post-quantum cryptography is still an emerging field. While ML-DSA is standardized by NIST, real-world performance characteristics, security implications, and adoption patterns are not yet fully understood. This implementation should be considered experimental.

## Motivation

Traditional cryptographic algorithms (ed25519, sr25519, ecdsa) use relatively small, fixed-size keys:
- Public keys: 32 bytes
- Secret keys: 64 bytes (or 32 bytes for seeds)

Experimental post-quantum algorithms require significantly larger keys:
- **ML-DSA-87**: 2,592-byte public keys, 4,896-byte secret keys
- **Future algorithms**: May require even larger or different-sized keys

Generation 4 encoding provides a flexible format that can accommodate any key size while maintaining backward compatibility, though the practical implications of such large key sizes in real-world applications are still being evaluated.

## Format Specification

### Structure

Generation 4 encoded data follows this structure:

```
[HEADER] + [CRYPTO_TYPE] + [SECRET_LENGTH] + [SECRET_KEY] + [DIVIDER] + [PUBLIC_LENGTH] + [PUBLIC_KEY]
```

### Field Details

| Field | Size | Description |
|-------|------|-------------|
| `HEADER` | 16 bytes | Generation 4 magic header: `[48, 84, 2, 1, 4, 48, 5, 6, 3, 43, 101, 112, 4, 34, 4, 32]` |
| `CRYPTO_TYPE` | 1 byte | Cryptographic algorithm identifier |
| `SECRET_LENGTH` | 4 bytes | Length of secret key (little-endian uint32) |
| `SECRET_KEY` | Variable | The secret key bytes |
| `DIVIDER` | 5 bytes | Section divider: `[161, 35, 4, 33, 0]` |
| `PUBLIC_LENGTH` | 4 bytes | Length of public key (little-endian uint32) |
| `PUBLIC_KEY` | Variable | The public key bytes |

### Crypto Type Identifiers

| Algorithm | ID | Description |
|-----------|----|-----------| 
| `ed25519` | 0 | Edwards-curve Digital Signature Algorithm |
| `sr25519` | 1 | Schnorr signature on Ristretto |
| `ecdsa` | 2 | Elliptic Curve Digital Signature Algorithm |
| `mldsa` | 3 | Module-Lattice-Based Digital Signature Algorithm |

## Usage

### Automatic Format Selection

The encoding system automatically selects the appropriate generation based on key sizes:

```typescript
// Automatically uses Generation 4 for MLDSA
const mldsaKeypair = mldsaPairFromSeed(seed);
const encoded = encodePair(mldsaKeypair, passphrase, 'mldsa');

// Automatically uses Generation 3 for standard keys  
const ed25519Keypair = ed25519PairFromSeed(seed);
const encoded = encodePair(ed25519Keypair, passphrase, 'ed25519');
```

### Manual Generation 4 Encoding

```typescript
import { encodePairV4 } from '@polkadot/keyring/pair';

const encoded = encodePairV4(
  { publicKey, secretKey },
  'mldsa',  // crypto type (optional)
  'password123'  // passphrase (optional)
);
```

### Decoding

Decoding automatically detects the generation format:

```typescript
import { decodePair } from '@polkadot/keyring/pair';

// Works for both Generation 3 and 4 formats
const decoded = decodePair('password123', encodedData);
```

## Key Size Requirements

Generation 4 encoding is automatically triggered when:
- Public key length ≠ 32 bytes, OR
- Secret key length ≠ 64 bytes

This ensures backward compatibility while supporting new algorithms.

## Differences from Previous Generations

### Generation 1-3 (Legacy)
- Fixed 32-byte public keys
- Fixed 64-byte secret keys  
- Simple concatenation format
- No crypto type identification

### Generation 4 (Current)
- Variable-length keys
- Explicit length encoding
- Crypto type identification
- Future-proof extensible format

## Example: MLDSA Keypair

```typescript
import { Keyring } from '@polkadot/keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

await cryptoWaitReady();

const keyring = new Keyring({ type: 'mldsa' });
const pair = keyring.addFromSeed(randomAsU8a(32));

// Creates Generation 4 encoded JSON
const json = pair.toJson('password123');

// Can be imported back
const imported = keyring.addFromJson(json);
imported.unlock('password123');
```

## Encryption

Like previous generations, Generation 4 supports optional encryption:

- **Without passphrase**: Raw encoded data
- **With passphrase**: Encrypted using scrypt + nacl secretbox

```typescript
// Unencrypted (raw format)
const raw = encodePairV4(keypair, 'mldsa');

// Encrypted 
const encrypted = encodePairV4(keypair, 'mldsa', 'password');
```

## Migration Considerations

### Backward Compatibility
- Generation 4 is fully backward compatible
- Existing Generation 1-3 data continues to work
- No migration required for existing users

### Forward Compatibility
- New crypto algorithms automatically use Generation 4
- Format is extensible for future requirements
- Additional crypto types can be added

### JSON Export/Import
Generation 4 keypairs can be exported to and imported from JSON format, maintaining compatibility with the existing keyring ecosystem (though practical deployment considerations for large key sizes are still being evaluated):

```typescript
// Export MLDSA keypair to JSON
const json = pair.toJson('password');

// Import from JSON
const imported = keyring.addFromJson(json);
imported.unlock('password');
```

## Security Considerations

### Passphrase Protection
- Same encryption scheme as previous generations
- scrypt for key derivation (resistant to brute force)
- nacl secretbox for authenticated encryption

### Key Size Validation
- Length fields help prevent buffer overflow attacks
- Reasonable maximum key sizes are enforced (though optimal limits for post-quantum keys are still being determined)
- Invalid formats are rejected with clear error messages

### Crypto Type Validation  
- Helps ensure keys match expected algorithm
- Designed to prevent algorithm confusion attacks
- Future algorithms can be added (though security implications of algorithm mixing in post-quantum contexts require further study)

## Implementation Details

### Endianness
- Length fields use **little-endian** encoding
- Consistent with existing polkadot-js conventions
- Cross-platform compatible

### Error Handling
The decoder provides specific error messages:
- `"Invalid Generation 4 encoding header found in body"`
- `"Invalid Generation 4 encoding divider found in body"`
- `"Invalid MLDSA key sizes: secret=X, public=Y"`

### Performance
- Minimal encoding overhead compared to Generation 3
- Only 9 extra bytes for length fields and crypto type
- Efficient streaming decode possible (though overall performance implications of large post-quantum keys in real applications are not yet fully characterized)

## Testing

Test coverage includes:
- Round-trip encoding/decoding
- Various key sizes and crypto types
- Error conditions and edge cases
- Backward compatibility verification
- Basic performance validation

See `generation4.spec.ts` for detailed test cases. Note that while the encoding format is thoroughly tested, real-world usage patterns and performance characteristics with post-quantum algorithms are still being evaluated.

## Future Extensions

The Generation 4 format is designed to be extensible:

### Potential Additions
- Additional crypto type identifiers
- Extended metadata fields
- Compressed key formats
- Hybrid classical/post-quantum schemes

### Version Management
- Format version is embedded in header
- Future generations can be added seamlessly
- Decoder automatically selects appropriate handler

## References

- [ML-DSA Specification](https://csrc.nist.gov/pubs/fips/204/final)
- [NIST Post-Quantum Cryptography Standards](https://csrc.nist.gov/projects/post-quantum-cryptography)
- [polkadot-js/common Documentation](https://polkadot.js.org/docs/)

---

**Note**: This format has been implemented and tested for correctness, but should be considered experimental given the early stage of post-quantum cryptography adoption. Real-world deployment should be carefully evaluated based on specific use case requirements and risk tolerance.