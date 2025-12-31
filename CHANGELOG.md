# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-01

### Added
- **OSS Standardization**: Added `LICENSE` (MIT), `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`, and `SECURITY.md`.
- **Issue Templates**: Added structured templates for Bug Reports and Feature Requests (with blockchain selection).
- **CI/CD**: Added GitHub Actions workflow (`verify.yml`) to automatically verify cryptographic consistency on every push and PR.
- **Pull Request Template**: Added checklist to ensure contributors run local verification.
- **Badges**: Added Build Status and License badges to README.
- **Single Source of Truth**: Created `src/lib/burn-address.ts` to centralize cryptographic constants.

### Changed
- **Refactor**: Updated `verify.ts` and `derive-keeta-address.ts` to use the shared constants from `src/lib/burn-address.ts`.
- **Derivation Fix**: Fixed a critical inconsistency where the derivation script used a different Domain Separation Tag (DST) than the production application.
- **Documentation**: Clarified "Bech32-inspired custom encoding" to "Keeta Address Encoding" in ADR-001.

### Removed
- **Cleanup**: Deleted potentially misleading `scripts/test-derive.ts`.

## [1.0.0] - 2025-12-31

### Added
- Initial Release of the `justfuckinguseburnaddress.com` website.
- RFC 9380 Hash-to-Curve implementation for Ed25519.
- Basic verification script.
