"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      onClick={async () => await signOut({ callbackUrl: "/", redirect: true })}
      className="py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
