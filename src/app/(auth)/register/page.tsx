import RegisterForm from "@/services/auth/components/Register";
import { unauthRequire } from "@/lib/auth-utils";
import React from "react";
import Container from "@/components/common/container";

async function page() {
  await unauthRequire();
  return (
    <Container padding="md">
      <RegisterForm />
    </Container>
  );
}

export default page;
