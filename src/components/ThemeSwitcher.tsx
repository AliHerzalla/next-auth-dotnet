"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const switchTheme = (theme: string | undefined) => {
    if (theme?.includes("light")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div>
      <button onClick={() => switchTheme(theme)} className={"capitalize"}>
        {theme} theme
      </button>
    </div>
  );
}
