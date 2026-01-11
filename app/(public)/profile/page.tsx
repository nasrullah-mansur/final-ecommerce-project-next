"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Profile() {
    return (
        <div>
            <Button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</Button>
        </div>
    )
}
