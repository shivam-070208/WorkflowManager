"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon, Laptop2, Camera } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const themeOptions = [
    {
      value: "light",
      label: "Light",
      icon: <Sun className=" h-4 w-4 text-yellow-400" />,
    },
    {
      value: "dark",
      label: "Dark",
      icon: <Moon className=" h-4 w-4 text-blue-900 dark:text-blue-300" />,
    },
    {
      value: "system",
      label: "System",
      icon: <Laptop2 className=" h-4 w-4 text-muted-foreground" />,
    },
    {
      value: "vintage",
      label: "Vintage",
      icon: <Camera className="h-4 w-4 text-amber-700 dark:text-amber-400" />
    }
  ]
const themeIcon = (theme: string = "system") => {
  const option = themeOptions.find(opt => opt.value === theme) ?? themeOptions.find(opt => opt.value === "system");
  return React.cloneElement(option!.icon, { className: " " + (option!.icon.props.className ?? "") });
}

export function ThemeToggle() {
  const { setTheme, theme = "system" } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center p-0 w-10 h-10 rounded-full   text-muted-foreground hover:bg-foreground"
          aria-label="Toggle theme"
        >
          {themeIcon(theme)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {themeOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={`flex items-center ${
              theme === option.value
                ? "bg-muted/60 font-semibold text-primary"
                : ""
            }`}
            aria-selected={theme === option.value}
          >
            {option.icon}
            <span>{option.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
