import { generatePath } from "react-router";

export const NOTE_TITLE_MAX_LENGTH = 100;
export const NOTE_BODY_MAX_LENGTH = 1000;
export const NOTE_SEARCH_MAX_LENGTH = 50;
export const NOTES_SEARCH_QUERY_NAME = "search";
export const NOTES_TAGS_QUERY_NAME = "tags";
export const NOTES_ROUTES = {
  HOME: "/",
  CREATE: "/notes/create",
  EDIT: "/notes/:id/edit",
  VIEW: "/notes/:id",
} as const;

export function getNoteViewRoute(id: string) {
  return generatePath(NOTES_ROUTES.VIEW, { id });
}

export function getNoteEditRoute(id: string) {
  return generatePath(NOTES_ROUTES.EDIT, { id });
}
