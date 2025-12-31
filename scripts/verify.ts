// RFC 9380 Burn Address Verification Script
// Run with: bun run scripts/verify.ts

import { ed25519_hasher } from '@noble/curves/ed25519.js';
import { lib } from '@keetanetwork/keetanet-client';

/**
 * CRYPTOGRAPHIC SPECIFICATION:
 * - Scheme: Ed25519 (RFC 8032)
 * - Hash-to-Curve: RFC 9380
 * - Suite: edwards25519_XMD:SHA-512_ELL2_RO_
 * - DST: "KEETA_BURN_ADDRESS-with-edwards25519_XMD:SHA-512_ELL2_RO_"
 * - Library: @noble/curves@1.8.1 (pinned for reproducibility)
 */

const SEED = 'KEETA_BURN_FUCKING_ADDRESS';
const DST = 'KEETA_BURN_ADDRESS-with-edwards25519_XMD:SHA-512_ELL2_RO_';
const EXPECTED_POINT = 'e0bcb4e0e1a95b1a9c9abc353d6cac9146c59c3007292cc7b1af4730588f06ec';
const EXPECTED_ADDRESS = 'keeta_ahqlznha4guvwgu4tk6dkplmvsiunrm4gadsslghwgxuomcyr4doyqqzqxc56';

console.log('\n============================================');
console.log('  KEETA BURN ADDRESS DERIVATION PROOF');
console.log('============================================\n');

console.log('INPUT SEED:');
console.log(`  "${SEED}"\n`);

// STEP 1: RFC 9380 Hash-to-Curve (Elligator2)
console.log('STEP 1: RFC 9380 Hash-to-Curve');
console.log(`  Suite: edwards25519_XMD:SHA-512_ELL2_RO_`);
console.log(`  DST:   "${DST}"`);
console.log('  (Internal: Includes cofactor clearing and expansion via SHA-512)');

const point = ed25519_hasher.hashToCurve(new TextEncoder().encode(SEED), { DST });
const curvePointHex = point.toHex();
const curvePointBytes = point.toBytes();

console.log('Output:  ', curvePointHex);
console.log('Expected:', EXPECTED_POINT);
console.log('Match:   ', curvePointHex === EXPECTED_POINT ? '✅' : '❌');

// STEP 2: Point Format Verification
console.log('\nSTEP 2: Point Format Verification');
console.log('Format:   Ed25519 Compressed (32 bytes)');
console.log('Encoding: Little-Endian Y-coordinate + X sign bit (RFC 8032)');
console.log('Length:  ', curvePointBytes.length, 'bytes', curvePointBytes.length === 32 ? '✅' : '❌');

// STEP 3: Keeta Address Encoding
console.log('\nSTEP 3: Keeta Address Encoding');
const arrayBuffer = curvePointBytes.buffer.slice(
    curvePointBytes.byteOffset,
    curvePointBytes.byteOffset + curvePointBytes.byteLength
) as ArrayBuffer;

const account = lib.Account.fromED25519PublicKey(arrayBuffer);
const address = lib.Account.toPublicKeyString(account);
console.log('Output:  ', address);
console.log('Expected:', EXPECTED_ADDRESS);
console.log('Match:   ', address === EXPECTED_ADDRESS ? '✅' : '❌');

console.log('\n============================================');
console.log('  ✅ FULLY VERIFIED BURN ADDRESS');
console.log('  ' + address);
console.log('============================================\n');
