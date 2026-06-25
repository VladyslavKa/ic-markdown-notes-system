import { create } from "zustand";
import type { NotesRepository } from "./repository";
import { localStorageNotesRepository } from "./localStorageNotesRepository";
import type { Note } from "./types";

export type NotesStore = {
  items: Note[];
  hasLoadedNotes: boolean;
  createNote: (note: Note) => Promise<void>;
  loadNotes: () => Promise<Note[]>;
  getItemById: (id: string) => Promise<Note | undefined>;
  updateNote: (note: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

export function createNotesStore(repository: NotesRepository) {
  return create<NotesStore>((set, get) => ({
    items: [],
    hasLoadedNotes: false,

    createNote: async (note) => {
      await repository.create(note);

      await get().loadNotes();
    },

    loadNotes: async () => {
      const items = await repository.getAll();

      set({ items, hasLoadedNotes: true });

      return items;
    },

    getItemById: (id) => repository.getById(id),

    updateNote: async (note) => {
      const savedNote = await repository.update(note.id, note);

      if (!savedNote) {
        throw new Error(`Note ${note.id} was not found`);
      }

      await get().loadNotes();
    },

    deleteNote: async (id) => {
      await repository.delete(id);

      await get().loadNotes();
    },
  }));
}

export const useNotesStore = createNotesStore(localStorageNotesRepository);
