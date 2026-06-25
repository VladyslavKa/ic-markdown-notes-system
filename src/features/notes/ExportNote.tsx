import { Button } from "@/components/ui/button";
import type { Note } from "@/entities/notes/types";
import { DownloadIcon } from "lucide-react";

interface ExportNoteProps {
  note: Note;
}

export default function ExportNote({ note }: ExportNoteProps) {
  const handleExport = () => {
    const markdown = `# ${note.title}

${note.content}

${note.tags.length > 0 ? `Tags: ${note.tags.join(", ")}` : ""}

---
Created: ${note.createdAt}
Updated: ${note.updatedAt}
`;
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const filename = note.title.trim().replace(/[\\/:*?"<>|]/g, "_");

    link.href = url;
    link.download = `${filename || "note"}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      onClick={handleExport}
      aria-label="Export note as Markdown"
      title="Export as .md"
    >
      <DownloadIcon />
    </Button>
  );
}
