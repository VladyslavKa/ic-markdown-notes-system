import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  NOTE_CONTENT_MAX_LENGTH,
  NOTE_TITLE_MAX_LENGTH,
} from "@/entities/notes/const";
import type { Note } from "@/entities/notes/types";
import NoteTagsInput from "./NoteTagsInput";

interface NoteEditorFormProps {
  model: Note;
  isSubmitting?: boolean;
  onChange?: (note: Note) => void;
  onSubmit?: (note: Note) => void;
}

export default function NoteEditorForm({
  model,
  isSubmitting = false,
  onChange = () => {},
  onSubmit = () => {},
}: NoteEditorFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const titleInput = form.elements.namedItem("title") as HTMLInputElement;
    const contentInput = form.elements.namedItem(
      "content",
    ) as HTMLTextAreaElement;

    titleInput.setCustomValidity(
      model.title.trim() ? "" : "Title is required.",
    );
    contentInput.setCustomValidity(
      model.content.trim() ? "" : "Content is required.",
    );

    if (!form.reportValidity()) return;

    onSubmit({ ...model, title: model.title.trim() });
  };

  const handleChangeField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    e.target.setCustomValidity("");

    onChange({
      ...model,
      [name]: value,
    });
  };

  const handleTagsChange = (tags: string[]) => {
    onChange({
      ...model,
      tags,
    });
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field>
            <FieldLabel htmlFor="title">
              Title*
            </FieldLabel>
            <Input
              id="title"
              name="title"
              type="text"
              value={model.title}
              className="mt-1"
              maxLength={NOTE_TITLE_MAX_LENGTH}
              required
              onChange={handleChangeField}
            />
            <FieldDescription className="text-right">
              {model.title.length} / {NOTE_TITLE_MAX_LENGTH}
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel htmlFor="content">
              Content*
            </FieldLabel>
            <Textarea
              id="content"
              name="content"
              value={model.content}
              className="mt-1 max-h-[50vh] resize-y"
              maxLength={NOTE_CONTENT_MAX_LENGTH}
              required
              onChange={handleChangeField}
            />
            <FieldDescription className="text-right">
              {model.content.length} / {NOTE_CONTENT_MAX_LENGTH}
            </FieldDescription>
          </Field>

          <Field>
            <FieldLabel>Tags</FieldLabel>
            <NoteTagsInput
              value={model.tags ?? []}
              disabled={isSubmitting}
              onChange={handleTagsChange}
            />
          </Field>

          <Button
            type="submit"
            variant="default"
            className="mt-4"
            disabled={isSubmitting}
          >
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
