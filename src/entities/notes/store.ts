import { create } from "zustand";
import type { Note } from "./types";
import { filterNotes, type NoteFilters } from "./filter";
import {
  createNote as createNoteInStorage,
  deleteNote as deleteNoteFromStorage,
  getNoteById as getNoteByIdFromStorage,
  getNotes as getNotesFromStorage,
  getNotesTags as getNotesTagsFromStorage,
  updateNote as updateNoteInStorage,
} from "./storage";

type NotesStore = {
  items: Note[];
  tags: string[];
  createNote: (note: Note) => Promise<void>;
  getItems: (filters?: NoteFilters) => Promise<Note[]>;
  getItemById: (id: string) => Promise<Note | undefined>;
  getTags: () => Promise<void>;
  updateNote: (note: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

export const useNotesStore = create<NotesStore>((set) => ({
  items: [],
  tags: [],
  createNote: async (note) => {
    await createNoteInStorage(note);

    set((state) => ({
      items: [...state.items, note],
    }));
  },
  getItems: async (filters = {}) => {
    const storedItems = (await getNotesFromStorage()) ?? [];
    const items = filterNotes(storedItems, filters);

    set({ items });

    return items;
  },
  getItemById: async (id) => {
    return getNoteByIdFromStorage(id);
  },
  updateNote: async (note: Note) => {
    const savedNote = await updateNoteInStorage(note.id, note);

    if (!savedNote) {
      throw new Error(`Note ${note.id} was not found`);
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.id === savedNote.id ? savedNote : item,
      ),
    }));
  },
  deleteNote: async (id: string) => {
    await deleteNoteFromStorage(id);

    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },
  getTags: async () => {
    const tags = await getNotesTagsFromStorage();

    set({ tags });
  },
}));
