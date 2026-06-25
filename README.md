# Markdown Notes System

A local-first Markdown notes application built as a frontend coding task. Notes are stored in the browser and require no backend.

## Demo

[Open Live App](https://ic-markdown-notes-system.vercel.app/)

[Watch Demo Video](https://ic-markdown-notes-system.vercel.app/demo.mp4)

## Features

- Create, view, edit, and delete notes with confirmation
- Split editor with live Markdown preview
- Add, remove, and filter by multiple tags
- Full-text search across titles and Markdown content
- Persistent notes via `localStorage`
- Responsive layout down to a 375px viewport
- Dark and light themes
- Export a note as a `.md` file

## Run Locally

Requires Node.js `^20.19.0` or `>=22.12.0`.

```bash
npm install
npm run dev
```

Other checks:

```bash
npm test
npm run lint
npm run build
npm run preview
```

## Architecture Decision Records

Key decisions are documented in [`docs/adr/0001-client-side-architecture.md`](./docs/adr/0001-client-side-architecture.md).

## Architecture

```text
src/
|-- entities/notes/   Data model, repository, store, filtering
|-- features/notes/   Editor, preview, list, search, tags
|-- pages/            Route-level screens
|-- layouts/          Persistent notes layout
|-- shared/           Shared UI and browser utilities
`-- components/ui/    shadcn/ui primitives

tests/notes/          Filtering, store, and repository contract tests
```

The store depends on `NotesRepository`, not directly on `localStorage`. Repository methods are asynchronous to preserve the same application boundary when persistence changes. Mutations reload the full note collection to keep persisted and rendered state synchronized. Available tags are derived from the loaded notes.

Search and tag filters are pure domain logic applied in memory to notes loaded into Zustand. The URL owns filter values, while Zustand owns the full note collection and mutations. Editor inputs are controlled so Markdown preview updates on every change.

## Data Model

```ts
interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

IDs use `crypto.randomUUID()`, and timestamps are ISO strings.

## Testing

Vitest covers full-text and tag filtering, store synchronization after CRUD operations, and a reusable repository contract. The localStorage implementation is tested through that contract. This keeps domain and store tests independent of the persistence implementation.

## AI Assistance

AI tools assisted with targeted implementation, refactoring, UI iteration, and test generation. The candidate selected the architecture and dependencies, decided filter behavior and state ownership, requested repository isolation, reviewed generated changes, and validated the result with tests, lint, and production builds.

## Security And Limits

`react-markdown` does not render raw HTML by default; enabling raw HTML plugins would require explicit sanitization. Notes are stored unencrypted in browser storage and should not contain sensitive data. Any script running on the same origin could access them.

This project intentionally has no backend, authentication, collaboration, or device sync. At larger scale, persistence would move behind an authenticated API and database with pagination, server-side search, authorization, validation, monitoring, audit logs, and conflict handling.
