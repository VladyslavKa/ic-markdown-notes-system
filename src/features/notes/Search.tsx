import { Input } from "@/components/ui/input";
import {
  NOTE_SEARCH_MAX_LENGTH,
  NOTES_SEARCH_QUERY_NAME,
} from "@/entities/notes/const";
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
    <Input
      type="search"
      placeholder="Search notes..."
      value={searchQuery}
      maxLength={NOTE_SEARCH_MAX_LENGTH}
      onChange={(event) => handleChange(event.target.value)}
    />
  );
}
