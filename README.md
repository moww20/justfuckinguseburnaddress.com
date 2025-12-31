# Keeta Burn Fucking Address

> **The cryptographic derivation of the Keeta Network Dead Wallet.**

🔗 **Live Site**: [justfuckinguseburnaddress.com](https://justfuckinguseburnaddress.com/)

---

## The Address

| Component | Value |
|-----------|-------|
| **Seed String** | `KEETA_BURN_FUCKING_ADDRESS` |
| **Curve Point (RFC 9380)** | `e0bcb4e0e1a95b1a9c9abc353d6cac9146c59c3007292cc7b1af4730588f06ec` |
| **Keeta Address** | `keeta_ahqlznha4guvwgu4tk6dkplmvsiunrm4gadsslghwgxuomcyr4doyqqzqxc56` |

---

## Derivation Method

We use the **IETF-standardized** [RFC 9380 Hash-to-Curve](https://datatracker.ietf.org/doc/rfc9380/) algorithm (Elligator2) to generate a valid Ed25519 curve point from a public seed string.

```
Seed String → RFC 9380 Hash-to-Curve → Valid Ed25519 Curve Point → Keeta Address
```

This **guarantees** the output is a valid curve point—eliminating all ambiguity about whether a private key could exist.

---

## Verification

### Command Line (Recommended)
```bash
# Clone the repo and run:
bun run scripts/verify.ts
```

### Browser Console
Visit [justfuckinguseburnaddress.com](https://justfuckinguseburnaddress.com/) and paste the verification script from the "How to Verify" section into your browser's Developer Console (F12).

---

## Security

- **RFC 9380 Guarantee**: The Elligator2 algorithm guarantees the output is a valid Ed25519 curve point in the prime-order subgroup (with cofactor clearing). This is IETF-standardized, not ad-hoc.
- **Determinism**: The curve point is derived solely from the public string `KEETA_BURN_FUCKING_ADDRESS`.
- **Discrete Log Hardness**: Finding a private key (Ed25519 scalar) that produces this public point requires solving the discrete logarithm problem—computationally infeasible (~2¹²⁶ operations).
- **Collision Resistance**: The hash-to-curve construction provides ~128-bit security against finding two distinct inputs that map to the same curve point (birthday bound).

**Cryptographic Parameters:**
- DST: `KEETA_BURN_ADDRESS-with-edwards25519_XMD:SHA-512_ELL2_RO_`
- Library: `@noble/curves@1.8.1` (pinned for reproducibility)

**RESULT**: No party possesses or can feasibly compute the private key. Tokens sent here are **permanently locked**.

---

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Verify burn address
bun run scripts/verify.ts
```

---

## Tech Stack

- React + TypeScript
- Vite
- Framer Motion
- Prism.js (syntax highlighting)
- Deployed on Vercel

---

## License

MIT

---

**KEETA BURN FUCKING ADDRESS v1.0.0**  
by [Keythings Wallet](https://keythings.xyz/)
