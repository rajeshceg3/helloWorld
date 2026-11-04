# Greeting

## Sub-features

Print `Hello world`, exit successfully, create no files.

## How to get to it (user POV)

Run `node app.js` in a terminal.

## Driving it with Node child_process

Run `node .cursor/skills/verify-hello-world/helpers/drive.mjs`. It invokes the actual script from an empty temporary directory, checks its exact output and exit, records proof and removes scratch state.

## Gotchas

Node must be installed. The expected greeting is case-sensitive. A syntax-only pass does not prove stdout or side effects. A failure must remain visible until fixed and rerun.
