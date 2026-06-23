import { formatNoteDate } from "@/entities/notes/format";
import { cn } from "@/lib/utils";

interface NoteTimeProps {
  value: string;
  className?: string;
}

export default function NoteTime({ value, className }: NoteTimeProps) {
  return (
    <time className={cn("text-muted-foreground", className)} dateTime={value}>
      {formatNoteDate(value)}
    </time>
  );
}
