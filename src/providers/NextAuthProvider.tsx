"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { NextUIContainer } from "./NextUIContainer";
import { NextUIThemeProvider } from "./NextUIThemeProvider";

export default function NextAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <NextUIContainer>
      <NextUIThemeProvider>
        <SessionProvider>{children}</SessionProvider>
      </NextUIThemeProvider>
    </NextUIContainer>
  );
}
