# ADR 0001: Client-side Architecture

## Status

Accepted

## Context

The task requires a browser-based Markdown notes application without a backend, authentication, or required cloud infrastructure. Notes must persist after refresh, and the candidate should be able to explain state management, persistence, routing, and component structure.

## Decision

Use React + TypeScript + Vite as a client-side SPA.

Use Zustand for shared notes state and actions.

Use a `NotesRepository` boundary between the store and persistence. The current implementation uses `localStorage`, but repository methods are asynchronous so IndexedDB or an API can replace it later without changing UI components.

Use React Router for note routes and URL-based search/tag filters.

Use `react-markdown` with `remark-gfm` for Markdown rendering without raw HTML.

## Alternatives Considered

### Next.js

Rejected because the task does not require SSR, API routes, a backend, authentication, or SEO.

### React Context / useReducer

Rejected because Zustand provides simpler shared state management with less boilerplate.

### Direct localStorage Access in Zustand

Rejected because it couples state management to a specific persistence mechanism.

### IndexedDB

Rejected for the initial implementation because the expected data size is small and `localStorage` is simpler for the timebox.

## Consequences

### Positive

- Clear separation between UI, state, and persistence.
- Easier to test store logic with an in-memory repository.
- Persistence can be replaced later.
- URL filters survive refresh and can be shared.

### Negative

- The repository abstraction adds a small amount of code.
- Asynchronous repository methods are slightly artificial for `localStorage`.
- `localStorage` is limited in size and is not suitable for sensitive data.
