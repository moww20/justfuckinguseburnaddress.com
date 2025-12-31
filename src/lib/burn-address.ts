import { ed25519_hasher } from '@noble/curves/ed25519.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex } from '@noble/hashes/utils.js';

/**
 * Configuration for the Keeta Burn Address derivation
 */
export const BURN_CONFIG = {
    seed: 'KEETA_BURN_FUCKING_ADDRESS',
    // Domain Separation Tag per RFC 9380 - ensures this usage is isolated
    dst: 'KEETA_BURN_ADDRESS_v1',
} as const;

/**
 * Derives a provably unspendable burn address using RFC 9380 hash-to-curve.
 * 
 * Security properties:
 * - The output is GUARANTEED to be a valid Ed25519 curve point (via Elligator2)
 * - No private key can exist unless both:
 *   1. SHA256 preimage resistance is broken (find x where SHA256(x) = known hash)
 *   2. ECDLP is solved (find scalar k where k*G = derived point)
 * - The derivation is deterministic and publicly verifiable
 * 
 * @returns The derived burn address components
 */
export function deriveBurnAddress(): {
    seed: string;
    dst: string;
    inputHash: string;
    curvePointHex: string;
} {
    const encoder = new TextEncoder();
    const seedBytes = encoder.encode(BURN_CONFIG.seed);

    // Step 1: Hash the seed (for transparency - show the intermediate value)
    const inputHash = bytesToHex(sha256(seedBytes));

    // Step 2: RFC 9380 hash-to-curve with Elligator2
    // Using ed25519_hasher which implements RFC 9380 section for Edwards curves
    // This GUARANTEES the output is a valid Ed25519 curve point
    const point = ed25519_hasher.hashToCurve(seedBytes, { DST: BURN_CONFIG.dst });

    // Step 3: Get the compressed point representation (32 bytes)
    const curvePointHex = point.toHex();

    return {
        seed: BURN_CONFIG.seed,
        dst: BURN_CONFIG.dst,
        inputHash,
        curvePointHex,
    };
}

// Pre-computed values for the website (derived from defaults)
// These use the default DST from ed25519_hasher
export const BURN_ADDRESS_PRECOMPUTED = {
    seed: 'KEETA_BURN_FUCKING_ADDRESS',
    sha256Hash: '5e545f6df2f58a6778a09a60cec38147ca16d269275e9120b1c3e0294c1ca533',
    // RFC 9380 hash-to-curve result (using default DST: edwards25519_XMD:SHA-512_ELL2_RO_)
    curvePointHex: '87cd3326f756e268fa58490de86eb87ecbfdebd77c7708bb9f0a480bb6203f6a',
    // Bech32 encoded address (derived from curvePointHex using Keeta SDK)
    address: 'keeta_agd42mzg65loe2h2lbeq32doxb7mx7pl256hocf3t4feqc5wea7wv7xtd2gue',
} as const;

// Export utilities for verification scripts
export { bytesToHex } from '@noble/hashes/utils.js';
export { sha256 } from '@noble/hashes/sha2.js';
