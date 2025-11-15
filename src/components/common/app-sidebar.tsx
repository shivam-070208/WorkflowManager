"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator,
  SidebarMenuButton,
  SidebarGroupContent,
  SidebarHeader,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import {
  HomeIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  WorkflowIcon,
  HistoryIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { IconStar } from "@tabler/icons-react";
import { useListActivationSubscription } from "@/hooks/use-subscription";

export default function AppSidebar() {
  const pathName = usePathname();
  const router = useRouter();
  const {isActive,isLoading} = useListActivationSubscription();
  const MenuItems = [
    {
      title: "main",
      items: [
        {
          title: "workflows",
          icon: WorkflowIcon,
          href: "/workflows",
        },
        { title: "execution", icon: HistoryIcon, href: "/execution" },
      ],
    },
  ];
  const handleLogout = () => {
    let toastId = toast.loading("Logging out...");
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.dismiss(toastId);
          toastId = toast.message("Logged Out Redirecting");
          router.push("/");
          toast.dismiss(toastId);
          toast.success("Logged Out");
        },
        onError: () => {
          toast.error("Something went wrong");
        },
      },
    });
  };
  const handleSubscribe = ()=>{
    authClient.checkout({
        slug: "Worflow-developement",
        fetchOptions:{
            onSuccess:()=>{
                toast.success("you are subscribed with us");
            },
            onError:(err)=>{
                toast.error("Failed to start checkout");
                console.error(err);
            }
        }
    })
}

  return (
    <Sidebar className="overflow-x-hidden" variant="sidebar" side="left">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton asChild className="hover:bg-sidebar ">
            <Link href={"/"} prefetch className=" text-xl">
              Home
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">
        {MenuItems.map((group, idx) => (
          <SidebarGroup key={group.title || idx}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item, itemIdx) => (
                  <SidebarMenuItem key={item.title || itemIdx}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        item.href === "/"
                          ? pathName === "/"
                          : pathName.startsWith(item.href)
                      }
                    >
                      <Link
                        prefetch
                        className={
                          item.title === "workflows"
                            ? "text-sidebar-foreground"
                            : undefined
                        }
                        href={item.href || "#"}
                      >
                        {item.icon && (
                          <item.icon size={16} style={{ marginRight: 8 }} />
                        )}
                        {item.title
                          ? item.title.charAt(0).toUpperCase() +
                            item.title.slice(1)
                          : ""}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarSeparator />
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
           {!isLoading && !isActive&& <SidebarMenuButton asChild>
              <button onClick={handleSubscribe}  >
                <IconStar /> Go to Pro
              </button>
            </SidebarMenuButton>}
            <SidebarMenuButton asChild>
              <div className="cursor-pointer" onClick={handleLogout}>
                <LogOutIcon /> Logout
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
