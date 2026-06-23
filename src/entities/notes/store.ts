import { create } from "zustand";
import type { NotesRepository } from "./repository";
import { localStorageNotesRepository } from "./localStorageNotesRepository";
import type { Note } from "./types";

export type NotesStore = {
  items: Note[];
  tags: string[];
  hasLoadedTags: boolean;
  createNote: (note: Note) => Promise<void>;
  loadNotes: () => Promise<Note[]>;
  getItemById: (id: string) => Promise<Note | undefined>;
  loadTags: () => Promise<void>;
  updateNote: (note: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

export function createNotesStore(repository: NotesRepository) {
  return create<NotesStore>((set, get) => ({
    items: [],
    tags: [],
    hasLoadedTags: false,

    createNote: async (note) => {
      await repository.create(note);

      await Promise.all([get().loadNotes(), get().loadTags()]);
    },

    loadNotes: async () => {
      const items = await repository.getAll();

      set({ items });

      return items;
    },

    getItemById: (id) => repository.getById(id),

    updateNote: async (note) => {
      const savedNote = await repository.update(note.id, note);

      if (!savedNote) {
        throw new Error(`Note ${note.id} was not found`);
      }

      await Promise.all([get().loadNotes(), get().loadTags()]);
    },

    deleteNote: async (id) => {
      await repository.delete(id);

      await Promise.all([get().loadNotes(), get().loadTags()]);
    },

    loadTags: async () => {
      set({
        tags: await repository.getTags(),
        hasLoadedTags: true,
      });
    },
  }));
}

export const useNotesStore = createNotesStore(localStorageNotesRepository);
