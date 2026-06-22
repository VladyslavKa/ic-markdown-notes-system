import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Note } from "@/entities/notes/types";
import MarkdownContent from "@/shared/ui/MarkdownContent";
import NoteTags from "./NoteTags";
import NoteTime from "./NoteTime";

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  return (
    <Card>
      <CardHeader>
        <h2 className="h-8">{note.title}</h2>
      </CardHeader>

      <CardContent>
        <MarkdownContent>{note.content}</MarkdownContent>
      </CardContent>

      <CardFooter className="flex flex-wrap justify-between gap-3">
        <NoteTags tags={note.tags ?? []} />
        <NoteTime value={note.createdAt} className="text-xs" />
      </CardFooter>
    </Card>
  );
}
