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
import { Input, Label, LabelInputContainer } from "../../../components/ui/input";
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
const signupformValues = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Please enter a correct maill address"),
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
    path: ["confirmPassword", "password"],
  });
type SignupFormValues = z.infer<typeof signupformValues>;
export default function RegisterForm() {
  const router = useRouter();
  const signupFormInputs = {
    name: {
      required: "please enter your email",
      type: "text",
      pattern: null,
      placeholder: "Enter your Name",
    },
    email: {
      required: "please enter your email",
      type: "email",
      pattern: null,
      placeholder: "Enter your Email",
    },
    password: {
      required: "please enter your password",
      type: "password",
      placeholder: "********",
    },
    confirmPassword: {
      required: "please confirm your password",
      type: "password",
      placeholder: "********",
    },
  };

  const form = useForm<SignupFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signupformValues),
  });
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
          onError: (err: unknown) => {
            toast.dismiss(toastId);
            console.error("Registration error:", err);
            let errorMessage = "Something went wrong";
            if (err instanceof Error) {
              errorMessage = (err as Error).message;
            } else if (err && typeof err === "object" && "message" in err) {
              errorMessage = String((err as any).message) || errorMessage;
            } else if (err) {
              errorMessage = String(err);
            }
            toast.error(errorMessage);
          },
        }
      );
    } catch (err) {
      toast.dismiss(toastId);
      console.error("Registration error:", err);
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
  };
  const isPending = form.formState.isSubmitting;
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className = "text-center">
      <Image src="/logo.png" height={80} width={140} alt="logo" className="mx-auto"  />
        <CardTitle>Get Started</CardTitle>
        <CardDescription>Create your account to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-2">
          {Object.entries(signupFormInputs).map(([key, value]) => (
            <LabelInputContainer key={key}>
              <Label>{key.toLocaleUpperCase()}</Label>
              <Error
                enabled={
                  !!form.formState.errors[key as keyof typeof signupFormInputs]
                }
              >
                {
                  form.formState.errors[key as keyof typeof signupFormInputs]
                    ?.message
                }
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
            className="w-full bg-primary group/btn disabled:blue-sm  cursor-pointer text-white"
          >
            Sign Up
            <BottomGradient />
          </Button>
          <div className="text-center text-sm">
            Already have an account?
            <Link href={"/login"} className="underline text-blue-500 ml-1">
              Login
            </Link>
          </div>
        </form>
        <Separator />
        <CardFooter className="px-0 gap-4">
          <Button
            disabled={isPending}
            className="w-full group/btn cursor-pointer flex"
          >
            <IconBrandGithub /> Continue With Github
            <BottomGradient />
          </Button>
          <Button className="w-full group/btn cursor-pointer bg-primary flex text-white">
            <IconBrandGoogle /> Continue With Google
            <BottomGradient />
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}
