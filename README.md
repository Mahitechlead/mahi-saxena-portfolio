# Mahi Saxena — Portfolio

Personal portfolio (React, TypeScript, Vite, Tailwind CSS v4, Framer Motion). Source content lives in `src/data/resume.ts`.

## Scripts

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run preview` — preview the production build

## Deploy to Netlify ([mahi-saxena.netlify.app](https://mahi-saxena.netlify.app/))

Build settings are in `netlify.toml` (`npm run build`, publish directory `dist`).

1. Push this repo to GitHub (e.g. `Mahitechlead/mahi-saxena-portfolio`).
2. In [Netlify](https://app.netlify.com/) open your existing site **mahi-saxena** → **Site configuration** → **Build & deploy** → **Continuous deployment**.
3. Confirm the linked repo and branch; set **Base directory** to empty (repo root) unless you moved the app into a subfolder.
4. Trigger **Deploy site** (or push a commit). Netlify will install dependencies, run the build, and publish `dist`.

To deploy from your machine: `npx netlify-cli deploy --prod --dir=dist` (after `npm run build`), with the CLI logged into the same Netlify account.

---

This project was bootstrapped with the Vite React + TypeScript template. Additional template notes:

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
