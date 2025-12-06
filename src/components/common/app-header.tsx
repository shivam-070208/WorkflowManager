import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { ThemeToggle } from "./theme-toggle";
function AppHeader() {
  return (
    <div className="flex w-full justify-between px-4 py-4">
      <SidebarTrigger className="size-14 text-lg" />
      <ThemeToggle />
    </div>
  );
}

export default AppHeader;
