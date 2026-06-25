import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Note } from "@/entities/notes/types";
import MarkdownContent from "@/shared/ui/MarkdownContent";
import ExportNote from "./ExportNote";
import NoteTags from "./NoteTags";
import NoteTime from "./NoteTime";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold [overflow-wrap:anywhere]">
          {note.title}
        </h2>
      </CardHeader>

      <CardContent>
        <MarkdownContent>{note.content}</MarkdownContent>
      </CardContent>

      <CardFooter className="flex flex-wrap justify-between gap-3">
        <NoteTags tags={note.tags ?? []} />
        <div className="flex items-center gap-2">
          <ExportNote note={note} />
          <NoteTime value={note.createdAt} className="text-xs" />
        </div>
      </CardFooter>
    </Card>
  );
}
