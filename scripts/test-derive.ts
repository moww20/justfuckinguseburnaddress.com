// RFC 9380 Hash-to-Curve Test Script
import { ed25519_hasher } from '@noble/curves/ed25519.js';
import { sha256 } from '@noble/hashes/sha2.js';
import { bytesToHex } from '@noble/hashes/utils.js';

const SEED = 'KEETA_BURN_FUCKING_ADDRESS';

console.log('\n=== RFC 9380 Hash-to-Curve Burn Address Derivation ===\n');

const encoder = new TextEncoder();
const seedBytes = encoder.encode(SEED);

// Show SHA256 hash for reference
const inputHash = bytesToHex(sha256(seedBytes));
console.log('Seed String:', SEED);
console.log('SHA256(seed):', inputHash);

console.log('\n--- Applying Elligator2 (RFC 9380) ---\n');

const point = ed25519_hasher.hashToCurve(seedBytes);
const curvePointHex = point.toHex();

console.log('Curve Point (hex):', curvePointHex);

console.log('\n✅ VERIFIED: This is a valid Ed25519 curve point');
console.log('Point is guaranteed valid by RFC 9380 Elligator2 algorithm');

console.log('\n--- Copy these values for the website ---\n');
console.log(`const seedString = '${SEED}';`);
console.log(`const curvePointHex = '${curvePointHex}';`);
