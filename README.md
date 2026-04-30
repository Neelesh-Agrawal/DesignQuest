# DesignQuest (Day 23)

A design-learning game built with **React** and **Vite**: scenarios, consequences, progress, and optional **Groq** or **Anthropic** API features (AI critic, portfolio text).

## Setup

```bash
npm install
cp .env.example .env
# Edit .env — add at least VITE_GROQ_API_KEY or VITE_ANTHROPIC_API_KEY for AI features
npm run dev
```

- **`npm run dev`** — local development  
- **`npm run build`** — production bundle  
- **`npm run lint`** — ESLint  

Secrets belong in **`.env`** (gitignored). Use **`.env.example`** as a template. Variables prefixed with `VITE_` are embedded in the client build; do not treat them as server-only secrets if you deploy publicly.

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
