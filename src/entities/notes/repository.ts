import type { Note } from "./types";

export interface NotesRepository {
  getAll: () => Promise<Note[]>;
  getById: (id: string) => Promise<Note | undefined>;
  create: (note: Note) => Promise<void>;
  update: (id: string, patch: Partial<Note>) => Promise<Note | null>;
  delete: (id: string) => Promise<void>;
}
