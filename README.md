# Magic Rune Generator

A D&D rune sigil generator built with React, TypeScript, and Vite.

Try it out: https://dwhisper.github.io/magic-rune-generator/

## Example usage
![](./example2.png)

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for dev server and bundling
- [Tailwind CSS 4](https://tailwindcss.com/) for styling
- [pnpm](https://pnpm.io/) for package management

## Setup

Requires [Node.js](https://nodejs.org/) 20+ and [pnpm](https://pnpm.io/installation) 10+.

```bash
git clone https://github.com/dWhisper/magic-rune-generator.git
cd magic-rune-generator
pnpm install
```

## Development

```bash
pnpm dev
```

Starts the Vite dev server with hot module reloading at http://localhost:5173/magic-rune-generator/.

## Other scripts

| Command | Description |
| --- | --- |
| `pnpm build` | Type-check and build for production into `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | Run the TypeScript compiler without emitting output |

## Contributing

Contributions are welcome!

1. Fork the repo and create a branch off `main` for your change.
2. Make your changes, keeping `pnpm lint` and `pnpm typecheck` passing.
3. Test your change locally with `pnpm dev` (and `pnpm build` for anything touching the build config).
4. Open a pull request describing what changed and why.

For anything larger than a small fix, opening an issue first to discuss the approach is appreciated.
