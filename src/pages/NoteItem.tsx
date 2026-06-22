import { Button } from "@/components/ui/button";
import { useNote } from "@/entities/notes/useNote";
import { NoteLoadFallback } from "@/features/notes/LoadState";
import NotePreview from "@/features/notes/Preview";
import { NavLink, useParams } from "react-router";

export default function NoteItemPage() {
  const { id } = useParams<{ id: string }>();
  const noteState = useNote(id);

  if (noteState.status !== "success") {
    return <NoteLoadFallback status={noteState.status} />;
  }

  return (
    <>
      <NavLink to="/">
        <Button variant="outline">Back to Notes</Button>
      </NavLink>

      <NotePreview note={noteState.note} />
    </>
  );
}
