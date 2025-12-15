"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import React from "react";
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemeProvider>) {
  return (
    <NextThemeProvider
      attribute="class"
      themes={["light", "dark", "vintage"]}
      defaultTheme="dark"
      {...props}
    >
      {children}
    </NextThemeProvider>
  );
}
