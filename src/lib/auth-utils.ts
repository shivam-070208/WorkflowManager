import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const authRequire = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if(!session) redirect("/login");
};
export const unauthRequire = async () => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (session) {
      // redirect back to the route the user originally tried to access, or to "/" as a fallback
      const refererHeader = (await headers()).get("referer");
      let redirectPath = "/";
      
      if (refererHeader) {
        try {
          const refererUrl = new URL(refererHeader);
          // Only use pathname if it's from the same origin, otherwise fallback to "/"
          redirectPath = refererUrl.pathname;
        } catch {
          // Invalid URL, use fallback
          redirectPath = "/";
        }
      }
      
      redirect(redirectPath);
    }  };
  