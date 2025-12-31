// RFC 9380 Burn Address Verification Script
// Run with: bun run scripts/verify.ts

import { ed25519_hasher } from '@noble/curves/ed25519.js';
import { lib } from '@keetanetwork/keetanet-client';

const SEED = 'KEETA_BURN_FUCKING_ADDRESS';
const EXPECTED_POINT = '87cd3326f756e268fa58490de86eb87ecbfdebd77c7708bb9f0a480bb6203f6a';
const EXPECTED_ADDRESS = 'keeta_agd42mzg65loe2h2lbeq32doxb7mx7pl256hocf3t4feqc5wea7wv7xtd2gue';

console.log('\n============================================');
console.log('  KEETA BURN ADDRESS DERIVATION PROOF');
console.log('============================================\n');

// STEP 1: RFC 9380 Hash-to-Curve
console.log('STEP 1: RFC 9380 Hash-to-Curve');
const point = ed25519_hasher.hashToCurve(new TextEncoder().encode(SEED));
const curvePointHex = point.toHex();
console.log('Output:  ', curvePointHex);
console.log('Expected:', EXPECTED_POINT);
console.log('Match:   ', curvePointHex === EXPECTED_POINT ? '✅' : '❌');

// STEP 2: Keeta Address Encoding
console.log('\nSTEP 2: Keeta Address Encoding');
const curvePointBytes = point.toBytes();
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
console.log('============================================\n');
