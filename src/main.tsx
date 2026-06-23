import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./router";
import { ThemeToggle } from "./shared/ui/ThemeToggle";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeToggle />
    <RouterProvider router={router} />
  </StrictMode>,
);
