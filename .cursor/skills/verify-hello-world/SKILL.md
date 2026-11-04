---
name: verify-hello-world
description: Verify the helloWorld Node CLI greeting after changing its source or runtime assumptions.
---
# Verify helloWorld

## Launch

Run `node --version`, then `node .cursor/skills/verify-hello-world/helpers/drive.mjs` from the repository root. There are no dependencies, server, ports, environment variables, data or credentials. The short-lived CLI is app.js and has one user-facing feature, its greeting.

## Doctor

The helper first runs `node --check app.js`. A syntax failure stops the drive. It uses the current Node executable and an isolated empty working directory. No network, services or profile are used.

## Drive

The helper invokes the real `app.js` as a child process with a five-second deadline and closed stdin. It asserts exit0, exactly `Hello world` plus a platform newline on stdout, no stderr, and no files created in the isolated directory. A timeout, unexpected text, stderr or side effect is a failure. Read features/README.md for the one mapped journey.

## Evidence

The helper writes `artifacts/verification/hello-world.json`: Node version, source SHA256, command, observed stdout/stderr/exit, scratch files and result. This is real execution, not a mock or internal setter. A pass is only the greeting contract, not compatibility with untested Node versions or a new application feature.

## Cleanup

The helper removes only its own temporary directory after recording proof. The child process exits or is killed by its own timeout. Evidence stays under artifacts/verification and is checked after cleanup.

## Helpers

`node .cursor/skills/verify-hello-world/helpers/drive.mjs` runs the full journey. To maintain the map after behavior changes, use `/maintain-verification-skill`; do not silently change the expected greeting to bless a regression.
