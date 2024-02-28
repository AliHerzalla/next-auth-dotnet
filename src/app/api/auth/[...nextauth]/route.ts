import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "signIn-path",
            name: 'signIn-path',
            credentials: {
                userName: { label: 'userName', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials, req) {
                const res = await fetch('https://localhost:7223/login', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        accept: '*/*',
                        'Content-Type': 'application/json'
                    },
                });

                const user = await res.json();
                if (!user.success) {
                    return user.Message
                }
                return user;
            },
        }),
        CredentialsProvider({
            id: "signUp-path",
            name: 'signUp-path',
            credentials: {
                userName: { label: 'userName', type: 'text' },
                email: { label: "email", type: "email" },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials, req) {
                const res = await fetch('https://localhost:7223/register', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: {
                        accept: '*/*',
                        'Content-Type': 'application/json'
                    },
                });

                const user = await res.json();

                if (!user.success) {
                    return user.Message
                }
                return user;
            },
        }),
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ user, token }) {
            if (user) {
                token.user = { ...user, username: user.data.split(" , ")[2]!, id: user?.data.split(" , ")[1]!, role: user.data.split(" , ")[3]! }
            }
            return token
        },
        async session({ session, token }) {
            if (token?.user) {
                session.user = token.user;
            }
            return session
        },
    },
    pages: {
        error: "/login",
        signIn: "/login",
        signOut: "/",
        newUser: "/register"
    }
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };