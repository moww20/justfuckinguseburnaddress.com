# ADR-001: Burn Address Derivation Method

## Status
**Accepted**

## Context
We need a provable burn address for the Keeta Network where tokens sent are permanently locked with no known private key.

## Decision

### RFC 9380 Hash-to-Curve
- **Method**: `hashToCurve(seed)` using RFC 9380 Elligator2
- **Seed**: `KEETA_BURN_FUCKING_ADDRESS`
- **Curve Point**: `87cd3326f756e268fa58490de86eb87ecbfdebd77c7708bb9f0a480bb6203f6a`
- **Address**: `keeta_agd42mzg65loe2h2lbeq32doxb7mx7pl256hocf3t4feqc5wea7wv7xtd2gue`

The output is mathematically guaranteed to be a valid Ed25519 point. No known private key exists.

## Cryptographic Details

| Parameter | Value |
|-----------|-------|
| Hash Function | SHA-512 (via XMD) |
| Curve | Edwards25519 (birational to Curve25519) |
| Map | Elligator2 (RFC 9380) |
| DST | `QUUX-V01-CS02-with-edwards25519_XMD:SHA-512_ELL2_RO_` |
| Cofactor | 8 (cleared during mapping) |
| Library | @noble/curves@1.8.1 |

## Verification
```bash
bun run scripts/verify.ts
```

## Limitations

- Vulnerable to quantum computers (like all Ed25519-based systems)
- Private key exists mathematically but is computationally infeasible to derive

## Consequences
- The address is provably unspendable
- Anyone can independently verify the derivation
- Fully IETF-standardized (RFC 9380)
