# Rick & Morty Character Browser

A small single-page app built for the Genesys Senior Frontend Engineer take-home assignment. It lists characters from the [Rick & Morty API](https://rickandmortyapi.com/) on a Home page, and lets you open a Profile page for any character.

## Features

- **Home page** — table of characters (avatar, name, species, status) pulled from the API
- **Profile page** — full character details, reached by clicking a name; includes a Back link to Home
- **Pagination** — navigate through the full character list, not just the first page
- **Search** — filter characters by name, debounced to avoid firing a request on every keystroke
- Distinct **loading**, **empty-results**, and **error** states, instead of collapsing them into one generic message
- A dedicated **not-found** state on the Profile page for invalid character IDs
- Wildcard route that redirects unknown URLs back to Home

## Tech stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for dev server and build
- [React Router](https://reactrouter.com/) for client-side routing
- CSS Modules, with a shared color/radius palette defined as CSS custom properties in `src/index.css`
- [Oxlint](https://oxc.rs/) for linting, [Prettier](https://prettier.io/) for formatting

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start the local dev server               |
| `npm run build`        | Type-check and build for production      |
| `npm run preview`      | Preview the production build locally     |
| `npm run lint`         | Run Oxlint                               |
| `npm run format`       | Format all files with Prettier           |
| `npm run format:check` | Check formatting without writing changes |
