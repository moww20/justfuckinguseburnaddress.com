import { bech32 } from 'bech32';
import { createHash } from 'node:crypto';

const SEED = "KEETA_BURN_FUCKING_ADDRESS";
const PREFIX = "keeta";

console.log(`\n=== VERIFYING WITH BECH32 ===\n`);

// 1. Calculate SHA256 Hash
const hash = createHash('sha256').update(SEED).digest();
console.log(`Seed: ${SEED}`);
console.log(`Hash: ${hash.toString('hex')}`);

// 2. Convert to Bech32 Words (5-bit groups)
// Note: crypto.digest() returns a Buffer (Uint8Array)
const words = bech32.toWords(hash);

// 3. Encode
const address = bech32.encode(PREFIX, words);

console.log(`\nAddress: ${address}`);
console.log(`Expected: keeta_afpfix3n6l2yuz3yucngbtwdqfd4ufwsnetv5ejawhb6akkmdssth3xh4vhhg`);

if (address === "keeta_afpfix3n6l2yuz3yucngbtwdqfd4ufwsnetv5ejawhb6akkmdssth3xh4vhhg") {
    console.log("✅ MATCH!");
} else {
    console.log("❌ MISMATCH!");
}
