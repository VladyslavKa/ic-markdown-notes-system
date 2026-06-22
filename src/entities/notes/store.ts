import { create } from "zustand";
import { filterNotes, type NoteFilters } from "./filter";
import type { NotesRepository } from "./repository";
import { localStorageNotesRepository } from "./localStorageNotesRepository";
import type { Note } from "./types";

export type NotesStore = {
  items: Note[];
  tags: string[];
  filters: NoteFilters;
  createNote: (note: Note) => Promise<void>;
  getItems: (filters?: NoteFilters) => Promise<Note[]>;
  getItemById: (id: string) => Promise<Note | undefined>;
  getTags: () => Promise<void>;
  updateNote: (note: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

export function createNotesStore(repository: NotesRepository) {
  return create<NotesStore>((set, get) => ({
    items: [],
    tags: [],
    filters: {},

    createNote: async (note) => {
      await repository.create(note);

      await Promise.all([
        get().getItems(get().filters),
        get().getTags(),
      ]);
    },

    getItems: async (filters = {}) => {
      const items = filterNotes(await repository.getAll(), filters);

      set({ items, filters });

      return items;
    },

    getItemById: (id) => repository.getById(id),

    updateNote: async (note) => {
      const savedNote = await repository.update(note.id, note);

      if (!savedNote) {
        throw new Error(`Note ${note.id} was not found`);
      }

      await Promise.all([
        get().getItems(get().filters),
        get().getTags(),
      ]);
    },

    deleteNote: async (id) => {
      await repository.delete(id);

      await Promise.all([
        get().getItems(get().filters),
        get().getTags(),
      ]);
    },

    getTags: async () => {
      set({ tags: await repository.getTags() });
    },
  }));
}

export const useNotesStore = createNotesStore(localStorageNotesRepository);
