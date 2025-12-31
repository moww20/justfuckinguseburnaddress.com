import { motion } from 'framer-motion';
import { ShieldCheck, Lock } from 'lucide-react';
import { Section } from './components/Section';
import { TerminalBlock } from './components/TerminalBlock';

function App() {
  const seedString = 'KEETA_BURN_FUCKING_ADDRESS';
  const hashHex = '5e545f6df2f58a6778a09a60cec38147ca16d269275e9120b1c3e0294c1ca533';
  const address = 'keeta_afpfix3n6l2yuz3yucngbtwdqfd4ufwsnetv5ejawhb6akkmdssth3xh4vhhg';

  const bashVerify = `echo -n 'KEETA_BURN_FUCKING_ADDRESS' | sha256sum
# Output: 5e545f6df2f58a6778a09a60cec38147ca16d269275e9120b1c3e0294c1ca533`;


  const powershellVerify = `$Algorithm = [System.Security.Cryptography.HashAlgorithm]::Create("SHA256")
$Bytes = [System.Text.Encoding]::UTF8.GetBytes("KEETA_BURN_FUCKING_ADDRESS")
$Hash = $Algorithm.ComputeHash($Bytes)
[BitConverter]::ToString($Hash).Replace("-", "").ToLower()
# Output: 5e545f6df2f58a6778a09a60cec38147ca16d269275e9120b1c3e0294c1ca533`;

  const sdkVerify = `
import { lib } from "@keetanetwork/keetanet-client";
import { createHash } from "node:crypto";

const SEED = "KEETA_BURN_FUCKING_ADDRESS";

// 1. Calculate SHA256 Hash
const hash = createHash('sha256').update(SEED).digest();
const hashHex = hash.toString('hex');
console.log(\`SHA256 Hash: 0x\${hashHex}\`);

// 2. Derive Keeta Address
const bytes = new Uint8Array(hash);
// Convert to ArrayBuffer for strict type compliance
const arrayBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);

const account = lib.Account.fromED25519PublicKey(arrayBuffer);
const address = lib.Account.toPublicKeyString(account);

console.log("OFFICIAL BURN ADDRESS:", address);
// Output: keeta_afpfix3n6l2yuz3yucngbtwdqfd4ufwsnetv5ejawhb6akkmdssth3xh4vhhg
`;

  return (
    <div className="manifesto-container">
      <header style={{ marginBottom: '6rem', textAlign: 'center', marginTop: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: '999px', background: 'rgba(255,255,255,0.03)' }}
        >
          <ShieldCheck size={18} color="var(--accent)" />
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 600, color: 'var(--text-dim)' }}>OFFICIAL SPECIFICATION</span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1rem', lineHeight: 1.1 }}
        >
          PROVABLE <br />
          <span style={{ color: 'var(--accent)' }}>BURN ADDRESS</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{ color: 'var(--text-dim)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}
        >
          The cryptographic derivation of the Keeta Launchpad Dead Wallet.
        </motion.p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{ maxWidth: '600px', margin: '-4rem auto 6rem auto' }}
      >
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--accent)', textAlign: 'left' }}>Keeta Burn Fucking Address (Bech32)</h3>
        <TerminalBlock label="ADDRESS" content={address} />
      </motion.div>

      <main>
        <Section title="Purpose" delay={0.2}>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            To ensure token immutability and fixed supply, administrative permissions (including <code style={{ color: 'var(--accent)' }}>TOKEN_ADMIN_SUPPLY</code> and <code style={{ color: 'var(--accent)' }}>OWNER</code>) are transferred to a "dead wallet".
          </p>
          <div style={{ padding: '1.5rem', background: 'rgba(255, 77, 77, 0.05)', borderLeft: '3px solid var(--error)', borderRadius: '4px' }}>
            <p style={{ margin: 0, color: '#ffaaaa' }}>
              This wallet must be <strong style={{ color: '#fff' }}>provably unspendable</strong>, meaning no private key exists for it.
            </p>
          </div>
        </Section>

        <Section title="Derivation Method: Hash-to-Point" delay={0.3}>
          <p style={{ marginBottom: '1.5rem' }}>
            Instead of generating a random keypair and deleting the private key (which requires trust), we generate the public key deterministically from a known seed string.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', background: '#111', borderRadius: '12px', alignItems: 'center', textAlign: 'center', border: '1px solid #222' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Seed String</div>
            <div style={{ padding: '0.5rem 1rem', background: '#000', border: '1px solid #333', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>{seedString}</div>
            <div style={{ color: 'var(--accent)' }}>↓ SHA256</div>
            <div style={{ padding: '0.5rem 1rem', background: '#000', border: '1px solid #333', borderRadius: '4px', fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>{hashHex}</div>
            <div style={{ color: 'var(--accent)' }}>↓</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Public Key (Burn Address)</div>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
            Since SHA256 is a one-way function, valid private keys (scalars) that map to this point are computationally infeasible to find. This effectively "burns" the address.
          </p>
        </Section>

        <Section title="The Address" delay={0.4}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>Seed String</h3>
          <TerminalBlock label="text" content={seedString} />

          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>SHA256 Hash (Hex)</h3>
          <TerminalBlock label="hex" content={hashHex} />

          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>Keeta Burn Fucking Address (Bech32)</h3>
          <TerminalBlock label="address" content={address} />
        </Section>

        <Section title="How to Verify" delay={0.5}>
          <p style={{ marginBottom: '1.5rem' }}>
            Anyone can verify that this address corresponds to the seed string.
          </p>

          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>1. Verify Hash (Command Line)</h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '0.5rem', opacity: 0.7 }}>On Linux / macOS</h4>
            <TerminalBlock label="bash" content={bashVerify} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '0.5rem', opacity: 0.7 }}>On Windows (PowerShell)</h4>
            <TerminalBlock label="powershell" content={powershellVerify} />
          </div>

          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', marginTop: '1.5rem', color: 'var(--text-dim)' }}>2. Verify Address Encoding (SDK Script)</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
            Run this script with the Keeta SDK to confirm the hex hash maps to the official address.
          </p>
          <TerminalBlock label="typescript" content={sdkVerify} />
        </Section>

        <Section title="Security Proof" delay={0.6}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
            {[
              { title: "Determinism", desc: `The address is derived solely from the public string "${seedString}".` },
              { title: "One-Way Function", desc: "Finding a private key (Ed25519 scalar) that produces this public point is a discrete logarithm problem, which is considered computationally infeasible." },
              { title: "Preimage Resistance", desc: "Finding a different input that maps to the same hash (to try and force a known private key) is a SHA256 preimage attack, also computationally infeasible." }
            ].map((item, i) => (
              <li key={i} style={{ padding: '1.5rem', background: '#111', border: '1px solid #222', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Lock size={16} color="var(--accent)" />
                  <strong style={{ color: '#fff' }}>{item.title}</strong>
                </div>
                <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>{item.desc}</p>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: '2rem', textAlign: 'center', padding: '1rem', border: '1px dashed var(--accent)', borderRadius: '8px', color: 'var(--accent-dim)' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>CONCLUSION:</span> No one holds the private key. Tokens are permanently locked.
          </div>
        </Section>

        <Section title="FAQ" delay={0.7}>
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#fff' }}>
                What if someone uses the seed string as a wallet seed phrase?
              </h3>
              <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>
                It is <strong style={{ color: 'var(--accent)' }}>completely safe</strong>. Access to the Burn Address would not be compromised.
              </p>
              <div style={{ background: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #222' }}>
                <p style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
                  <strong style={{ color: '#fff' }}>The Technical Reason:</strong>
                </p>
                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dim)', fontSize: '0.9rad' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Standard Wallets:</strong> Convert <code>Seed String</code> → <code>Private Key</code> → <code>Public Key</code> (Address A).
                  </li>
                  <li>
                    <strong>This Burn Address:</strong> Converts <code>Seed String</code> → <code>Public Key</code> (Address B) directly.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                  For Address A to equal Address B, the Private Key would have to mathematically equal the Public Key, which is cryptographically impossible.
                  Using the seed string in a wallet will simply generate a random, empty wallet address that has no relation to the Burn Address.
                </p>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer style={{ marginTop: '8rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.875rem', paddingBottom: '4rem' }}>
        <p style={{ opacity: 0.5 }}>KEETA LAUNCHPAD &bull; PROVABLE BURN v1</p>
      </footer>
    </div>
  );
}

export default App;
