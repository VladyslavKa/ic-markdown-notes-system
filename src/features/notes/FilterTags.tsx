import { Button } from "@/components/ui/button";
import { NOTES_TAGS_QUERY_NAME } from "@/entities/notes/const";
import { useNotesStore } from "@/entities/notes/store";
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
    <section className="flex flex-col gap-2" aria-labelledby="tags-filter-title">
      <h2 id="tags-filter-title" className="text-sm font-medium">
        Tags
      </h2>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag);

          return (
            <Button
              key={tag}
              type="button"
              size="sm"
              variant={isSelected ? "default" : "outline"}
              aria-pressed={isSelected}
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
