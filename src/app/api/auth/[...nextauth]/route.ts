import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
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
                console.log(user);

                if (!user.success) {
                    return user.Message
                }
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (Date.now() < token.exp * 1000) {
                return token;
            }
            return token
        },
        async session({ session, token }) {
            if (Date.now() < token.exp * 1000) {
                return session;
            }
            return {
                user: { id: '' },
                expires: 0,
                accessToken: '',
            };
        },
    },
    pages: {
        error: "/login",
        signIn: "/login",
        signOut: "/",
        newUser: "/register"
    }
});



export { handler as GET, handler as POST };