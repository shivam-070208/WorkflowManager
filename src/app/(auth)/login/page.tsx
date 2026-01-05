import LoginForm from "@/services/auth/components/Login";
import { unauthRequire } from "@/lib/auth-utils";
import React from "react";
import Container from "@/components/common/container";

async function page() {
  await unauthRequire();

  return (
    <Container>
      <LoginForm />
    </Container>
  );
}

export default page;
