"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Input,
  Label,
  LabelInputContainer,
} from "../../../components/ui/input";
import { Button } from "@/components/ui/button";
import { BottomGradient } from "@/components/ui/bottom-gradient";
import { Error } from "@/components/ui/error";
import { Separator } from "@/components/ui/separator";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { ErrorContext } from "better-auth/client";

const signupFormValues = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a correct mail address"),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must have at least one lowercase letter, one uppercase letter, one number, and one special character."
      ),
    confirmPassword: z
      .string()
      .min(1, "Confirm Password is required")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must have at least one lowercase letter, one uppercase letter, one number, and one special character."
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupFormValues>;

export default function RegisterForm() {
  const router = useRouter();
  const signupFormInputs = {
    name: {
      type: "text",
      pattern: null,
      placeholder: "Enter your Name",
    },
    email: {
      type: "email",
      pattern: null,
      placeholder: "Enter your Email",
    },
    password: {
      type: "password",
      placeholder: "********",
    },
    confirmPassword: {
      type: "password",
      placeholder: "********",
    },
  };

  const Form = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signupFormValues),
  });

  const handleGithubAuth = async (mode: "login" | "signup") => {
    const toastId = toast.loading(
      mode === "signup" ? "Signing up with Github" : "Logging in with Github"
    );
    try {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/workflows",
        fetchOptions: {
          onResponse: () => {
            toast.dismiss(toastId);
            toast.success("Logged in successfully redirecting");
          },
        },
      });
    } catch (_err) {
      toast.dismiss(toastId);
      toast.error("Authentication failed.");
    }
  };

  const handleGoogleAuth = async (mode: "login" | "signup") => {
    const toastId = toast.loading(
      mode === "signup" ? "Signing up with Google" : "Logging in with Google"
    );
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/workflows",
        fetchOptions: {
          onResponse: () => {
            toast.dismiss(toastId);
            toast.success("Logged in successfully redirecting");
          },
        },
      });
    } catch (_err) {
      toast.dismiss(toastId);
      toast.error("Authentication failed.");
    }
  };

  const onSubmit = async (data: SignupFormValues) => {
    const toastId = toast.loading("Creating Account");
    try {
      await authClient.signUp.email(
        {
          email: data.email,
          password: data.password,
          name: data.name,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            toast.dismiss(toastId);
            toast.success("Account created successfully");
            router.push("/");
          },
          onError: (err: ErrorContext) => {
            toast.dismiss(toastId);
            const errorMessage = err.error.message || "something went wrong";
            toast.error(errorMessage);
          },
        }
      );
    } catch (err: unknown) {
      toast.dismiss(toastId);
      console.error("Registration error:", err);
      let errorMessage = "Something went wrong";
      if (
        err &&
        typeof err === "object" &&
        "message" in err &&
        typeof (err as { message?: unknown }).message === "string"
      ) {
        errorMessage = (err as { message: string }).message;
      }
       
      toast.error(errorMessage);
    }
  };

  const isPending = Form.formState.isSubmitting;

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="text-center">
        <Image
          src="/logo.png"
          height={80}
          width={140}
          alt="logo"
          className="mx-auto"
        />
        <CardTitle>Get Started</CardTitle>
        <CardDescription>Create your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={Form.handleSubmit(onSubmit)} className="mt-2 space-y-8">
          {Object.entries(signupFormInputs).map(([key, value]) => (
            <LabelInputContainer key={key}>
              <Label>{key.toLocaleUpperCase()}</Label>
              <Error
                enabled={
                  !!Form.formState.errors[key as keyof SignupFormValues]
                }
              >
                {Form.formState.errors[key as keyof SignupFormValues]?.message}
              </Error>
              <Input
                {...Form.register(key as keyof SignupFormValues)}
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
            className="bg-primary group/btn disabled:blue-sm w-full cursor-pointer text-white"
          >
            Sign Up
            <BottomGradient />
          </Button>
          <div className="text-center text-sm">
            Already have an account?
            <Link href={"/login"} className="ml-1 text-blue-500 underline">
              Login
            </Link>
          </div>
        </form>
        <Separator className="my-4" />
        <CardFooter className="gap-4 px-0">
          <Button
            disabled={isPending}
            className="group/btn bg-secondary text-secondary-foreground flex w-full cursor-pointer"
            onClick={() => handleGithubAuth("login")}
            type="button"
          >
            <IconBrandGithub /> Signup With Github
            <BottomGradient />
          </Button>

          <Button
            disabled={isPending}
            onClick={() => handleGoogleAuth("login")}
            className="group/btn bg-primary flex w-full cursor-pointer text-white"
          >
            <IconBrandGoogle /> Continue With Google
            <BottomGradient />
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
