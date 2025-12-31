
import { lib } from "@keetanetwork/keetanet-client";

const CURVE_POINT_HEX = '87cd3326f756e268fa58490de86eb87ecbfdebd77c7708bb9f0a480bb6203f6a';

console.log('Deriving Keeta address from curve point:', CURVE_POINT_HEX);

try {
    // Convert hex to byte array manually to ensure correct type
    const match = CURVE_POINT_HEX.match(/.{1,2}/g);
    if (!match) throw new Error('Invalid hex');
    const bytes = new Uint8Array(match.map(byte => parseInt(byte, 16)));

    console.log('Bytes length:', bytes.length);

    // Convert to ArrayBuffer for SDK
    const arrayBuffer = bytes.buffer.slice(
        bytes.byteOffset,
        bytes.byteOffset + bytes.byteLength
    ) as ArrayBuffer;

    // Create Keeta account from the valid curve point
    const account = lib.Account.fromED25519PublicKey(arrayBuffer);
    const address = lib.Account.toPublicKeyString(account);

    console.log('\n---------------------------------------------------');
    console.log('✅ KEETA ADDRESS DERIVED SUCCESSFULLY:');
    console.log(address);
    console.log('---------------------------------------------------\n');

} catch (e: unknown) {
    console.error('Error deriving address:');
    if (e instanceof Error) {
        console.error(e.message);
    } else {
        console.error(String(e));
    }
}
