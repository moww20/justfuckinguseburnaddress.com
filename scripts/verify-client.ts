import { lib } from '@keetanetwork/keetanet-client';
import { createHash } from 'node:crypto';

const SEED = "KEETA_BURN_FUCKING_ADDRESS";

console.log(`\n=== VERIFYING WITH @keetanetwork/keetanet-client ===\n`);

// 1. Calculate SHA256 Hash
const hash = createHash('sha256').update(SEED).digest();
const hashHex = hash.toString('hex');
console.log(`Seed: ${SEED}`);
console.log(`Hash: ${hashHex}`);

// 2. Derive Address
try {
    // Convert Buffer to ArrayBuffer (safe copy)
    const arrayBuffer = hash.buffer.slice(hash.byteOffset, hash.byteOffset + hash.byteLength);
    const account = lib.Account.fromED25519PublicKey(arrayBuffer);

    // Get address string
    const address = lib.Account.toPublicKeyString(account);

    console.log(`\nAddress: ${address}`);
    console.log(`Expected: keeta_afpfix3n6l2yuz3yucngbtwdqfd4ufwsnetv5ejawhb6akkmdssth3xh4vhhg`);

    if (address === "keeta_afpfix3n6l2yuz3yucngbtwdqfd4ufwsnetv5ejawhb6akkmdssth3xh4vhhg") {
        console.log("✅ MATCH!");
    } else {
        console.log("❌ MISMATCH!");
    }
} catch (e) {
    console.error("Error deriving address:", e);
}
