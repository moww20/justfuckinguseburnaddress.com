
import { lib } from "@keetanetwork/keetanet-client";
import { BURN_CONSTANTS, deriveBurnPoint } from '../src/lib/burn-address';

console.log('Deriving Keeta address from curve point...');
console.log('Input Seed:', BURN_CONSTANTS.SEED);
console.log('DST:', BURN_CONSTANTS.DST);

try {
    // 1. Derive the point from seed (using shared logic)
    const { curvePointHex, curvePointBytes } = deriveBurnPoint();

    console.log('\nDerived Point:', curvePointHex);
    console.log('Expected Point:', BURN_CONSTANTS.EXPECTED_POINT_HEX);

    if (curvePointHex !== BURN_CONSTANTS.EXPECTED_POINT_HEX) {
        throw new Error('MISMATCH: Derived point does not match expected constant!');
    }
    console.log('✅ Point matches expected constant');

    // 2. Derive the address from the point
    console.log('Bytes length:', curvePointBytes.length);

    // Convert to ArrayBuffer for SDK
    const arrayBuffer = curvePointBytes.buffer.slice(
        curvePointBytes.byteOffset,
        curvePointBytes.byteOffset + curvePointBytes.byteLength
    ) as ArrayBuffer;

    // Create Keeta account from the valid curve point
    const account = lib.Account.fromED25519PublicKey(arrayBuffer);
    const address = lib.Account.toPublicKeyString(account);

    console.log('\nDerived Address:', address);
    console.log('Expected Address:', BURN_CONSTANTS.EXPECTED_ADDRESS);

    if (address !== BURN_CONSTANTS.EXPECTED_ADDRESS) {
        throw new Error('MISMATCH: Derived address does not match expected constant!');
    }

    console.log('\n---------------------------------------------------');
    console.log('✅ KEETA ADDRESS DERIVED SUCCESSFULLY');
    console.log(address);
    console.log('---------------------------------------------------\n');

} catch (e: unknown) {
    console.error('Error deriving address:');
    if (e instanceof Error) {
        console.error(e.message);
    } else {
        console.error(String(e));
    }
    process.exit(1);
}
