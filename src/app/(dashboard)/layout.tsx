import AppSidebar from "@/components/common/app-sidebar";
import { SidebarProvider, SidebarMenuAction } from "@/components/ui/sidebar";
import { authRequire } from "@/lib/auth-utils";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await authRequire();
  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  );
}
