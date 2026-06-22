// @vitest-environment jsdom

import { localStorageNotesRepository } from "@/entities/notes/localStorageNotesRepository";
import { describeNotesRepository } from "./repositoryContract";

describeNotesRepository("localStorage", () => {
  window.localStorage.clear();

  return localStorageNotesRepository;
});
