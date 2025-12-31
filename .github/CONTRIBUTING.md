# Contributing to JustFuckingUseBurnAddress.com

Thank you for your interest in contributing! We welcome contributions from the community properly improve this cryptographic resource.

## Development Setup

This project uses **React**, **Vite**, and **TypeScript**. We use `npm` for dependency management and `bun` for scripts.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/moww20/justfuckinguseburnaddress.com.git
    cd justfuckinguseburnaddress.com
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    bun install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:5173`.

## Verifying Cryptography

If you are modifying any cryptographic constants or logic, you **MUST** verify your changes using the included scripts.

```bash
# Verify the burn address derivation
bun run scripts/verify.ts

# Check the derivation consistency
bun run scripts/derive-keeta-address.ts
```

All crypto logic is centralized in `src/lib/burn-address.ts`. **Do not hardcode constants** in the UI components; import them from this library.

## Submitting Pull Requests

1.  Fork the repository and create your branch from `main`.
2.  If you've added code, ensure it aligns with the existing style (TypeScript, functional components).
3.  Run the verification scripts (`bun run scripts/verify.ts`) to ensure no regressions in the burn address derivation.
4.  Open a Pull Request with a clear description of your changes.

## License

By contributing, you agree that your contributions will be licensed under its MIT License.
