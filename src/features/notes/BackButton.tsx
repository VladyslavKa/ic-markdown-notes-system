import { Button } from "@/components/ui/button";
import { NOTES_ROUTES } from "@/entities/notes/const";
import { ArrowLeftIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router";

export default function NotesBackButton() {
  const location = useLocation();

  return (
    <Button
      render={
        <NavLink
          to={{ pathname: NOTES_ROUTES.HOME, search: location.search }}
        />
      }
      nativeButton={false}
      variant="ghost"
      className="w-fit lg:hidden"
    >
      <ArrowLeftIcon data-icon="inline-start" />
      Notes
    </Button>
  );
}
