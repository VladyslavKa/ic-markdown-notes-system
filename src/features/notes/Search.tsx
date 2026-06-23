import { Input } from "@/components/ui/input";
import {
  NOTE_SEARCH_MAX_LENGTH,
  NOTES_SEARCH_QUERY_NAME,
} from "@/entities/notes/const";
import { SearchIcon } from "lucide-react";
import { useSearchParams } from "react-router";

export default function NotesSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get(NOTES_SEARCH_QUERY_NAME) ?? "";

  const handleChange = (value: string) => {
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);

        if (value.trim()) {
          nextParams.set(NOTES_SEARCH_QUERY_NAME, value);
        } else {
          nextParams.delete(NOTES_SEARCH_QUERY_NAME);
        }

        return nextParams;
      },
      { replace: true },
    );
  };

  return (
    <div className="relative">
      <SearchIcon
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        type="search"
        aria-label="Search notes"
        placeholder="Search notes..."
        value={searchQuery}
        maxLength={NOTE_SEARCH_MAX_LENGTH}
        className="h-9 bg-background pr-3 pl-9"
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  );
}
