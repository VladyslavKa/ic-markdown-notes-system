import { useState } from "react";
import { XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NoteTagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  disabled?: boolean;
}

export default function NoteTagsInput({
  value,
  onChange,
  disabled = false,
}: NoteTagsInputProps) {
  const [inputValue, setInputValue] = useState("");
  const normalizedInput = normalizeTag(inputValue);
  const canAddTag = normalizedInput !== "" && !value.includes(normalizedInput);

  const addTag = () => {
    if (!canAddTag) return;

    onChange([...value, normalizedInput]);
    setInputValue("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" && event.key !== ",") return;

    event.preventDefault();
    addTag();
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          type="text"
          value={inputValue}
          placeholder="Add a tag"
          disabled={disabled}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          type="button"
          variant="outline"
          disabled={disabled || !canAddTag}
          onClick={addTag}
        >
          Add
        </Button>
      </div>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-2" aria-label="Note tags">
          {value.map((tag) => (
            <span
              key={tag}
              className="inline-flex h-7 items-center gap-1 rounded-md bg-muted px-2 text-sm text-foreground"
            >
              {tag}
              <Button
                type="button"
                variant="ghost"
                size="icon-xs"
                disabled={disabled}
                aria-label={`Remove tag ${tag}`}
                onClick={() => removeTag(tag)}
              >
                <XIcon />
              </Button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase();
}
