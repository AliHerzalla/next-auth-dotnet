"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await signIn("signUp-path", {
      userName,
      email,
      password,
      redirect: true,
      callbackUrl: "/login",
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
        action="/api/auth/callback/signUp-path"
        method="post"
        className={
          "flex flex-col justify-center items-end h-fit space-y-5 bg-gray-500/95 p-3 rounded-lg"
        }
      >
        <label>
          Username
          <input
            type="text"
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
          Email
          <input
            type="email"
            name="email"
            placeholder={"Your Email"}
            className={
              "text-black ml-3 py-2 px-3 rounded-md bg-white/95 placeholder:text-gray-500 outline-none border-none"
            }
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <button
            type="submit"
            className={
              "py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white"
            }
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
