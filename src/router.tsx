import { createBrowserRouter } from "react-router";
import NotesLayout from "./layouts/NotesLayout";
import NoteItemPage from "./pages/NoteItem";
import NoteItemEditPage from "./pages/NoteItemEdit";
import NoteItemCreatePage from "./pages/NoteItemCreate";
import NotesHomePage from "./pages/NotesHome";
import { NOTES_ROUTES } from "./entities/notes/const";

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
        Component: NoteItemCreatePage,
      },
      {
        path: NOTES_ROUTES.VIEW,
        Component: NoteItemPage,
      },
      {
        path: NOTES_ROUTES.EDIT,
        Component: NoteItemEditPage,
      },
    ],
  },
]);
