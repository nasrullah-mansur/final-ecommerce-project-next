/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
import NextAuth, { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { dbConnect } from "@/db/mongodb";
import User from "@/models/user.model";


export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    session: { strategy: "jwt" },

    providers: [
        // 1) GOOGLE OAUTH
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        // 2) EMAIL + PASSWORD (Credentials)
        Credentials({
            name: "Email & Password",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                const email = credentials?.email?.toLowerCase().trim();
                const password = credentials?.password;

                if (!email || !password) return null;

                await dbConnect();

                // If your schema uses password select:false, use:
                const user = await User.findOne({ email }).select("+password role email name").lean();
                // const user = await User.findOne({ email }).lean();

                if (!user?.password) return null;

                const ok = await bcrypt.compare(password, user.password);

                if (!ok) return null;

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name ?? "",
                    role: user.role ?? "USER",
                };
            },
        }),
    ],

    pages: {
        signIn: "/login",
    },

    callbacks: {
        // Ensure user exists in YOUR Mongoose User collection with a role when signing in with Google
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const email = user.email?.toLowerCase();
                if (!email) return false;

                await dbConnect();

                const existing = await User.findOne({ email });

                if (!existing) {
                    // Create a USER entry for Google sign-ins (no password)
                    await User.create({
                        email,
                        name: user.name ?? "",
                        role: "USER",
                        // password is required in your schema; see NOTE below
                    });
                }
            }
            return true;
        },

        async jwt({ token, user }) {
            // On first sign-in, `user` exists
            if (user) {
                token.uid = (user as any).id ?? token.uid;
                token.email = (user as any).email ?? token.email;
                token.name = (user as any).name ?? token.name;
                token.role = (user as any).role ?? token.role;
            }

            // For Google sign-in, role won't automatically exist on token.
            // Load role from your Mongoose collection based on token.email.
            if (!token.role && token.email) {
                await dbConnect();
                const dbUser = await User.findOne({ email: (token.email as string).toLowerCase() }).lean();
                token.role = dbUser?.role ?? "USER";
                token.uid = dbUser?._id?.toString() ?? token.uid;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = (token as any).uid;
                session.user.email = (token as any).email ?? session.user.email;
                session.user.name = (token as any).name ?? session.user.name;
                (session.user as any).role = (token as any).role ?? "USER";
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

