import LoginForm from "@/services/auth/components/Login";
import { unauthRequire } from "@/lib/auth-utils";
import React from "react";

async function page() {
  // await unauthRequire();

  return (
    <div className="grid min-h-dvh place-items-center p-3">
      <LoginForm />
    </div>
  );
}

export default page;
