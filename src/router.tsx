import { createBrowserRouter } from "react-router";
import NotesPage from "./pages/Notes";
import NoteItemPage from "./pages/NoteItem";
import NoteItemEditPage from "./pages/NoteItemEdit";
import NoteItemCreatePage from "./pages/NoteItemCreate";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: NotesPage,
  },
  {
    path: "/notes/create",
    Component: NoteItemCreatePage,
  },
  {
    path: "/notes/:id",
    Component: NoteItemPage,
  },
  {
    path: "/notes/:id/edit",
    Component: NoteItemEditPage,
  },
]);
