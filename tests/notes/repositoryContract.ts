import { beforeEach, describe, expect, it } from "vitest";
import type { NotesRepository } from "@/entities/notes/repository";
import type { Note } from "@/entities/notes/types";

type RepositoryFactory = () => NotesRepository;

const firstNote: Note = {
  id: "note-1",
  title: "First note",
  content: "First content",
  tags: ["work", "shared"],
  createdAt: "2026-06-22T10:00:00.000Z",
  updatedAt: "2026-06-22T10:00:00.000Z",
};

const secondNote: Note = {
  ...firstNote,
  id: "note-2",
  title: "Second note",
  tags: ["personal", "shared"],
};

export function describeNotesRepository(
  name: string,
  createRepository: RepositoryFactory,
) {
  describe(`${name} NotesRepository contract`, () => {
    let repository: NotesRepository;

    beforeEach(() => {
      repository = createRepository();
    });

    it("starts empty", async () => {
      await expect(repository.getAll()).resolves.toEqual([]);
    });

    it("creates and reads notes", async () => {
      await repository.create(firstNote);

      await expect(repository.getAll()).resolves.toEqual([firstNote]);
      await expect(repository.getById(firstNote.id)).resolves.toEqual(firstNote);
      await expect(repository.getById("missing")).resolves.toBeUndefined();
    });

    it("updates an existing note and rejects a missing note", async () => {
      await repository.create(firstNote);

      const updatedNote = await repository.update(firstNote.id, {
        title: "Updated",
      });

      expect(updatedNote).toMatchObject({
        id: firstNote.id,
        title: "Updated",
      });
      expect(updatedNote?.updatedAt).not.toBe(firstNote.updatedAt);
      await expect(
        repository.update("missing", { title: "Updated" }),
      ).resolves.toBeNull();
    });

    it("deletes a note", async () => {
      await repository.create(firstNote);
      await repository.delete(firstNote.id);

      await expect(repository.getAll()).resolves.toEqual([]);
    });

    it("returns unique sorted tags", async () => {
      await repository.create(firstNote);
      await repository.create(secondNote);

      await expect(repository.getTags()).resolves.toEqual([
        "personal",
        "shared",
        "work",
      ]);
    });
  });
}
