# Cryptographic Audit: Keeta Dead Wallet Implementation

**To:** Keeta Engineering Team
**From:** Department of Applied Cryptography
**Date:** 2026-01-01
**Subject:** CRITICAL FINDINGS: Implementation Inconsistencies & Protocol Review

## Executive Summary

I have reviewed the "dead wallet" implementation across `docs/ADR-001`, `src/App.tsx`, and the `scripts/` directory. While the core cryptographic theoretical approach (RFC 9380 Hash-to-Curve) is sound and represents the gold standard for "Nothing-Up-My-Sleeve" (NUMS) address generation, the **implementation discipline is lax and dangerous**.

The codebase contains **conflicting sources of truth**. A "provable" system that presents contradicting constants in its own repository is not provable—it is confusing.

## Critical Findings

### 1. Inconsistent Curve Points & Constants
**Severity:** 🚨 **HIGH**

There is a blatant mismatch between your derivation scripts and your production code/documentation:

- **Production (`App.tsx`, `verify.ts`, `ADR-001`)**:
  - DST: `KEETA_BURN_ADDRESS-with-edwards25519_XMD:SHA-512_ELL2_RO_`
  - Point: `e0bcb4e0e1a95b1a9c9abc353d6cac9146c59c3007292cc7b1af4730588f06ec`

- **Scripts (`scripts/derive-keeta-address.ts`)**:
  - DST: *(Implicit/Unknown)*
  - Point: `87cd3326f756e268fa58490de86eb87ecbfdebd77c7708bb9f0a480bb6203f6a` **(MISMATCH)**

- **Scripts (`scripts/test-derive.ts`)**:
  - DST: Uses library default (implicit).
  - Likely generates the mismatched `87cd...` point.

**Critique**: You cannot claim "mathematical guarantees" when your own repository's `derive` script yields a completely different address than your "verify" script. This looks like you changed the DST in production but forgot to update your tooling. **This must be reconciled immediately.** The tooling must use the *exact* same constants as the production application.

### 2. Ambiguous Address Encoding Claims
**Severity:** 🔸 **MEDIUM**

The ADR claims/uses the term "Bech32-inspired custom encoding".
- **Reality**: The code calls `lib.Account.toPublicKeyString()`. This appears to be the standard Keeta SDK encoding.
- **Critique**: Do not invent terminology. If it is standard Keeta encoding, call it that. "Custom encoding" implies you rolled your own serialization layer, which would be a cryptographic vulnerability (e.g., alias attacks). If it is simply Bech32 with a `keeta_` prefix, that is "Keeta Address Encoding". Clarify this.

### 3. The Seed String
**Severity:** ℹ️ **LOW (Professionalism)**

- **Seed**: `KEETA_BURN_FUCKING_ADDRESS`
- **Critique**: While this provides sufficient entropy and clearly demonstrates a lack of mathematical hidden structure (it's obviously not a pre-calculated vanity seed), it degrades the professional seriousness of a "financial auditing" tool. However, cryptographically, it is valid. The length and "meme" nature effectively function as a nonce.

## Technical Validation (RFC 9380)

The choice of `edwards25519_XMD:SHA-512_ELL2_RO_` is **correct**.
- **XMD:SHA-512**: Provides conservative security margin (SHA-512 > 256 bits).
- **ELL2 (Elligator2)**: The correct mapping for Edwards25519.
- **RO (Random Oracle)**: Correct for hash-to-curve (vs Non-Uniform).

The usage of a custom DST (`KEETA_BURN_ADDRESS-...`) is robust and compliant with section 3.1 of RFC 9380, preventing domain confusion with other protocols using the same curve.

## Recommendations

1.  **Standardize the DST**: Hardcode `DST` in a shared constant file or config. Do not copy-paste string literals across `App.tsx` and 5 different scripts.
2.  **Purge Stale Scripts**: Delete or update `scripts/derive-keeta-address.ts` and `scripts/test-derive.ts` to use the **official** DST. They currently produce "fake" verification results.
3.  **Update ADR**: Clarify the encoding (stop saying "inspired", be precise).
4.  **Unit Tests**: Add a test that specifically checks that `derive` output == `verify` output.

**Signed,**
*Antigravity, PhD (Cryptography)*
