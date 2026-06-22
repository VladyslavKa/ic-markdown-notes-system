import { Button } from "@/components/ui/button";
import { NOTES_TAGS_QUERY_NAME } from "@/entities/notes/const";
import { useNotesStore } from "@/entities/notes/store";
import { TagIcon } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router";

export default function NotesFilterTags() {
  const getTags = useNotesStore((state) => state.getTags);
  const tags = useNotesStore((state) => state.tags);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTags = searchParams.getAll(NOTES_TAGS_QUERY_NAME);

  useEffect(() => {
    void getTags();
  }, [getTags]);

  const toggleTag = (tag: string) => {
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        const selectedTags = currentParams.getAll(NOTES_TAGS_QUERY_NAME);

        nextParams.delete(NOTES_TAGS_QUERY_NAME);

        const updatedTags = selectedTags.includes(tag)
          ? selectedTags.filter((selectedTag) => selectedTag !== tag)
          : [...selectedTags, tag];

        updatedTags.forEach((selectedTag) => {
          nextParams.append(NOTES_TAGS_QUERY_NAME, selectedTag);
        });

        return nextParams;
      },
      { replace: true },
    );
  };

  if (tags.length === 0) return null;

  return (
    <section className="flex flex-col gap-3" aria-labelledby="tags-filter-title">
      <div className="flex items-center gap-2 text-muted-foreground">
        <TagIcon className="size-3.5" aria-hidden="true" />
        <h2
          id="tags-filter-title"
          className="text-xs font-semibold tracking-normal uppercase"
        >
          All tags
        </h2>
      </div>

      <div className="flex max-h-28 flex-wrap gap-1.5 overflow-y-auto pr-1">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);

          return (
            <Button
              key={tag}
              type="button"
              size="xs"
              variant={isSelected ? "secondary" : "ghost"}
              className="max-w-full justify-start rounded-md px-2"
              aria-pressed={isSelected}
              title={isSelected ? `Remove ${tag} filter` : `Filter by ${tag}`}
              onClick={() => toggleTag(tag)}
            >
              #{tag}
            </Button>
          );
        })}
      </div>
    </section>
  );
}
