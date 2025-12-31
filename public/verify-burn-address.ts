
import * as Anchor from "@keetanetwork/anchor";
import { createHash } from "node:crypto";

const SEED = "KEETA_BURN_FUCKING_ADDRESS";

console.log("\n=== Keeta Burn Address Verifier ===\n");

// 1. Calculate SHA256 Hash
const hash = createHash('sha256').update(SEED).digest();
const hashHex = hash.toString('hex');
console.log(`SHA256 Hash: 0x${hashHex}\n`);

// 2. Derive Keeta Address
console.log("Deriving address via SDK...");
const bytes = new Uint8Array(hash);
const account = Anchor.KeetaNet.lib.Account.fromED25519PublicKey(bytes);
const address = account.publicKeyString.get();

console.log("------------------------------------------");
console.log("OFFICIAL BURN ADDRESS:");
console.log(address);
console.log("------------------------------------------\n");
console.log("Compare this with the address on the website.\n");
