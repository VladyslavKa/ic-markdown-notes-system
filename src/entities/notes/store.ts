import { create } from "zustand";
import { filterNotes, type NoteFilters } from "./filter";
import type { NotesRepository } from "./repository";
import { localStorageNotesRepository } from "./localStorageNotesRepository";
import type { Note } from "./types";

export type NotesStore = {
  items: Note[];
  tags: string[];
  createNote: (note: Note) => Promise<void>;
  getItems: (filters?: NoteFilters) => Promise<Note[]>;
  getItemById: (id: string) => Promise<Note | undefined>;
  getTags: () => Promise<void>;
  updateNote: (note: Note) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
};

export function createNotesStore(repository: NotesRepository) {
  return create<NotesStore>((set) => ({
    items: [],
    tags: [],

    createNote: async (note) => {
      await repository.create(note);

      set((state) => ({
        items: [...state.items, note],
      }));
    },

    getItems: async (filters = {}) => {
      const items = filterNotes(await repository.getAll(), filters);

      set({ items });

      return items;
    },

    getItemById: (id) => repository.getById(id),

    updateNote: async (note) => {
      const savedNote = await repository.update(note.id, note);

      if (!savedNote) {
        throw new Error(`Note ${note.id} was not found`);
      }

      set((state) => ({
        items: state.items.map((item) =>
          item.id === savedNote.id ? savedNote : item,
        ),
      }));
    },

    deleteNote: async (id) => {
      await repository.delete(id);

      set((state) => ({
        items: state.items.filter((item) => item.id !== id),
      }));
    },

    getTags: async () => {
      set({ tags: await repository.getTags() });
    },
  }));
}

export const useNotesStore = createNotesStore(localStorageNotesRepository);
