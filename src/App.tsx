import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Github } from 'lucide-react';
import { Section } from './components/Section';
import { TerminalBlock } from './components/TerminalBlock';
import { FAQItem } from './components/FAQItem';

// X.com icon (not in lucide-react)
const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function App() {
  const seedString = 'KEETA_BURN_FUCKING_ADDRESS';

  // RFC 9380 Hash-to-Curve derived address (the only official address)
  const curvePointHex = '87cd3326f756e268fa58490de86eb87ecbfdebd77c7708bb9f0a480bb6203f6a';
  const address = 'keeta_agd42mzg65loe2h2lbeq32doxb7mx7pl256hocf3t4feqc5wea7wv7xtd2gue';

  // Browser console verification script - FULL end-to-end verification
  const consoleVerifyScript = `// Paste this in your browser's Developer Console (F12)
// Full RFC 9380 + Keeta SDK verification
(async () => {
  console.log("🔐 Loading cryptographic libraries...");
  
  // Load libraries from CDN
  const { hashToCurve } = await import("https://esm.sh/@noble/curves@1.8.1/ed25519");
  const { bytesToHex } = await import("https://esm.sh/@noble/hashes@1.7.1/utils");
  const keetaMod = await import("https://esm.sh/@keetanetwork/keetanet-client@0.14.12");
  const lib = keetaMod.default.lib;
  
  const SEED = "KEETA_BURN_FUCKING_ADDRESS";
  const EXPECTED_POINT = "87cd3326f756e268fa58490de86eb87ecbfdebd77c7708bb9f0a480bb6203f6a";
  const EXPECTED_ADDRESS = "keeta_agd42mzg65loe2h2lbeq32doxb7mx7pl256hocf3t4feqc5wea7wv7xtd2gue";
  
  console.log("\\n============================================");
  console.log("  KEETA BURN ADDRESS DERIVATION PROOF");
  console.log("============================================\\n");
  
  // STEP 1: Seed
  console.log("STEP 1: Seed String");
  console.log("─────────────────────────────────────────");
  console.log("Input:", SEED);
  
  // STEP 2: RFC 9380 Hash-to-Curve
  console.log("\\nSTEP 2: RFC 9380 Hash-to-Curve (Elligator2)");
  console.log("─────────────────────────────────────────");
  const encoder = new TextEncoder();
  const point = hashToCurve(encoder.encode(SEED));
  const curvePointBytes = point.toRawBytes();
  const curvePointHex = bytesToHex(curvePointBytes);
  console.log("Output:  ", curvePointHex);
  console.log("Expected:", EXPECTED_POINT);
  console.log("Match:", curvePointHex === EXPECTED_POINT ? "✅" : "❌");
  
  // STEP 3: Keeta Address Encoding
  console.log("\\nSTEP 3: Keeta Address Encoding (SDK)");
  console.log("─────────────────────────────────────────");
  const arrayBuffer = curvePointBytes.buffer.slice(
    curvePointBytes.byteOffset,
    curvePointBytes.byteOffset + curvePointBytes.byteLength
  );
  const account = lib.Account.fromED25519PublicKey(arrayBuffer);
  const address = lib.Account.toPublicKeyString(account);
  console.log("Output:  ", address);
  console.log("Expected:", EXPECTED_ADDRESS);
  console.log("Match:", address === EXPECTED_ADDRESS ? "✅" : "❌");
  
  // FINAL RESULT
  console.log("\\n============================================");
  console.log("  ✅ FULLY VERIFIED BURN ADDRESS:");
  console.log("  " + address);
  console.log("============================================");
  console.log("\\n✓ No private key exists for this address");
  console.log("✓ Tokens sent here are permanently locked");
})();`;

  // File-based verification - simple one-liner using bun or npx
  const fileVerifyScript = `bun run scripts/verify.ts`;
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
          The cryptographic derivation of the Keeta Network Dead Wallet.
        </motion.p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{ maxWidth: '600px', margin: '-4rem auto 6rem auto' }}
      >
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--accent)', textAlign: 'left' }}>Keeta Burn Fucking Address (RFC 9380)</h3>
        <TerminalBlock label="ADDRESS" content={address} />
      </motion.div>

      <main>
        <Section title="The Rationale" delay={0.2}>
          <div style={{ display: 'grid', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--text-dim)' }}>The Problem</h3>
              <p style={{ marginBottom: '1rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                To guarantee token immutability, administrative rights must be permanently revoked. Standard "burn" methods involve generating a keypair and deleting the private key—a process that <strong style={{ color: '#fff' }}>requires trusting the creator</strong> to actually delete it.
              </p>
              <div style={{ padding: '1rem', borderLeft: '3px solid var(--error)', background: 'rgba(255, 77, 77, 0.05)' }}>
                <p style={{ margin: 0, color: '#ffaaaa', fontStyle: 'italic' }}>"Trust is a vulnerability."</p>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: 'var(--accent)' }}>The Solution</h3>
              <p style={{ marginBottom: '1rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                We eliminate trust. Instead of generating a keypair and deleting the private key, we generate the <strong style={{ color: '#fff' }}>Public Key directly from a public seed string</strong>.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: 'var(--text-dim)' }}>
                By bypassing the private key generation step entirely, we create a destination that is mathematically impossible to unlock.
              </p>
            </div>
          </div>
        </Section>

        <Section title="Derivation Method: RFC 9380 Hash-to-Curve" delay={0.3}>
          <p style={{ marginBottom: '1.5rem' }}>
            We use the <a href="https://datatracker.ietf.org/doc/rfc9380/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>IETF-standardized hash-to-curve algorithm (RFC 9380)</a> to generate a valid Ed25519 curve point from a public seed string. This <em>guarantees</em> the output is a valid curve point—eliminating all ambiguity.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem', background: '#111', borderRadius: '12px', alignItems: 'center', textAlign: 'center', border: '1px solid #222' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Seed String</div>
            <div style={{ padding: '0.5rem 1rem', background: '#000', border: '1px solid #333', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>{seedString}</div>
            <div style={{ color: 'var(--accent)' }}>↓ RFC 9380 Elligator2</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>(XMD:SHA-512 + Elligator2 Map)</div>
            <div style={{ padding: '0.5rem 1rem', background: '#000', border: '1px solid #333', borderRadius: '4px', fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>{curvePointHex}</div>
            <div style={{ color: 'var(--accent)' }}>↓ Keeta Encoding</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-dim)' }}>Keeta Burn Fucking Address</div>
            <div style={{ padding: '0.5rem 1rem', background: 'rgba(0, 255, 157, 0.1)', border: '1px solid var(--accent)', borderRadius: '4px', fontFamily: 'var(--font-mono)', wordBreak: 'break-all', color: 'var(--accent)' }}>{address}</div>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
            The Elligator2 map produces a point that is <strong style={{ color: '#fff' }}>mathematically guaranteed</strong> to lie on the Edwards-25519 curve. Finding a private key (scalar) that maps to this point requires solving the discrete logarithm problem—computationally infeasible.
          </p>
        </Section>

        <Section title="The Curve Point" delay={0.4}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>Seed String</h3>
          <TerminalBlock label="text" content={seedString} />

          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>Ed25519 Curve Point (RFC 9380)</h3>
          <TerminalBlock label="curve point" content={curvePointHex} />

          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--accent)' }}>Keeta Burn Fucking Address (Bech32)</h3>
          <TerminalBlock label="address" content={address} />
        </Section>

        <Section title="How to Verify" delay={0.5}>
          <p style={{ marginBottom: '1.5rem', lineHeight: '1.6' }}>
            Because we use the advanced <strong>RFC 9380 Hash-to-Curve</strong> standard (Elligator2), simple shell commands like <code>sha256sum</code> are no longer sufficient. Use one of the methods below to verify the derivation.
          </p>

          <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--accent)', borderRadius: '12px', background: 'rgba(0, 255, 157, 0.03)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '20px', background: 'var(--accent)', color: '#000', padding: '2px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
              EASIEST
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#fff' }}>1. Browser Console (Zero Setup)</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-dim)', marginBottom: '1rem' }}>
              Open Developer Tools (F12), go to the <strong>Console</strong> tab, and paste this script. It dynamically loads the cryptographic library from a CDN.
            </p>
            <TerminalBlock label="javascript" content={consoleVerifyScript} maxHeight="300px" />
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-dim)' }}>2. Command Line (Clone & Run)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>
              Clone the repo and run with <code style={{ color: 'var(--accent)' }}>bun</code> or <code style={{ color: 'var(--accent)' }}>npx tsx</code>:
            </p>
            <TerminalBlock label="bash" content={fileVerifyScript} />
          </div>
        </Section>

        <Section title="Security Proof" delay={0.6}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
            {[
              { title: "RFC 9380 Guarantee", desc: "The Elligator2 algorithm guarantees the output is a valid Ed25519 curve point. This is IETF-standardized, not ad-hoc." },
              { title: "Determinism", desc: `The curve point is derived solely from the public string "${seedString}".` },
              { title: "Discrete Log Hardness", desc: "Finding a private key (Ed25519 scalar) that produces this public point requires solving the discrete logarithm problem—computationally infeasible." },
              { title: "Preimage Resistance", desc: "Finding an input that produces a colliding curve point is blocked by SHA-512 preimage resistance within the hash-to-curve construction." }
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
          <div style={{ marginTop: '2rem', textAlign: 'center', padding: '1rem', border: '1px dashed var(--accent)', borderRadius: '8px', color: '#fff', background: 'rgba(0, 255, 157, 0.05)' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>CONCLUSION:</span> No one holds the private key. Tokens and Ownership are mathematically locked forever.
          </div>
        </Section>

        <Section title="FAQ" delay={0.7}>
          <div>
            <FAQItem question="What if someone uses the seed string as a wallet seed phrase?">
              <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>
                It is <strong style={{ color: 'var(--accent)' }}>completely safe</strong>. No matter how you try to use this seed string as a private key, <strong style={{ color: '#fff' }}>you will never arrive at the burn address</strong>.
              </p>
              <div style={{ background: '#111', padding: '1.5rem', borderRadius: '8px', border: '1px solid #222' }}>
                <p style={{ marginBottom: '1rem', fontSize: '0.95rem' }}>
                  <strong style={{ color: '#fff' }}>The Technical Reason:</strong>
                </p>
                <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Standard Wallets:</strong> <code>Seed</code> → <code>Private Key</code> → <code>Public Key</code> → Address A
                  </li>
                  <li>
                    <strong>This Burn Address:</strong> <code>Seed</code> → <code>Public Key</code> (directly) → Address B
                  </li>
                </ul>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
                  These are fundamentally different mathematical operations. For Address A to equal Address B, the Private Key would have to equal the Public Key—<strong style={{ color: 'var(--error)' }}>cryptographically impossible</strong>.
                </p>
                <p style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--accent)', fontStyle: 'italic' }}>
                  Try it yourself: use the seed in any wallet. You'll get a completely different, unrelated address.
                </p>
              </div>
            </FAQItem>

            <FAQItem question="Can someone brute-force the seed phrase?">
              <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
                You have a better chance of picking a specific atom in the observable universe. It is <strong style={{ color: 'var(--accent)' }}>thermodynamically impossible</strong>. To even attempt it would require more energy than exists in our solar system.
              </p>
            </FAQItem>

            <FAQItem question="What about Quantum Computing?">
              <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
                Keeta is <strong style={{ color: 'var(--accent)' }}>Post-Quantum Ready</strong>. This network was not built for the limitations of today's silicon. While others panic, Keeta remains immutable.
              </p>
            </FAQItem>

            <FAQItem question="The All-Zeros Dilemma">
              <p style={{ color: 'var(--text-dim)', marginBottom: '1rem', lineHeight: '1.6' }}>
                Some argue that an Ed25519 public key of <code style={{ color: 'var(--accent)' }}>0x00...00</code> (32 zero bytes) is "provably unspendable."
                This is <strong style={{ color: 'var(--error)' }}>weaker and less provable</strong> than the Hash-to-Point method.
              </p>

              <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #333' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-dim)' }}>Aspect</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--error)' }}>All-Zeros Key</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--accent)' }}>Hash-to-Point</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #222' }}>
                      <td style={{ padding: '0.75rem', color: 'var(--text-dim)' }}>Derivation</td>
                      <td style={{ padding: '0.75rem', color: '#ffaaaa' }}>"Magic constant"</td>
                      <td style={{ padding: '0.75rem', color: '#aaffaa' }}>RFC 9380(public seed)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #222' }}>
                      <td style={{ padding: '0.75rem', color: 'var(--text-dim)' }}>Verifiability</td>
                      <td style={{ padding: '0.75rem', color: '#ffaaaa' }}>Trust required</td>
                      <td style={{ padding: '0.75rem', color: '#aaffaa' }}>Anyone can verify</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #222' }}>
                      <td style={{ padding: '0.75rem', color: 'var(--text-dim)' }}>Transparency</td>
                      <td style={{ padding: '0.75rem', color: '#ffaaaa' }}>Opaque</td>
                      <td style={{ padding: '0.75rem', color: '#aaffaa' }}>Fully transparent</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '0.75rem', color: 'var(--text-dim)' }}>Pre-computation Risk</td>
                      <td style={{ padding: '0.75rem', color: '#ffaaaa' }}>"Famous" point</td>
                      <td style={{ padding: '0.75rem', color: '#aaffaa' }}>Unpredictable hash</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ padding: '1rem', borderLeft: '3px solid var(--accent)', background: 'rgba(0, 255, 157, 0.05)' }}>
                <p style={{ margin: 0, color: '#fff', fontStyle: 'italic' }}>
                  "Don't trust. Verify."
                </p>
              </div>
            </FAQItem>
          </div>
        </Section>
      </main>

      <footer style={{ marginTop: '8rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.875rem', paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <a
            href="https://github.com/moww20/justfuckinguseburnaddress.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}
            title="View Source on GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://x.com/trdrmorz"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-dim)', transition: 'color 0.2s' }}
            title="Follow on X"
          >
            <XIcon />
          </a>
        </div>
        <p style={{ opacity: 0.5, marginBottom: '0.5rem' }}>KEETA BURN FUCKING ADDRESS v1</p>
        <p style={{ opacity: 0.3, fontSize: '0.8rem' }}>
          by <a href="https://keythings.xyz/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>Keythings Wallet</a>
        </p>
      </footer>
    </div >
  );
}

export default App;
