import { describe, expect, it } from "vitest";
import {
  filterNotes,
  getUniqueTags,
  removeUnavailableTagFilters,
} from "@/entities/notes/filter";
import type { Note } from "@/entities/notes/types";

const notes: Note[] = [
  {
    id: "note-1",
    title: "React patterns",
    content: "Notes about component composition",
    tags: ["work", "react"],
    createdAt: "2026-06-22T10:00:00.000Z",
    updatedAt: "2026-06-22T10:00:00.000Z",
  },
  {
    id: "note-2",
    title: "Shopping list",
    content: "Coffee and oat milk",
    tags: ["personal"],
    createdAt: "2026-06-22T11:00:00.000Z",
    updatedAt: "2026-06-22T11:00:00.000Z",
  },
];

describe("filterNotes", () => {
  it("returns all notes without filters", () => {
    expect(filterNotes(notes)).toEqual(notes);
  });

  it("searches titles without case sensitivity", () => {
    expect(filterNotes(notes, { search: "  REACT " })).toEqual([notes[0]]);
  });

  it("searches note content", () => {
    expect(filterNotes(notes, { search: "oat milk" })).toEqual([notes[1]]);
  });

  it("returns an empty list when nothing matches", () => {
    expect(filterNotes(notes, { search: "missing" })).toEqual([]);
  });

  it("filters by one tag", () => {
    expect(filterNotes(notes, { tags: ["personal"] })).toEqual([notes[1]]);
  });

  it("requires every selected tag", () => {
    expect(filterNotes(notes, { tags: ["work", "react"] })).toEqual([
      notes[0],
    ]);
    expect(filterNotes(notes, { tags: ["work", "personal"] })).toEqual([]);
  });

  it("combines search and tag filters", () => {
    expect(
      filterNotes(notes, { search: "component", tags: ["react"] }),
    ).toEqual([notes[0]]);
  });
});

describe("getUniqueTags", () => {
  it("returns unique sorted tags from notes", () => {
    expect(getUniqueTags(notes)).toEqual(["personal", "react", "work"]);
  });
});

describe("removeUnavailableTagFilters", () => {
  it("removes stale tags and preserves other query parameters", () => {
    const searchParams = new URLSearchParams(
      "search=react&tags=removed&tags=work",
    );

    const result = removeUnavailableTagFilters(searchParams, ["work"]);

    expect(result.get("search")).toBe("react");
    expect(result.getAll("tags")).toEqual(["work"]);
    expect(searchParams.getAll("tags")).toEqual(["removed", "work"]);
  });

  it("returns the same params when every selected tag exists", () => {
    const searchParams = new URLSearchParams("tags=work");

    expect(removeUnavailableTagFilters(searchParams, ["work"])).toBe(
      searchParams,
    );
  });
});
