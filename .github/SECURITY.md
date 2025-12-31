# Security Policy

## Reporting a Vulnerability

We take the security of this resource seriously, especially given its nature as a cryptographic reference.

If you discover a security vulnerability or a mathematical flaw in the burn address derivation, please do **NOT** open a public issue.

Instead, please report it privately:

- **Email**: security@keythings.xyz
- **Method**: You may report via email plain text.

We will acknowledge your report within 48 hours and provide an estimated timeframe for a fix.

## Scope

- **In Scope**:
  - Cryptographic flaws in `src/lib/burn-address.ts`.
  - Errors in the RFC 9380 implementation logic.
  - Vulnerabilities in the website deployment configuration.

- **Out of Scope**:
  - Issues related to third-party dependencies (please report to them directly unless it's a critical misuse in our code).
  - Theoretical quantum computing attacks (already documented in the FAQ).
