import { createBrowserRouter } from "react-router";
import { NOTES_ROUTES } from "./entities/notes/const";
import NotesLayout from "./layouts/NotesLayout";
import NotesHomePage from "./pages/NotesHome";

export const router = createBrowserRouter([
  {
    path: NOTES_ROUTES.HOME,
    Component: NotesLayout,
    children: [
      {
        index: true,
        Component: NotesHomePage,
      },
      {
        path: NOTES_ROUTES.CREATE,
        lazy: async () => ({
          Component: (await import("./pages/NoteItemCreate")).default,
        }),
      },
      {
        path: NOTES_ROUTES.VIEW,
        lazy: async () => ({
          Component: (await import("./pages/NoteItem")).default,
        }),
      },
      {
        path: NOTES_ROUTES.EDIT,
        lazy: async () => ({
          Component: (await import("./pages/NoteItemEdit")).default,
        }),
      },
    ],
  },
]);
