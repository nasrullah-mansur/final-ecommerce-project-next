"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({
    email: "",
    password: ""
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (res?.error) setError("Invalid email or password");
    if (res?.ok) window.location.href = res.url ?? "/dashboard";
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Login to your account</CardTitle>
        </CardHeader>
        <CardContent>

          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={data.email}
                  onChange={(e) => setData((prev) => ({ ...prev, email: e.target.value }))}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="/dashboard/auth/password-request"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required
                  value={data.password}
                  onChange={(e) => setData((prev) => ({ ...prev, password: e.target.value }))}
                />
              </Field>
              {error &&
                <span className="text-red-500">{error}</span>
              }
              <Field>
                <Button type="submit">Login</Button>
              </Field>

              <FieldSeparator>Or continue with</FieldSeparator>

              <Button onClick={() => signIn("google", { callbackUrl: "/profile" })} variant="outline" type="button">
                Login with Google
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
