"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Label, LabelInputContainer } from "../ui/input";
import { Button } from "../ui/button";
import { BottomGradient } from "../ui/bottom-gradient";
import { Error } from "../ui/error";
import { Separator } from "../ui/separator";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import {toast} from "sonner"
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
const loginformvalues = z.object({
  email: z.email("Please enter a correct mail address"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must have at least one lowercase letter, one uppercase letter, one number, and one special character."
    ),
});
type LoginFormValues = z.infer<typeof loginformvalues>;
export default function LoginForm() {
  const loginFormInputs = {
    email: {
      required: "please enter your email",
      type: "email",
      pattern: null,
      placeholder: "Enter your email",
    },
    password: {
      required: "please enter your password",
      type: "password",
      placeholder: "********",
    },
  };

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginformvalues),
  });
  const onSubmit =async (data: LoginFormValues) => {
   const toastId = toast.loading("Logging in");
  await authClient.signIn.email(
    {
      email: data.email,
      password: data.password,
      callbackURL:"/",

  },{
    onSuccess:()=>{
      toast.dismiss(toastId);
      toast.success("Logged in successfully redirecting");
    },
    onError:(err:unknown)=>{
      toast.dismiss(toastId);
      let errorMessage = "Something went wrong";
      if (err instanceof Error) {
        errorMessage = (err as Error).message;
      } else if (err && typeof err === "object" && "message" in err) {
        errorMessage = String((err as any).message) || errorMessage;
      } else if (err) {
        errorMessage = String(err);
      }
      toast.error(errorMessage);
    }
  });
};
  const isPending = form.formState.isSubmitting;
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email and password to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-2">
          {Object.entries(loginFormInputs).map(([key, value]) => (
            <LabelInputContainer key={key}>
              <Label>{key.toLocaleUpperCase()}</Label>
              <Error
                enabled={!!form.formState.errors[key as "email" | "password"]}
              >
                {form.formState.errors[key as "email" | "password"]?.message}
              </Error>
              <Input
                {...form.register(key as "email" | "password")}
                type={value.type}
                autoComplete={key}
                placeholder={value.placeholder}
                className="placeholder:text-neutral-500"
              />
            </LabelInputContainer>
          ))}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary group/btn disabled:opacity-50 cursor-pointer text-white"
          >
            Login
            <BottomGradient />
          </Button>
          <div className="text-center text-sm">
            Don&apos;t have an account?
            <Link href={"/register"} className="underline text-blue-500 ml-1">Sign Up</Link>
          </div>
        </form>
        <Separator />
        <CardFooter className="px-0 gap-4">
          <Button
            disabled={isPending}
            className="w-full group/btn cursor-pointer"
          >
            <IconBrandGithub /> Continue With Github
            <BottomGradient />
          </Button>
          <Button disabled={isPending} className="w-full group/btn cursor-pointer bg-primary text-white">
            <IconBrandGoogle /> Continue With Google
            <BottomGradient />
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
