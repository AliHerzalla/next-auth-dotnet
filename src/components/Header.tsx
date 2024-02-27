import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "./buttons/LogoutButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <nav
      className={
        "h-[50px] flex items-center justify-end space-x-2 px-5 py-2 fixed w-full top-0 left-0"
      }
    >
      {!session ? (
        <>
          <Link
            href="/register"
            className="py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white"
          >
            Login
          </Link>
        </>
      ) : (
        <>
          <Link
            href="/profile"
            className="py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white"
          >
            Profile
          </Link>
          <Link
            href="/products"
            className="py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white"
          >
            Products
          </Link>
          <Link
            href={"/cart"}
            className="py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white"
          >
            My Cart
          </Link>
          <Link
            href={"/orders"}
            className="py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white"
          >
            My Orders
          </Link>
        </>
      )}
      <Link
        href="/"
        className="py-2 px-3 hover:bg-green-300 transition-all duration-300 text-black rounded-md bg-white"
      >
        Home
      </Link>
      {session && <LogoutButton />}
    </nav>
  );
};

export default Header;
