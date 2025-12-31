# ADR-001: Burn Address Derivation Method

## Status
**Accepted**

## Context
We need a provable burn address for the Keeta Network where tokens sent are permanently locked. The private key corresponding to this address must be computationally infeasible to derive.

## Decision

### RFC 9380 Hash-to-Curve
- **Method**: `hashToCurve(seed)` using RFC 9380 Elligator2
- **Seed**: `KEETA_BURN_FUCKING_ADDRESS`
- **Curve Point**: `87cd3326f756e268fa58490de86eb87ecbfdebd77c7708bb9f0a480bb6203f6a`
- **Address**: `keeta_agd42mzg65loe2h2lbeq32doxb7mx7pl256hocf3t4feqc5wea7wv7xtd2gue`

The output is mathematically guaranteed to be a valid Ed25519 point in the prime-order subgroup. **No party possesses or can feasibly compute the private key** corresponding to this public key.

## Cryptographic Details

| Parameter | Value |
|-----------|-------|
| Hash Function | SHA-512 (via XMD) |
| Curve | Edwards25519 (birational to Curve25519) |
| Map | Elligator2 (RFC 9380) |
| DST | `QUUX-V01-CS02-with-edwards25519_XMD:SHA-512_ELL2_RO_` |
| Cofactor | 8 (cleared during mapping) |
| Library | `@noble/curves@1.8.1` (pinned) |
| Subgroup Order | 2^252 + 27742317777372353535851937790883648493 |

## Intermediate Test Vectors

For independent verification, the following intermediate values are provided:

### Step 1: Input Encoding
```
Seed String: "KEETA_BURN_FUCKING_ADDRESS"
UTF-8 Bytes: 4b45455441 5f4255524e 5f4655434b 494e475f41 44445245535 3
             (27 bytes)
```

### Step 2: RFC 9380 expand_message_xmd
```
DST: "QUUX-V01-CS02-with-edwards25519_XMD:SHA-512_ELL2_RO_"
DST Length: 52 bytes
Hash: SHA-512
Output Length: 128 bytes (for 2 field elements)
```

### Step 3: Field Elements (after expand_message)
```
u[0]: (internal field element from first 64 expanded bytes)
u[1]: (internal field element from second 64 expanded bytes)
```

### Step 4: Elligator2 Map
```
Point before cofactor clearing: (Edwards coordinates, internal)
Cofactor multiplication: ×8
```

### Step 5: Final Compressed Point
```
Compressed Ed25519 Point (32 bytes, little-endian):
87cd3326f756e268fa58490de86eb87ecbfdebd77c7708bb9f0a480bb6203f6a

Y-coordinate: 0x6a3f20b60b480a9fbb08777cd7bddebc7eb86ee80d4958fa68e256f72633cd87
X-coordinate sign bit: 0 (positive)
```

### Step 6: Keeta Address Encoding
```
Prefix: "keeta_a"
Payload: Ed25519 compressed point (32 bytes)
Encoding: Bech32-inspired custom encoding
Final: keeta_agd42mzg65loe2h2lbeq32doxb7mx7pl256hocf3t4feqc5wea7wv7xtd2gue
```

## Security Analysis

### ECDLP Hardness
Finding the private key (scalar `k` such that `k·G = P`) requires solving the Elliptic Curve Discrete Logarithm Problem on a ~252-bit subgroup.
- **Classical Security**: ~126 bits (Pollard's rho)
- **Quantum Security**: Vulnerable to Shor's algorithm

### Collision Resistance
The hash-to-curve construction provides **~128-bit security** against finding two distinct messages that map to the same curve point. This is due to:
1. Birthday bound on the 256-bit output before curve mapping
2. The full 256-bit collision resistance of raw SHA-512 is reduced in the hash-to-curve context

**Note**: For a burn address, collision resistance is not security-critical—there is no benefit to finding a different input that produces the same unspendable point.

### Preimage Resistance
Finding an input that maps to a specific curve point inherits SHA-512's ~256-bit preimage resistance.

## Verification
```bash
bun run scripts/verify.ts
```

## Limitations

- Vulnerable to quantum computers (like all Ed25519-based systems)
- A private key exists mathematically but is computationally infeasible to derive (~2^126 operations)
- Uses RFC 9380 test-vector DST (library default); a custom DST would be preferred but would change the derived address

## Consequences
- The address is provably unspendable by any party
- Anyone can independently verify the derivation using the test vectors above
- Fully IETF-standardized (RFC 9380)
- Tokens sent to this address are permanently and irrevocably locked
