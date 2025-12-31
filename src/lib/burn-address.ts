import { ed25519_hasher } from '@noble/curves/ed25519.js';


/**
 * CRYPTOGRAPHIC SPECIFICATION (Single Source of Truth)
 * 
 * - Algorithm: RFC 9380 Hash-to-Curve (Elligator2)
 * - Curve: Edwards25519
 * - Hash: SHA-512 (via XMD)
 */
export const BURN_CONSTANTS = {
    SEED: 'KEETA_BURN_FUCKING_ADDRESS',
    // Compliant with RFC 9380 Section 3.1
    DST: 'KEETA_BURN_ADDRESS-with-edwards25519_XMD:SHA-512_ELL2_RO_',
    // Pre-calculated expectations for verification
    EXPECTED_POINT_HEX: 'e0bcb4e0e1a95b1a9c9abc353d6cac9146c59c3007292cc7b1af4730588f06ec',
    EXPECTED_ADDRESS: 'keeta_ahqlznha4guvwgu4tk6dkplmvsiunrm4gadsslghwgxuomcyr4doyqqzqxc56'
} as const;

/**
 * Derives the burn address point from the seed.
 * Useful for verifying that the constants match the math.
 */
export function deriveBurnPoint(): {
    curvePointHex: string;
    curvePointBytes: Uint8Array;
} {
    const encoder = new TextEncoder();
    const seedBytes = encoder.encode(BURN_CONSTANTS.SEED);

    // RFC 9380 hash-to-curve
    const point = ed25519_hasher.hashToCurve(seedBytes, { DST: BURN_CONSTANTS.DST });

    return {
        curvePointHex: point.toHex(),
        curvePointBytes: point.toBytes()
    };
}
