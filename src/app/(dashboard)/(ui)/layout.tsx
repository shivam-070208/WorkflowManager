import AppHeader from "@/components/common/app-header";
import React from "react";
export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-col">
      <AppHeader />
      {children}
    </div>
  );
}
