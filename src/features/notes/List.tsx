import type { Note } from "@/entities/notes/types";
import NotesListItem from "./ListItem";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";

interface NotesListProps {
  items: Note[];
}

export default function NotesList({ items }: NotesListProps) {
  if (items.length === 0) {
    return <NotesListEmpty />;
  }

  return (
    <div className="my-8">
      <NavLink to="/notes/create">
        <Button variant="outline">Create a new note</Button>
      </NavLink>

      {items.map((item) => (
        <NotesListItem key={item.id} note={item} />
      ))}
    </div>
  );
}

function NotesListEmpty() {
  return (
    <>
      <div>No notes found.</div>{" "}
      <NavLink to="/notes/create">
        <Button variant="outline">Create a new note</Button>
      </NavLink>
    </>
  );
}
