import { Button } from "@/components/ui/button";
import { NOTES_ROUTES } from "@/entities/notes/const";
import type { NoteLoadState } from "@/entities/notes/useNote";
import { NavLink } from "react-router";

type NoteLoadFallbackStatus = Exclude<
  NoteLoadState["status"],
  "success"
>;

interface NoteLoadFallbackProps {
  status: NoteLoadFallbackStatus;
}

const messages: Record<NoteLoadFallbackStatus, string> = {
  loading: "Loading note...",
  "not-found": "Note not found.",
  error: "Failed to load note.",
};

export function NoteLoadFallback({ status }: NoteLoadFallbackProps) {
  const isLoading = status === "loading";

  return (
    <div
      role={status === "error" ? "alert" : "status"}
      aria-live={isLoading ? "polite" : undefined}
    >
      <p>{messages[status]}</p>
      {!isLoading && (
        <NavLink to={NOTES_ROUTES.HOME}>
          <Button variant="outline">Back to Notes</Button>
        </NavLink>
      )}
    </div>
  );
}
