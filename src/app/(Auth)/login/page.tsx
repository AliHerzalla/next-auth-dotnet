"use client";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { data: session, status } = useSession();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await signIn("signIn-path", {
      userName,
      password,
      redirect: true,
      callbackUrl: "/profile",
    });
  };

  return (
    <div
      className={
        "flex flex-col justify-center items-center h-[calc(100vh-100px)]"
      }
    >
      <form
        onSubmit={(e) => handleSubmit(e)}
        action="/api/auth/callback/signIn-path"
        method="post"
        className={
          "flex flex-col justify-center items-center h-fit space-y-5 bg-gray-500/95 p-3 rounded-lg"
        }
      >
        <label>
          Username
          <input
            type="test"
            name="userName"
            placeholder={"Your Username"}
            className={
              "text-black ml-3 py-2 px-3 rounded-md bg-white/95 placeholder:text-gray-500 outline-none border-none"
            }
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="Password"
            placeholder={"Your Password"}
            className={
              "text-black ml-3 py-2 px-3 rounded-md bg-white/95 placeholder:text-gray-500 outline-none border-none"
            }
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <div className={"flex items-center justify-between w-full"}>
          <Link
            className={
              "py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white"
            }
            href={"/"}
          >
            Back To Home
          </Link>
          {status === "authenticated" && <h1>{session?.error}</h1>}
          <button
            type="submit"
            className={
              "py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white disabled:cursor-not-allowed disabled:hover:bg-white"
            }
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
