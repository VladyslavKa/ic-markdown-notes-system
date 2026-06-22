import { cn } from "@/lib/utils";

interface NoteTagsProps {
  tags: string[];
  compact?: boolean;
  limit?: number;
  className?: string;
}

export default function NoteTags({
  tags,
  compact = false,
  limit,
  className,
}: NoteTagsProps) {
  const visibleTags = limit === undefined ? tags : tags.slice(0, limit);

  if (visibleTags.length === 0) return null;

  return (
    <div
      className={cn(
        "flex min-w-0 flex-wrap",
        compact ? "gap-1" : "gap-1.5",
        className,
      )}
      aria-label="Note tags"
    >
      {visibleTags.map((tag) => (
        <span
          key={tag}
          className={cn(
            "truncate bg-muted text-muted-foreground",
            compact
              ? "max-w-24 rounded-sm px-1.5 py-0.5 text-[0.7rem]"
              : "rounded-md border border-border px-2 py-0.5 text-xs",
          )}
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
