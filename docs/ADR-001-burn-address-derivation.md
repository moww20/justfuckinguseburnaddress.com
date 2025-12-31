# ADR-001: Burn Address Derivation Method

## Status
**Accepted**

## Context
We need a provable burn address for the Keeta Network where tokens sent are permanently locked with no private key.

## Decision

### RFC 9380 Hash-to-Curve
- **Method**: `hashToCurve(seed)` using RFC 9380 Elligator2
- **Seed**: `KEETA_BURN_FUCKING_ADDRESS`
- **Curve Point**: `87cd3326f756e268fa58490de86eb87ecbfdebd77c7708bb9f0a480bb6203f6a`
- **Address**: `keeta_agd42mzg65loe2h2lbeq32doxb7mx7pl256hocf3t4feqc5wea7wv7xtd2gue`

The output is mathematically guaranteed to be a valid Ed25519 point. No private key exists.

## Verification
```bash
bun run scripts/verify.ts
```

## Consequences
- The address is provably unspendable
- Anyone can independently verify the derivation
- Fully IETF-standardized (RFC 9380)
