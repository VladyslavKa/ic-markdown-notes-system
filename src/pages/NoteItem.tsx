import { Button } from "@/components/ui/button";
import { NOTES_ROUTES } from "@/entities/notes/const";
import { useNote } from "@/entities/notes/useNote";
import { NoteLoadFallback } from "@/features/notes/LoadState";
import NotePreview from "@/features/notes/Preview";
import { ArrowLeftIcon } from "lucide-react";
import { NavLink, useLocation, useParams } from "react-router";

export default function NoteItemPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const noteState = useNote(id);

  if (noteState.status !== "success") {
    return <NoteLoadFallback status={noteState.status} />;
  }

  return (
    <div className="flex min-h-full flex-col gap-4 p-4 sm:p-6">
      <Button
        render={
          <NavLink
            to={{ pathname: NOTES_ROUTES.HOME, search: location.search }}
          />
        }
        nativeButton={false}
        variant="ghost"
        className="w-fit lg:hidden"
      >
        <ArrowLeftIcon data-icon="inline-start" />
        Notes
      </Button>

      <NotePreview note={noteState.note} />
    </div>
  );
}
