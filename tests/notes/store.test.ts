import { describe, expect, it } from "vitest";
import type { NotesRepository } from "@/entities/notes/repository";
import { createNotesStore } from "@/entities/notes/store";
import type { Note } from "@/entities/notes/types";

const initialNote: Note = {
  id: "note-1",
  title: "React patterns",
  body: "Component composition",
  tags: ["react", "work"],
  createdAt: "2026-06-22T10:00:00.000Z",
  updatedAt: "2026-06-22T10:00:00.000Z",
};

describe("notes store", () => {
  it("loads all items through the repository", async () => {
    const repository = createMemoryRepository([initialNote]);
    const store = createNotesStore(repository);

    await expect(store.getState().loadNotes()).resolves.toEqual([initialNote]);
    expect(store.getState().items).toEqual([initialNote]);
  });

  it("keeps repository and store in sync during CRUD", async () => {
    const repository = createMemoryRepository();
    const store = createNotesStore(repository);

    await store.getState().createNote(initialNote);
    expect(store.getState().items).toEqual([initialNote]);
    await expect(repository.getById(initialNote.id)).resolves.toEqual(
      initialNote,
    );

    const updatedNote = { ...initialNote, title: "Updated" };
    await store.getState().updateNote(updatedNote);
    expect(store.getState().items).toEqual([updatedNote]);

    await store.getState().deleteNote(initialNote.id);
    expect(store.getState().items).toEqual([]);
    await expect(repository.getAll()).resolves.toEqual([]);
  });

  it("throws when the repository cannot update a note", async () => {
    const store = createNotesStore(createMemoryRepository());

    await expect(store.getState().updateNote(initialNote)).rejects.toThrow(
      `Note ${initialNote.id} was not found`,
    );
  });

  it("loads tags through the repository", async () => {
    const store = createNotesStore(createMemoryRepository([initialNote]));

    await store.getState().loadTags();

    expect(store.getState().tags).toEqual(["react", "work"]);
    expect(store.getState().hasLoadedTags).toBe(true);
  });

  it("refreshes notes and tags after updating a note", async () => {
    const store = createNotesStore(createMemoryRepository([initialNote]));

    await store.getState().loadNotes();
    await store.getState().updateNote({
      ...initialNote,
      tags: ["personal"],
    });

    expect(store.getState().items).toEqual([
      { ...initialNote, tags: ["personal"] },
    ]);
    expect(store.getState().tags).toEqual(["personal"]);
  });

  it("removes unused tags after deleting a note", async () => {
    const store = createNotesStore(createMemoryRepository([initialNote]));

    await store.getState().loadNotes();
    await store.getState().loadTags();
    await store.getState().deleteNote(initialNote.id);

    expect(store.getState().items).toEqual([]);
    expect(store.getState().tags).toEqual([]);
  });
});

function createMemoryRepository(initialNotes: Note[] = []): NotesRepository {
  let notes = structuredClone(initialNotes);

  return {
    getAll: async () => structuredClone(notes),
    getById: async (id) => notes.find((note) => note.id === id),
    create: async (note) => {
      notes = [...notes, structuredClone(note)];
    },
    update: async (id, patch) => {
      const currentNote = notes.find((note) => note.id === id);

      if (!currentNote) return null;

      const updatedNote = { ...currentNote, ...structuredClone(patch) };
      notes = notes.map((note) => (note.id === id ? updatedNote : note));

      return structuredClone(updatedNote);
    },
    delete: async (id) => {
      notes = notes.filter((note) => note.id !== id);
    },
    getTags: async () => [
      ...new Set(notes.flatMap((note) => note.tags)),
    ].sort(),
  };
}
