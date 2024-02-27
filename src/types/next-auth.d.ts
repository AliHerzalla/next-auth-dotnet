import { JWT, Session, User } from "next-auth/next"

declare module "next-auth" {
    interface Session {
        accessToken: string
        user: {
            id: string
            accessToken: string
            data: string
        } & Session["user"]
        username: string
        id: string
    }
    interface User {
        access_token: string
        data: string
    }
    interface JWT {
        access_token: string
        username: string
        id: string
    }
}