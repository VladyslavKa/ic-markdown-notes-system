// @vitest-environment jsdom

import { localStorageNotesRepository } from "@/entities/notes/localStorageNotesRepository";
import { expect, it } from "vitest";
import { describeNotesRepository } from "./repositoryContract";

describeNotesRepository("localStorage", () => {
  window.localStorage.clear();

  return localStorageNotesRepository;
});

it("migrates legacy content to body", async () => {
  window.localStorage.setItem(
    "ic_notes",
    JSON.stringify([
      {
        id: "legacy-note",
        title: "Legacy",
        content: "Legacy content",
        tags: [],
        createdAt: "2026-06-22T10:00:00.000Z",
        updatedAt: "2026-06-22T10:00:00.000Z",
      },
    ]),
  );

  await expect(localStorageNotesRepository.getAll()).resolves.toEqual([
    expect.objectContaining({ body: "Legacy content" }),
  ]);
  const storedNotes = JSON.parse(
    window.localStorage.getItem("ic_notes") ?? "[]",
  ) as Record<string, unknown>[];

  expect(storedNotes[0]).not.toHaveProperty("content");
});
