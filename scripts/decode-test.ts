import { bech32 } from 'bech32';
import { createHash } from 'node:crypto';

const TARGET_ADDR = "keeta_afpfix3n6l2yuz3yucngbtwdqfd4ufwsnetv5ejawhb6akkmdssth3xh4vhhg";
// Replace _ with 1 for standard decoding
const STANDARD_ADDR = TARGET_ADDR.replace('_', '1');

const SEED = "KEETA_BURN_FUCKING_ADDRESS";
const HASH = createHash('sha256').update(SEED).digest();

console.log(`Target: ${TARGET_ADDR}`);
console.log(`Std Fmt: ${STANDARD_ADDR}`);
console.log(`Hash:   ${HASH.toString('hex')}`);

try {
    const decoded = bech32.decode(STANDARD_ADDR);
    console.log("Prefix:", decoded.prefix);
    const data = Buffer.from(bech32.fromWords(decoded.words));
    console.log("Decoded Data:", data.toString('hex'));

    if (data.toString('hex') === HASH.toString('hex')) {
        console.log("✅ MATCH! The encoding is standard Bech32 with '_' separator.");
    } else {
        console.log("❌ NO MATCH. The payload is distinct.");
    }
} catch (e) {
    console.error("Decoding failed:", e.message);
}
