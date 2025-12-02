import React from 'react'
import {SidebarTrigger} from "../ui/sidebar";
import { ThemeToggle } from './theme-toggle';
function AppHeader() {
  return (
    <div className="w-full flex justify-between px-4 py-4">
        <SidebarTrigger className="text-lg size-14" />
        <ThemeToggle />
    </div>
  )
}

export default AppHeader;