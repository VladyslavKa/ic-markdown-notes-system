import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Note } from "@/entities/notes/types";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
        {(note.tags ?? []).length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5" aria-label="Note tags">
            {(note.tags ?? []).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <Markdown remarkPlugins={[remarkGfm]}>{note.content}</Markdown>
      </CardContent>

      <CardFooter>
        <p>{note.createdAt}</p>
      </CardFooter>
    </Card>
  );
}
