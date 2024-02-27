"use client";

import { NextUIProvider } from "@nextui-org/react";

export function NextUIContainer({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
