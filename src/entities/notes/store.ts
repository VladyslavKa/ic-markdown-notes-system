import { create } from "zustand";
import { filterNotes, type NoteFilters } from "./filter";
import type { NotesRepository } from "./repository";
import { localStorageNotesRepository } from "./localStorageNotesRepository";
import type { Note } from "./types";

export type NotesStore = {
  items: Note[];
  tags: string[];
  hasLoadedTags: boolean;
  filters: NoteFilters;
  createNote: (note: Note) => Promise<void>;
  loadNotes: (filters?: NoteFilters) => Promise<Note[]>;
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
    filters: {},

    createNote: async (note) => {
      await repository.create(note);

      await Promise.all([
        get().loadNotes(get().filters),
        get().loadTags(),
      ]);
    },

    loadNotes: async (filters = {}) => {
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
        get().loadNotes(get().filters),
        get().loadTags(),
      ]);
    },

    deleteNote: async (id) => {
      await repository.delete(id);

      await Promise.all([
        get().loadNotes(get().filters),
        get().loadTags(),
      ]);
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
