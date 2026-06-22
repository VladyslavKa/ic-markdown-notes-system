import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NOTE_CONTENT_MAX_LENGTH } from "@/entities/notes/const";
import type { Note } from "@/entities/notes/types";
import NoteTagsInput from "./Tags";

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
    onSubmit(model);
  };

  const handleChangeField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    onChange({
      ...model,
      [name]: value,
      updatedAt: new Date().toISOString(),
    });
  };

  const handleTagsChange = (tags: string[]) => {
    onChange({
      ...model,
      tags,
      updatedAt: new Date().toISOString(),
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
              required
              onChange={handleChangeField}
            />
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
