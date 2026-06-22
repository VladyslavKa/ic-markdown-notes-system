# Markdown Notes System

A local-first Markdown notes application built as a frontend coding task. Notes are stored in the browser and require no backend.

## Demo

[Watch Demo Video](./public/demo.mp4)

## Features

- Create, view, edit, and delete notes with confirmation
- Split editor with live Markdown preview
- Add, remove, and filter by multiple tags
- Full-text search across titles and Markdown bodies
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

## Technical Decisions

- **React + TypeScript + Vite:** a small typed SPA with fast local development and a simple production build.
- **Zustand:** keeps shared note state and asynchronous mutations concise. Form draft state remains local to the editor.
- **React Router:** nested routes keep the sidebar mounted while the detail view changes. Search and selected tags live in the URL so filtered views are bookmarkable.
- **react-markdown + remark-gfm:** renders Markdown as React elements and supports tables, lists, and other GFM syntax without injecting raw HTML.
- **localStorage:** appropriate for a small, single-user, local-first task. A repository interface isolates persistence from the store so IndexedDB or an API can replace it.
- **Tailwind CSS + shadcn/ui:** provides reusable accessible primitives, responsive utilities, and token-based light/dark themes.

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

The store depends on `NotesRepository`, not directly on `localStorage`. Repository methods are asynchronous to preserve the same application boundary when persistence changes. Mutations reload the active filtered list and derived tags to keep persisted and rendered state synchronized.

Search and tag filters are pure domain logic. The URL owns filter values, while Zustand owns loaded notes and mutations. Editor inputs are controlled so Markdown preview updates on every change.

## Data Model

```ts
interface Note {
  id: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

IDs use `crypto.randomUUID()`, and timestamps are ISO strings. Existing records using the former `content` field are migrated to `body` when read.

## Decision Log

| Decision | Alternative | Reason |
| --- | --- | --- |
| `localStorage` repository | IndexedDB | Less setup for the expected data size; repository boundary preserves migration options |
| Zustand store | Redux or Context | Small API and limited shared state without reducer boilerplate |
| URL filter state | Store-only filters | Refreshable and shareable search/filter state |
| Controlled editor | Blur-based updates | Required for immediate preview and character count |
| AND tag matching | OR matching | Multiple selected tags narrow results predictably |

## Testing

Vitest covers full-text and tag filtering, store synchronization after CRUD operations, and a reusable repository contract. The localStorage implementation is tested through that contract, including legacy data migration. This keeps domain and store tests independent of the persistence implementation.

## AI Assistance

AI tools assisted with targeted implementation, refactoring, UI iteration, and test generation. The candidate selected the architecture and dependencies, decided filter behavior and state ownership, requested repository isolation, reviewed generated changes, and validated the result with tests, lint, and production builds.

## Security And Limits

`react-markdown` does not render raw HTML by default; enabling raw HTML plugins would require explicit sanitization. Notes are stored unencrypted in browser storage and should not contain sensitive data. Any script running on the same origin could access them.

This project intentionally has no backend, authentication, collaboration, or device sync. At larger scale, persistence would move behind an authenticated API and database with pagination, server-side search, authorization, validation, monitoring, audit logs, and conflict handling.
