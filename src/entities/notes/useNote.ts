import { useEffect, useState } from "react";

import { useNotesStore } from "./store";
import type { Note } from "./types";

export type NoteLoadState =
  | { status: "loading" }
  | { status: "success"; note: Note }
  | { status: "not-found" }
  | { status: "error"; error: unknown };

type NoteLoadResult = Exclude<NoteLoadState, { status: "loading" }> & {
  id: string;
};

export function useNote(id?: string): NoteLoadState {
  const getItemById = useNotesStore((state) => state.getItemById);
  const [result, setResult] = useState<NoteLoadResult>();

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    getItemById(id)
      .then((note) => {
        if (cancelled) return;

        setResult(
          note
            ? { id, status: "success", note }
            : { id, status: "not-found" },
        );
      })
      .catch((error: unknown) => {
        if (!cancelled) setResult({ id, status: "error", error });
      });

    return () => {
      cancelled = true;
    };
  }, [id, getItemById]);

  if (!id) return { status: "not-found" };
  if (!result || result.id !== id) return { status: "loading" };

  return result;
}
