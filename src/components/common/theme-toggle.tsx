"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop2, Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themeOptions = [
  {
    value: "light",
    label: "Light",
    icon: <Sun className="h-4 w-4 text-yellow-400" />,
  },
  {
    value: "dark",
    label: "Dark",
    icon: <Moon className="h-4 w-4 text-blue-900 dark:text-blue-300" />,
  },
  {
    value: "system",
    label: "System",
    icon: <Laptop2 className="text-muted-foreground h-4 w-4" />,
  },
  {
    value: "vintage",
    label: "Vintage",
    icon: <Camera className="h-4 w-4 text-amber-700 dark:text-amber-400" />,
  },
];
const themeIcon = (theme: string = "system") => {
  const option =
    themeOptions.find((opt) => opt.value === theme) ??
    themeOptions.find((opt) => opt.value === "system");
  return React.cloneElement(option!.icon, {
    className: " " + (option!.icon.props.className ?? ""),
  });
};

export function ThemeToggle() {
  const { setTheme, theme = "system" } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="text-muted-foreground hover:bg-foreground flex h-10 w-10 items-center rounded-full p-0"
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
                ? "bg-muted/60 text-primary font-semibold"
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
  );
}
